const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const styleSchema = new Schema({
    name: { type: String, unique: 'Oh shit.. this style already exists!' }
});

styleSchema.plugin(require('../lib/globalToJSON'));
styleSchema.plugin(require('mongoose-unique-validator'));

styleSchema
    .pre('save', function(next) {
        console.log('preSave');
        this.name = this.name.toUpperCase();
        next();
    });

module.exports = mongoose.model('Style', styleSchema);