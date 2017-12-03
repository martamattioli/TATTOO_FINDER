const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    name: String,
    lastName: String,
    country: { type: Schema.ObjectId, ref: 'Country' },
    styles: [{ type: Schema.ObjectId, ref: 'Style' }],
    studios: [{ type: Schema.ObjectId, ref: 'Studio' }],
    events: [{ type: Schema.ObjectId, ref: 'Event' }]
});

module.exports = mongoose.model('Artist', artistSchema);