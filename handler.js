const apiUrl = 'https://apigateway.test.lifeworks.com/rescue-shelter-api';
const request = require('request-promise');
const moment = require('moment');
const _ = require('lodash/collection');

module.exports.getAnimals = (event, context, callback) => {
  const getColourOrder = (colour) => {
    let result = 3;
    if (colour === 'ginger') result = 1;
    if (colour === 'black') result = 2;
    return result;
  };
  const cats = request(`${apiUrl}/cats`)
    .then(value =>
      _.orderBy(
        JSON.parse(value).body
          .map(cat => ({
            forename: cat.forename,
            surname: cat.surname,
            dateOfBirth: cat.dateOfBirth,
            image: cat.image,
            colour: cat.colour,
            colourOrder: getColourOrder(cat.colour),
          })),
        ['colourOrder'], ['asc'],
      ));
  const dogs = request(`${apiUrl}/dogs`)
    .then(value => _.orderBy(JSON.parse(value).body, ['dateOfBirth'], 'asc'));
  const hamsters = request(`${apiUrl}/hamsters`)
    .then(value => _.orderBy(JSON.parse(value).body, ['dateOfBirth'], 'desc'));

  const formatAnimal = (animal) => {
    const ageYears = moment().diff(animal.dateOfBirth, 'years');
    const ageMonths = moment().diff(animal.dateOfBirth, 'months') - (ageYears * 12);
    return {
      fullName: `${animal.forename} ${animal.surname}`,
      image: animal.image,
      age: { years: ageYears, months: ageMonths },
    };
  };

  Promise.all([dogs, cats, hamsters].map(p => p.catch(e => ({ error: e }))))
    .then((values) => {
      let response;
      const errors = values.filter(value => value && value.error);

      if (errors.length < values.length) {
        response = {
          statusCode: 200,
          body: JSON.stringify({
            animals: [].concat(...values.filter(value => !(value && value.error)))
              .map(animal => formatAnimal(animal)),
          }),
        };
      } else {
        response = {
          statusCode: 500,
          body: 'Could not fetch data',
        };
      }

      callback(null, response);
    });
};
