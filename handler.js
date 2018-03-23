const apiUrl = 'https://apigateway.test.lifeworks.com/rescue-shelter-api';
const request = require('request-promise');

module.exports.getAnimals = (event, context, callback) => {
  const cats = request(`${apiUrl}/cats`);
  const dogs = request(`${apiUrl}/dogs`);
  const hamsters = request(`${apiUrl}/hamsters`);

  Promise.all([cats, dogs, hamsters]).then((values) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        animals: values,
      }),
    };

    callback(null, response);
  });
};
