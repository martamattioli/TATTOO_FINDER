const mongoose = require('mongoose-fill');
const Schema = mongoose.Schema;

const styleSchema = new Schema({
  name: { type: String, unique: 'Oh shit.. this style already exists!' }
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
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
  .fill('artists')
  .get(getArtists);

module.exports = mongoose.model('Style', styleSchema);

function getArtists(next) {
  this.db.model('User')
    .find({role: 'artist'})
    .populate('styles')
    .exec()
    .then(artists => {
      const filtered = artists.filter(artist => {
        const style = artist.styles.find(style => {
          return `${style._id}` === `${this._id}`;
        });
        // artist.styles = artist.styles.filter(style => {
        //   return `${style.id}` !== `${this._id}`;
        // });
        const isStyleTrue = (style) ? true : false;
        return isStyleTrue;
      });

      return next(null, filtered);
    })
    .catch(next);
}
