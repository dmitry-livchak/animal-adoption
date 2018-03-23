
// tests for getAnimals
// Generated by serverless-mocha-plugin

const mochaPlugin = require('serverless-mocha-plugin');
const nock = require('nock');
const { mockEndpoints } = require('./getAnimals.data');

const { expect } = mochaPlugin.chai;
const wrapped = mochaPlugin.getWrapper('getAnimals', '/handler.js', 'getAnimals');

describe('getAnimals', () => {
  before((done) => {
    nock.disableNetConnect();
    done();
  });

  it('Loads animals online', () => {
    const apiEndpoint = mockEndpoints();
    return wrapped.run({}).then(() =>
      expect(apiEndpoint.isDone()).to.be.true);
  });

  it('Responds with HTTP OK', () => {
    mockEndpoints();
    return wrapped.run({}).then((response) => {
      expect(response.statusCode).to.be.equal(200);
    });
  });

  it('Returns all animals', () => {
    mockEndpoints('full');
    return wrapped.run({}).then((response) => {
      const { animals } = JSON.parse(response.body);
      expect(animals.length).to.be.equal(15);
    });
  });

  it('Returns animals when partial data available', () => {
    mockEndpoints('partial');
    return wrapped.run({}).then((response) => {
      const { animals } = JSON.parse(response.body);
      expect(animals.length).to.be.equal(3);
    });
  });

  it('Fails when all downstream API fail', () => {
    mockEndpoints('all-fail');
    return wrapped.run({}).then((response) => {
      expect(response.statusCode).to.be.equal(500);
    });
  });
});
