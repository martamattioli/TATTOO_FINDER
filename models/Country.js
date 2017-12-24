const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
  name: String,
  flag: String,
  continent: { type: String, required: true },
  used: Boolean
});

countrySchema.plugin(require('../lib/globalToJSON'));

module.exports = mongoose.model('Country', countrySchema);
