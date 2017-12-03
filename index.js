const express = require('express');
const morgan = require('morgan');
const bluebird = require('bluebird');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const { port, db } = require('./config/env');
const routes = require('./config/routes');
const customResponses = require('./lib/customResponses');
const errorHandler = require('./lib/errorHandler');
const globalToJSON = require('./lib/globalToJSON');

const app = express();

mongoose.connect(db, { useMongoClient: true });
mongoose.Promise = bluebird;
mongoose.plugin(globalToJSON);
mongoose.plugin(mongooseUniqueValidator);

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(customResponses);

app.use('/api', routes);

app.use(errorHandler);

app.listen(port, console.log(`Listening to port ${port}`));