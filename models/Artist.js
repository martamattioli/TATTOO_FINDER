const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function isDateInThePast() {
    if (this.endDate) return this.endDate.getDate() < (new Date()).getDate();
    return null;
}

const artistStudioSchema = new Schema({
    studioId: { type: Schema.ObjectId, ref: 'Studio' },
    resident: Boolean,
    startDate: Date,
    endDate: Date
});

artistStudioSchema
    .virtual('isPast')
    .get(isDateInThePast);

const artistEventSchema = new Schema({
    eventId: { type: Schema.ObjectId, ref: 'Event' },
    startDate: Date, // upon addition of an event the start and end dates are going to default to the start and end date of the event, but the artist can change them if they
    endDate: Date
});

artistEventSchema
    .virtual('isPast')
    .get(isDateInThePast);

const artistSchema = new Schema({
    currentStatus: String,
    styles: [{ type: Schema.ObjectId, ref: 'Style' }],
    studios: [ artistStudioSchema ],
    events: [ artistEventSchema ]
});

artistSchema.plugin(require('../lib/globalToJSON'));

module.exports = mongoose.model('Artist', artistSchema);

// the artist can be a resident at a studio
// the artist can be at a studio from x date to x date
// I would like to remove the studio or set it in (past) if the date to is past
// the artist can be at an event from x date to x date

// add a studio:
    // are you resident here? yes / no
    // if no --> from date / to date
    // ADD