const mongoose = require('mongoose');
const bluebird = require('bluebird');
const { db } = require('../config/env');

mongoose.Promise = bluebird;

// const Account = require('../models/Account');
// const Admin = require('../models/Admin');
// const Artist = require('../models/Artist');
// const User = require('../models/User');

// User.drop();
// Admin.drop();
// Artist.drop();
// User.drop();

mongoose
    .connect(db, { useMongoClient: true })
    .then(db => db.dropDatabase())
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());