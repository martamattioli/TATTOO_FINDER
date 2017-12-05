const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String
});

userSchema.plugin(require('../lib/globalToJSON'));

module.exports = mongoose.model('User', userSchema);