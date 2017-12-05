const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    firstName: String,
    lastName: String
});

adminSchema.plugin(require('../lib/globalToJSON'));

module.exports = mongoose.model('Admin', adminSchema);