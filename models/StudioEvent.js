const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studioEventSchema = new Schema({
    type: String,
    name: String,
    country: { type: Schema.ObjectId, ref: 'Country', required: 'This field is queired' },
    address: String,
    image: String,
    locationId: { type: String, unique: true },
    location: {
        lat: Number,
        lng: Number
    },
    website: String,
    startDate: Date,
    endDate: Date,
    past: Boolean
});

studioEventSchema
    .virtual('isPast')
    .get(isDateInThePast);

studioEventSchema.virtual('artists', {
    ref: 'User',
    localField: '_id',
    foreignField: 'residentAt'
});

studioEventSchema
    .virtual('averageRatings')
    .get(calculateAverage);

studioEventSchema
    .virtual('countRatings')
    .get(countRatings);

studioEventSchema.plugin(require('mongoose-unique-validator'));
studioEventSchema.plugin(require('../lib/globalToJSON'));

function isDateInThePast() {
    if (this.endDate) return this.endDate.getDate() < (new Date()).getDate();
    // return null;
}

function calculateAverage() {
    console.log(this.artists);
    if (this.artists && this.artists.length > 0) {
        let sum = 0;
        const averages = this.artists.map(artist => {
            sum += artist.averageRatings;
            return artist.averageRatings
        });
        return sum / averages.length;        
    } else {
        return 0;
    }
}

function countRatings() {
    if (this.artists && this.artists.length > 0) {
        let sum = 0;
        this.artists.map(artist => sum += artist.countRatings);
        return sum;
    } else {
        return 0;
    }
}

module.exports = mongoose.model('StudioEvent', studioEventSchema);

// {
//     "type": "studio",
//     "name": "studio52",
//     "country": "United Kingdom",
//     "address": "Union Street 52",
//     "locationId": "123",
//     "location": {
//         "lat": -0.1,
//         "lng": 1.2
//     },
//     "website": "String"
// }

