// In your Marks.js model:
const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  subjects: [{
    subjectName: { // Change from name to subjectName
      type: String,
      required: true
    },
    marks: {
      type: Number,
      required: true
    },
    totalMarks: {
      type: Number,
      required: true,
      default: 100
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Marks', marksSchema);