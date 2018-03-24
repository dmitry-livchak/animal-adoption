const requests = require('./requests');
const responseMapper = require('./responseMapper');

module.exports.getAnimals = (event, context, callback) => {
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
              .map(responseMapper.mapAnimal),
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
