const apiUrl = 'https://apigateway.test.lifeworks.com/rescue-shelter-api';
const request = require('request-promise');

module.exports.getAnimals = (event, context, callback) => {
  const cats = request(`${apiUrl}/cats`).then(value => JSON.parse(value).body);
  const dogs = request(`${apiUrl}/dogs`).then(value => JSON.parse(value).body);
  const hamsters = request(`${apiUrl}/hamsters`).then(value => JSON.parse(value).body);

  Promise.all([cats, dogs, hamsters]).then((values) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        animals: [].concat(...values),
      }),
    };

    callback(null, response);
  });
};
