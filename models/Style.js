const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const styleSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Style', styleSchema);