const s3 = require('./s3');
const uuid = require('uuid');

function imageUpload(req, res, next) {
  if(!req.body.base64) return next();

  const base64Data = req.body.base64.match(/base64,(.*)$/)[1];
  const mimeType = req.body.base64.match(/^data:(.*);/)[1];
  const extension = mimeType.replace('image/', '');
  const filename = `${uuid.v1()}.${extension}`;

  console.log(base64Data, 'base64Data');
  console.log(mimeType, 'mimeType');
  console.log(extension, 'extension');
  console.log(filename, 'filename');

  s3.upload({
    Key: filename,
    Body: new Buffer(base64Data, 'base64'),
    ContentType: mimeType
  }, (err) => {
    if(err) return next(err);

    req.file = {
      filename,
      mimeType
    };

    console.log(req.file, 'REQ FILE');

    next();
  });
}

module.exports = imageUpload;
