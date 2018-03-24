const moment = require('moment');

const mapAnimal = (animal) => {
  const ageYears = moment().diff(animal.dateOfBirth, 'years');
  const ageMonths = moment().diff(animal.dateOfBirth, 'months') - (ageYears * 12);
  return {
    fullName: `${animal.forename} ${animal.surname}`,
    image: animal.image,
    age: { years: ageYears, months: ageMonths },
  };
};

module.exports = { mapAnimal };
