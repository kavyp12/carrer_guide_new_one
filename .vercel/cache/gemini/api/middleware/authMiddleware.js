const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    // Ensure req.headers exists
    if (!req.headers) {
      req.headers = {};
    }

    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid Authorization header found');
      return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Verifying token:', token);

    if (!token) {
      console.log('No token found in headers');
      return res.status(401).json({ message: 'Authentication required' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded:', decoded);
      
      // Attach user info to the request
      req.user = { userId: decoded.userId };
      next();
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      
      // If token is expired, send a clear message
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired', expired: true });
      }
      
      return res.status(403).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(500).json({ message: 'Internal server error during authentication' });
  }
};

module.exports = { verifyToken };