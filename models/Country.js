const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: String
});

countrySchema.plugin(require('../lib/globalToJSON'));

module.exports = mongoose.model('Country', countrySchema);