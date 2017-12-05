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

styleSchema
    .pre('init', function(next, doc) {
        console.log('preinit', doc);
        
        next();
    });

styleSchema
    .post('init', function(doc) {
        console.log('postinit', doc);
    });

module.exports = mongoose.model('Style', styleSchema);