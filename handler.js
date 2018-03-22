module.exports.getAnimals = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      animals: 'TBD...',
    }),
  };

  callback(null, response);
};
