const User = require('../models/User');
const Rating = require('../models/Rating');

function userRatingCreate(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Errm... not found' });
      req.body.createdBy = req.currentUser;
      user.ratingsReviews.push(req.body);

      return user.save();
    })
    .then(user => res.status(200).json(user))
    .catch(next);
}

module.exports = {
  userRatingCreate
};
