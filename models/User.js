const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { Schema } = mongoose;

const ratingsReviewsSchema = require('./Rating');

const studioEventSchema = new Schema({
    type: String,
    studioEvent: { type: Schema.ObjectId, ref: 'StudioEvent' },
    resident: Boolean,
    startDate: Date,
    endDate: Date
});

studioEventSchema
    .virtual('isPast')
    .get(isDateInThePast);

studioEventSchema.plugin(require('../lib/globalToJSON'));

const userSchema = new Schema({
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
    following: [ { type: Schema.ObjectId, ref: 'User' } ],
    followers: [ { type: Schema.ObjectId, ref: 'User' } ],
    studiosFollowing: [{ type: Schema.ObjectId, ref: 'StudioEvent' } ],
    ratingsReviews: [ ratingsReviewsSchema ],
    country: { type: Schema.ObjectId, ref: 'Country', required: 'This field is required' },
    role: String,
    styles: [{ type: Schema.ObjectId, ref: 'Style' }],
    locations: [studioEventSchema],
    residentAt: { type: Schema.ObjectId, ref: 'StudioEvent' }
});

userSchema.plugin(require('mongoose-unique-validator'));
userSchema.plugin(require('../lib/globalToJSON'));

userSchema
    .virtual('password')
    .set(setPassword);

userSchema
    .virtual('passwordConfirmation')
    .set(setPasswordConfirmation);

userSchema
    .path('passwordHash')
    .validate(validatePasswordHash);

userSchema
    .path('email')
    .validate(validateEmail);

userSchema
    .virtual('averageRatings')
    .get(calculateAverage);

userSchema
    .virtual('countRatings')
    .get(countRatings);

// userSchema
//     .path('username')
//     .validate(validateUsername);

userSchema.methods.validatePassword = validatePassword;

module.exports = mongoose.model('User', userSchema);

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
            sum += rating;
            ratings.push(rating);
        }
        return sum / ratings.length;
    } else {
        return 0;
    }
}

function countRatings() {
    if (this.ratingsReviews.length > 0) {
        const count = this.ratingsReviews.map(rating => rating.rating);
        return count.length;
    } else {
        return 0;
    }
}

function isDateInThePast() {
    if (this.endDate) return this.endDate.getDate() < (new Date()).getDate();
    // return null;
}


// {
//     "username": "tattoo artist 2",
//     "email": "tattoo@artist.com",
//     "role": "artist",
//     "password": "pw",
//     "passwordConfirmation": "pw"
// }


// {
//     "locations": [{
//         "type": "studio",
//         "studioEvent": "5a2a7c7e11b1ca01148803f9",
//         "resident": true
//     }],
//         "residentAt": "5a2a7c7e11b1ca01148803f9"
// }

//users/5a2d4a35434d6d07b28e249c