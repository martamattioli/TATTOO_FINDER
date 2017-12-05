const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: String,
    country: { type: Schema.ObjectId, ref: 'Country' },
    address: String,
    locationId: { type: String, unique: true },
    startDate: Date,
    endDate: Date,
    past: Boolean
});

eventSchema.plugin(require('../lib/globalToJSON'));

module.exports = mongoose.model('Event', eventSchema);