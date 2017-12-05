const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingsReviewsSchema = require('./Rating');

const studioSchema = new Schema({
    name: String,
    locationId: { type: String, unique: true },
    country: { type: Schema.ObjectId, ref: 'Country' },
    address: String,
    website: String,
    ratingsReviews: [ ratingsReviewsSchema ],
    followers: [ { type: Schema.ObjectId, ref: 'Account' } ]
});

studioSchema
    .virtual('averageRatings')
    .get(calculateAverage);

studioSchema.plugin(require('mongoose-unique-validator'));
studioSchema.plugin(require('../lib/globalToJSON'));

module.exports = mongoose.model('Studio', studioSchema);

function calculateAverage() {
    if (this.ratingsReviews.length > 0) {
        const ratings = [];
        let sum = 0;
        for (let i = 0; i < this.ratingsReviews.length; i++) {
            const rating = this.ratingsReviews[i].rating;
            console.log(rating);
            sum += rating;
            ratings.push(rating);
        }
        return sum / ratings.length;
    } else {
        return 0;
    }
}