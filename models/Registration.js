const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  code: String,
  email: String
}, {
  timestamps: true
});

registrationSchema.plugin(require('../lib/globalToJSON'));

module.exports = mongoose.model('Registration', registrationSchema);
