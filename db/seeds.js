const mongoose = require('mongoose');
const bluebird = require('bluebird');
const { db } = require('../config/env');
const rp = require('request-promise');

mongoose.Promise = bluebird;

const User = require('../models/User');
const Style = require('../models/Style');
const Country = require('../models/Country');
// const StudioEvent = require('../models/StudioEvent');

// User.drop();
// StudioEvent.drop();
// Style.drop();
// Country.drop();

const styles = [
  {name: 'tribal'},
  {name: 'traditional'},
  {name: 'realistic'},
  {name: 'watercolor'},
  {name: 'new school'},
  {name: 'neo traditional'},
  {name: 'japanese'},
  {name: 'blackwork'},
  {name: 'portraiture'},
  {name: 'biomechanical'},
  {name: 'lettering'},
  {name: 'dotwork'},
  {name: 'geometric'}
];

const users = [{
  username: 'pz',
  email: 'pz@pz.com',
  password: 'pw',
  passwordConfirmation: 'pw',
  image: 'https://images.pexels.com/photos/194074/pexels-photo-194074.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb',
  firstName: 'Marta',
  lastName: 'Mattioli',
  website: 'www.martamattioli.com',
  role: 'user'
}];

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
          flag: country.flag
        };

        return countryObj;
      });
      return Country
        .create(newCountries);
    })
    .then(countries => {
      console.log(`${countries.length} countries were created`);
      return Style
        .create(styles);
    })
    .then(styles => {
      console.log(`${styles.length} styles were created`);
      return User
        .create(users);
    })
    .then(users => console.log(`${users.length} users were created`))
    .catch(err => console.log(err))
  )
  // .then(() => ADD REQUEST PROMISE TO SEARCH FOR TATTOOPARLOURS AND STUDIOS)
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
