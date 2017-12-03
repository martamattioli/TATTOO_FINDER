const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: { type: String, required: 'This field is required', index: true, unique: 'Oh no! This username has already been taken..' },
    email: { type: String, required: 'This field is required', index: true, unique: 'Seems like we already have an account with this email!' },
    password: { type: String, required: 'This field is required' },
    _admin: { type: Schema.ObjectId, ref: 'Admin' },
    _artist: { type: Schema.ObjectId, ref: 'Artist' },
    _user: { type: Schema.ObjectId, ref: 'User' }
});

accountSchema.plugin(require('mongoose-unique-validator'));

accountSchema
    .virtual('passwordConfirmation')
    .set(function setPasswordConfirmation(passwordConfirmation) {
        this._passwordConfirmation = passwordConfirmation;
    });

accountSchema.pre('validate', function checkPassword(next) {
    if (!this._passwordConfirmation || this._passwordConfirmation !== this.password) {
        this.invalidate('passwordConfirmation', 'Passwords do not match');
    }
    next();
});

accountSchema.pre('save', function hashPassword(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    }
    next();
});

accountSchema
    .path('email')
    .validate(validateEmail);

accountSchema.methods.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Account', accountSchema);

function validateEmail(email) {
    if (!validator.isEmail(email)) {
        return this.invalidate('email', 'Must be a valid email address!');
    }
}