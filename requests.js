const apiUrl = 'https://apigateway.test.lifeworks.com/rescue-shelter-api';
const request = require('request-promise');
const _ = require('lodash/collection');

const getColourOrder = (colour) => {
  let result = 3;
  if (colour === 'ginger') result = 1;
  if (colour === 'black') result = 2;
  return result;
};
const cats = () => request(`${apiUrl}/cats`)
  .then(value =>
    _.orderBy(JSON.parse(value).body
      .map(cat => ({
        forename: cat.forename,
        surname: cat.surname,
        dateOfBirth: cat.dateOfBirth,
        image: cat.image,
        colour: cat.colour,
        colourOrder: getColourOrder(cat.colour),
      })), ['colourOrder', 'dateOfBirth'], ['asc', 'asc']));
const dogs = () => request(`${apiUrl}/dogs`)
  .then(value => _.orderBy(JSON.parse(value).body, ['dateOfBirth'], 'asc'));
const hamsters = () => request(`${apiUrl}/hamsters`)
  .then(value => _.orderBy(JSON.parse(value).body, ['dateOfBirth'], 'desc'));

module.exports = { cats, dogs, hamsters };
