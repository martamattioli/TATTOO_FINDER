const Style = require('../models/Style');

function styleCreate(req, res, next) {
  // req.body.name = req.body.name.toUpperCase();

  Style
    .create(req.body)
    .then(style => res.status(200).json(style))
    .catch(next);
}

function stylesIndex(req, res, next) {
  Style
    .find()
    .exec()
    .then(styles => {
      return res.status(200).json(styles);
    })
    .catch(next);
}

function stylesShow(req, res, next) {
  Style
    .findById(req.params.id)
    .fill('artists')
    .exec()
    .then(style => {
      if (!style) return res.notFound();
      return res.status(200).json(style);
    })
    .catch(next);
}

module.exports = {
  create: styleCreate,
  index: stylesIndex,
  show: stylesShow
};
