// const mongoose = require('mongoose');
const mongoose = require('mongoose-fill');
const Schema = mongoose.Schema;

const studioEventSchema = new Schema({
  type: String,
  name: String,
  country: { type: Schema.ObjectId, ref: 'Country', required: 'This field is required' },
  address: String,
  image: [String],
  locationId: { type: String, unique: true },
  location: {
    lat: Number,
    lng: Number
  },
  website: String,
  startDate: Date,
  endDate: Date,
  past: Boolean
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

studioEventSchema
  .virtual('isPast')
  .get(isDateInThePast);

// studioEventSchema.virtual('artists', {
//   ref: 'User',
//   localField: '_id',
//   foreignField: 'residentAt'
// });

studioEventSchema
  .virtual('averageRatings')
  .get(calculateAverage);

studioEventSchema
  .virtual('countRatings')
  .get(countRatings);

studioEventSchema
  .fill('artists')
  .get(getArtists);

studioEventSchema.plugin(require('mongoose-unique-validator'));
studioEventSchema.plugin(require('../lib/globalToJSON'));

function isDateInThePast() {
  if (this.endDate) return this.endDate.getDate() < (new Date()).getDate();
  return false;
}

function calculateAverage() {
  if (this.artists && this.artists.length > 0) {
    let sum = 0;
    const averages = this.artists.map(artist => {
      sum += artist.averageRatings;
      return artist.averageRatings;
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

function getArtists(next) {
  this.db.model('User')
    .find({role: 'artist'})
    .populate('styles')
    .exec()
    .then(artists => {
      const filtered = artists.filter(artist => {
        const locations = artist.locations.filter(location => {
          const isPast = isDateInThePast();
          return (location.resident || !isPast) && `${location.studioEvent}` === `${this.id}`;
        });
        return locations.length > 0;
      });
      return next(null, filtered);
    })
    .catch(next);
}

module.exports = mongoose.model('StudioEvent', studioEventSchema);

// {
//     "type": "studio",
//     "name": "Tattoo Studio",
//     "country": "United Kingdom",
//     "address": "Via Bianca 53",
//     "locationId": "123",
//     "location": {
//         "lat": -0.1,
//         "lng": 1.2
//     },
//     "website": "www.tattostudio.com"
// }
