// api/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  schoolName: { type: String, required: true },
  standard: { type: String, required: true },
  age: { type: String, required: true },
  interests: { type: String, required: true },
  academicInfo: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Analyzing', 'Report Generated', 'Error'],
    default: 'Pending'
  },
  reportPath: { type: String }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

module.exports = mongoose.model('User', userSchema);