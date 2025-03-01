// In QuestionnaireModel.js
const mongoose = require('mongoose');

const questionnaireSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentName: { type: String, required: true },
  age: { type: String },
  academicInfo: { type: String },
  interests: { type: String },
  answers: {
    type: Map,
    of: mongoose.Schema.Types.Mixed, // Use Mixed type instead of String
    default: {}
  }
});

module.exports = mongoose.model('Questionnaire', questionnaireSchema);