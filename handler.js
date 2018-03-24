const moment = require('moment');
const requests = require('./requests');

module.exports.getAnimals = (event, context, callback) => {
  const formatAnimal = (animal) => {
    const ageYears = moment().diff(animal.dateOfBirth, 'years');
    const ageMonths = moment().diff(animal.dateOfBirth, 'months') - (ageYears * 12);
    return {
      fullName: `${animal.forename} ${animal.surname}`,
      image: animal.image,
      age: { years: ageYears, months: ageMonths },
    };
  };

  Promise.all([requests.dogs(), requests.cats(), requests.hamsters()]
    .map(p => p.catch(e => ({ error: e }))))
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
