const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewReplySchema = new Schema({
    body: String,
    image: String
});

const ratingsReviewsSchema = new Schema({
    createdBy: { type: Schema.ObjectId, ref: 'User' },
    rating: Number,
    review: {
        body: String,
        image: String
    },
    reviewReply: [ reviewReplySchema ]
});

ratingsReviewsSchema.plugin(require('../lib/globalToJSON'));

module.exports = ratingsReviewsSchema;