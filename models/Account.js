const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { Schema } = mongoose;

const ratingsReviewsSchema = require('./Rating');

const accountSchema = new Schema({
    username: { 
        type: String, 
        required: 'This field is required', 
        index: true, 
        unique: 'Oh no! This username has already been taken..' },
    email: { 
        type: String, 
        required: 'This field is required', 
        index: true, 
        unique: 'Seems like we already have an account with this email!' },
    passwordHash: { 
        type: String, 
        required: 'This field is required' },
    image: String,
    facebookId: String,
    firstName: String,
    lastName: String,
    website: String,
    bio: String,
    following: [ { type: Schema.ObjectId, ref: 'Account' } ],
    followers: [ { type: Schema.ObjectId, ref: 'Account' } ],
    studiosFollowing: [ { type: Schema.ObjectId, ref: 'Studio' }],
    ratingsReviews: [ ratingsReviewsSchema ],
    // averageRatings: { type: Number, default: 0 }, // how do I do I calculate and set average rating for this resource from the model
    country: { type: Schema.ObjectId, ref: 'Country' },
    role: String,
    _artist: { type: Schema.ObjectId, ref: 'Artist' }
});

accountSchema.plugin(require('mongoose-unique-validator'));
accountSchema.plugin(require('../lib/globalToJSON'));

accountSchema
    .virtual('password')
    .set(setPassword);

accountSchema
    .virtual('passwordConfirmation')
    .set(setPasswordConfirmation);

accountSchema
    .path('passwordHash')
    .validate(validatePasswordHash);

accountSchema
    .path('email')
    .validate(validateEmail);

accountSchema
    .virtual('averageRatings')
    .get(calculateAverage);

// accountSchema
//     .path('username')
//     .validate(validateUsername);

accountSchema.methods.validatePassword = validatePassword;

module.exports = mongoose.model('Account', accountSchema);

function setPassword(value) {
    this._password = value;
    this.passwordHash = bcrypt.hashSync(value, bcrypt.genSaltSync(8));
}

function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
}

function validatePasswordHash() {    
    if (this.isNew) {
        if (!this._password) {
            return this.invalidate('password', 'A password is required.');
        }
        if (this._password.length < 2) {
            this.invalidate('password', 'Password must be at least 2 characters.');
        }
        if (this._password !== this._passwordConfirmation) {
            return this.invalidate('passwordConfirmation', 'Passwords do not match.');
        }
    }
}

function validateEmail(email) {    
    if (!validator.isEmail(email)) {
        return this.invalidate('email', 'Must be a valid email address!');
    }
}

function validatePassword(password) {
    return bcrypt.compareSync(password, this.passwordHash);
}

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