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

mongoose.Promise = bluebird;
mongoose.plugin(globalToJSON);
mongoose.plugin(mongooseUniqueValidator);
mongoose.connect(db, { useMongoClient: true });

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

app.use(customResponses);

app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);

app.listen(port, console.log(`Listening to port ${port}`));