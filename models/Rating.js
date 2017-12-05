const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewReplySchema = new Schema({
    reply: String
});

const ratingsReviewsSchema = new Schema({
    createdBy: { type: Schema.ObjectId, ref: 'Account' },
    rating: Number,
    review: String,
    reviewReply: [ reviewReplySchema ]
});

ratingsReviewsSchema.plugin(require('../lib/globalToJSON'));

module.exports = ratingsReviewsSchema;