const apiUrl = 'https://apigateway.test.lifeworks.com/rescue-shelter-api';
const request = require('request-promise');

module.exports.getAnimals = (event, context, callback) => {
  const cats = request(`${apiUrl}/cats`).then(value => JSON.parse(value).body);
  const dogs = request(`${apiUrl}/dogs`).then(value => JSON.parse(value).body);
  const hamsters = request(`${apiUrl}/hamsters`).then(value => JSON.parse(value).body);

  Promise.all([cats, dogs, hamsters].map(p => p.catch(e => ({ error: e }))))
    .then((values) => {
      let response;
      const errors = values.filter(value => value && value.error);

      if (errors.length < values.length) {
        response = {
          statusCode: 200,
          body: JSON.stringify({
            animals: [].concat(...values.filter(value => !(value && value.error))),
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
