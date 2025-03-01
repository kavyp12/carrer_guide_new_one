// api/marks.js
const { verifyToken } = require('./middleware/authMiddleware');
const Marks = require('./models/Marks');
const { connectDB } = require('./db');

module.exports = async (req, res) => {
  try {
    await connectDB();

    // Simplify this check - just verify it's a POST request
    if (req.method === 'POST') {
      verifyToken(req, res, () => {
        if (!req.user?.userId) {
          return res.status(401).json({ error: 'User not authenticated' });
        }

        const { subjects } = req.body;

        const marksEntry = new Marks({
          userId: req.user.userId,
          subjects: subjects
        });

        marksEntry.save()
          .then(() => {
            res.status(201).json({ message: 'Marks saved successfully' });
          })
          .catch(error => {
            console.error('Error saving marks:', error);
            res.status(500).json({ error: 'Failed to save marks' });
          });
      });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Marks route error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};