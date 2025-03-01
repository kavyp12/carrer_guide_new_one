// E:\career-guide - Copy\api\questionnaire.js
const { verifyToken } = require('./middleware/authMiddleware.js'); // Adjust path
const Questionnaire = require('./models/QuestionnaireModel.js'); // Adjust path
const User = require('./models/User.js'); // Adjust path
const axios = require('axios');
const { connectDB } = require('./db.js'); // Adjust path

module.exports = async (req, res) => {
  try {
    await connectDB(); // Connect to database

    // Handle /submit-answers (POST) with full path
    if (req.url === '/api/questionnaire/submit-answers' && req.method === 'POST') {
      verifyToken(req, res, async () => {
        const userId = req.user?.userId;
        
        if (!userId) {
          return res.status(401).json({ message: 'Unauthorized: No user ID found' });
        }

        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const existingQuestionnaire = await Questionnaire.findOne({ userId });
        if (existingQuestionnaire) {
          return res.status(400).json({ message: 'Questionnaire already submitted' });
        }

        await User.findByIdAndUpdate(userId, { status: 'Analyzing' });

        const transformedAnswers = req.body.answers.reduce((acc, curr) => {
          acc[`question${curr.questionId}`] = curr.answer;
          return acc;
        }, {});

        const newQuestionnaire = new Questionnaire({
          userId: userId,
          studentName: `${user.firstName} ${user.lastName}`,
          age: user.age || '',
          academicInfo: `${user.standard} Grade`,
          interests: user.interests || '',
          answers: transformedAnswers
        });

        await newQuestionnaire.save();

        const aiServiceData = {
          studentName: newQuestionnaire.studentName,
          age: newQuestionnaire.age,
          academicInfo: newQuestionnaire.academicInfo,
          interests: newQuestionnaire.interests,
          answers: transformedAnswers
        };

        try {
          // Use a fully qualified URL for local development
          const aiResponse = await axios.post('http://localhost:3000/api/submit-assessment', aiServiceData);
          
          if (aiResponse.data.report_url) {
            const reportPath = aiResponse.data.report_url.split('/').pop();
            
            await User.findByIdAndUpdate(userId, {
              status: 'Report Generated',
              reportPath: reportPath
            });

            return res.status(201).json({ 
              message: 'Questionnaire submitted and report generated successfully',
              reportUrl: aiResponse.data.report_url
            });
          }

          throw new Error('No report URL received from AI service');
        } catch (aiError) {
          console.error('AI service error:', aiError);
          
          await User.findByIdAndUpdate(userId, { status: 'Error' });
          
          return res.status(500).json({ 
            message: 'Failed to process with AI service',
            error: aiError instanceof Error ? aiError.message : 'Unknown error'
          });
        }
      });
      return;
    }

    // Handle /report-status (GET) with full path
    if (req.url === '/api/questionnaire/report-status' && req.method === 'GET') {
      verifyToken(req, res, async () => {
        const userId = req.user?.userId;
        
        if (!userId) {
          return res.status(401).json({ message: 'Unauthorized: No user ID found' });
        }

        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
          status: user.status || 'Pending',
          reportPath: user.reportPath || null
        });
      });
      return;
    }

    // Handle /get-answers (GET) with full path
    if (req.url === '/api/questionnaire/get-answers' && req.method === 'GET') {
      verifyToken(req, res, async () => {
        const userId = req.user?.userId;
        
        if (!userId) {
          return res.status(401).json({ message: 'Unauthorized: No user ID found' });
        }

        const questionnaire = await Questionnaire.findOne({ userId });
        
        if (!questionnaire) {
          return res.status(404).json({ message: 'No questionnaire found for this user' });
        }

        return res.status(200).json(questionnaire);
      });
      return;
    }

    res.status(404).json({ error: 'Route not found' });
  } catch (error) {
    console.error('Questionnaire route error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};