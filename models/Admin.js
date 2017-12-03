const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: String,
    lastName: String
});

module.exports = mongoose.model('Admin', adminSchema);