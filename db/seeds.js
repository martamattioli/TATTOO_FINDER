const mongoose = require('mongoose');
const bluebird = require('bluebird');
const { db } = require('../config/env');
const rp = require('request-promise');

mongoose.Promise = bluebird;

// const Admin = require('../models/Admin');
// const Artist = require('../models/Artist');
// const User = require('../models/User');
const Country = require('../models/Country');

// User.drop();
// StudioEvent.drop();
// Style.drop();
// Country.drop();

mongoose
    .connect(db, { useMongoClient: true })
    .then(db => db.dropDatabase())
    .then(() => rp({
        url: 'https://restcountries.eu/rest/v2/all',
        method: 'GET',
        json: true
        })
        .then(countries => {
            const newCountries = countries.map(country => {
                const countryObj = {
                    used: false,
                    name: country.name,
                    continent: country.region || 'unknown',
                    flag: country.flag,
                };
                
                return countryObj;
            });            
            return Country
                .create(newCountries);
        })
        .then(countries => console.log(`${countries.length} countries were created`))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());