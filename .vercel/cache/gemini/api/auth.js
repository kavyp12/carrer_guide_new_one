const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User.js');
const { verifyToken } = require('./middleware/authMiddleware.js');
const { connectDB } = require('./db.js');
const axios = require('axios');
const cors = require('cors');

module.exports = async (req, res) => {
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(200).end();
    return;
  }

  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  try {
    await connectDB(); // Connect to database

    // Handle /profile (GET) endpoint
    if (req.url === '/api/auth/profile' && req.method === 'GET') {
      console.log('Profile request received');
      
      // Extract token from Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('No valid Authorization header found');
        return res.status(401).json({ message: 'Authentication required' });
      }

      const token = authHeader.split(' ')[1];
      console.log('Token for profile:', token);

      try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded for profile:', decoded);
        
        // Find user by ID from token
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
          console.log('User not found');
          return res.status(404).json({ message: 'User not found' });
        }
        
        console.log('User found:', user);
        res.json({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          age: user.age,
          interests: user.interests
        });
      } catch (error) {
        console.error('Profile verification error:', error);
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expired' });
        }
        res.status(403).json({ message: 'Invalid token' });
      }
      return;
    }

    // Handle /refresh token endpoint
    if (req.url === '/api/auth/refresh' && req.method === 'POST') {
      console.log('Refresh token request received');
      
      // Extract token from Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('No valid Authorization header found');
        return res.status(401).json({ message: 'Authentication required' });
      }

      const token = authHeader.split(' ')[1];
      console.log('Token to refresh:', token);

      try {
        // Verify the token - even if expired we need the userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
        console.log('Token decoded for refresh:', decoded);
        
        // Generate new token with longer expiration
        const newToken = jwt.sign(
          { userId: decoded.userId },
          process.env.JWT_SECRET,
          { expiresIn: '7d' } // Extended from 24h to 7d for better persistence
        );
        
        console.log('New token generated');
        res.json({ token: newToken });
      } catch (error) {
        console.error('Token refresh error:', error);
        res.status(403).json({ message: 'Invalid token' });
      }
      return;
    }

    // Handle /signup (POST) with full path (lowercase api)
    if (req.url === '/api/auth/signup' && req.method === 'POST') {
      console.log('Signup request URL:', req.url);
      console.log('Signup request body:', req.body);
      const { body } = req;
      const academicInfo = `${body.standard}th Grade - ${body.academicPerformance || 'Not specified'}`;

      const user = new User({
        ...body,
        password: body.password,
        academicInfo: academicInfo,
        studentName: `${body.firstName} ${body.lastName}`
      });

      try {
        await user.save();
        console.log('User saved successfully:', user);
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET,
          { expiresIn: '7d' } // Extended from 24h to 7d for better persistence
        );

        res.status(201).json({
          token,
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            age: user.age,
            interests: user.interests
          }
        });
      } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Signup failed', details: error.message });
      }
      return;
    }

    // Handle /analyze (POST) with full path (lowercase api)
    if (req.url === '/api/auth/analyze' && req.method === 'POST') {
      verifyToken(req, res, async () => {
        if (!req.user) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
          const user = await User.findById(req.user.userId);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }

          const answers = req.body.answers;

          const response = await axios.post('/api/submit-assessment', {
            answers,
            studentInfo: {
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              schoolName: user.schoolName,
              grade: user.standard,
              age: user.age,
              interests: user.interests
            }
          });

          res.json(response.data);
        } catch (error) {
          console.error('API call error:', error);
          res.status(500).json({ error: 'Failed to analyze career', details: error.message });
        }
      });
      return;
    }

    // Handle /login (POST) with full path (lowercase api)
    if (req.url === '/api/auth/login' && req.method === 'POST') {
      const { email, password } = req.body;

      User.findOne({ email })
        .then(user => {
          if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
          }

          bcrypt.compare(password, user.password)
            .then(validPassword => {
              if (!validPassword) {
                return res.status(401).json({ message: 'Invalid email or password' });
              }

              const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' } // Extended from 24h to 7d for better persistence
              );

              res.json({
                token,
                user: {
                  id: user._id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  age: user.age,
                  interests: user.interests
                }
              });
            })
            .catch(error => {
              res.status(500).json({ message: 'Password comparison error' });
            });
        })
        .catch(error => {
          res.status(500).json({ message: 'User not found' });
        });
      return;
    }

    res.status(404).json({ error: 'Route not found' });
  } catch (error) {
    console.error('Auth route error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};