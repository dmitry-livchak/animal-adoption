
// tests for getAnimals
// Generated by serverless-mocha-plugin

const mochaPlugin = require('serverless-mocha-plugin');
const nock = require('nock');
const mockdate = require('mockdate');
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
    mockEndpoints({ cats: 'full', dogs: 'full', hamsters: 'full' });
    return wrapped.run({}).then((response) => {
      const { animals } = JSON.parse(response.body);
      expect(animals.length).to.be.equal(15);
    });
  });

  it('Returns animals when partial data available', () => {
    mockEndpoints({ cats: 'fail', dogs: 'fail', hamsters: 'full' });
    return wrapped.run({}).then((response) => {
      const { animals } = JSON.parse(response.body);
      expect(animals.length).to.be.equal(3);
    });
  });

  it('Fails when all downstream API fail', () => {
    mockEndpoints({ cats: 'fail', dogs: 'fail', hamsters: 'fail' });
    return wrapped.run({}).then((response) => {
      expect(response.statusCode).to.be.equal(500);
    });
  });

  it('Outputs full name', () => {
    mockEndpoints({
      cats: 'empty',
      dogs: 'empty',
      hamsters: {
        body: [
          {
            forename: 'Felix',
            surname: 'Hamilton',
          },
        ],
      },
    });
    return wrapped.run({}).then((response) => {
      const { animals } = JSON.parse(response.body);
      expect(animals[0].fullName).to.be.equal('Felix Hamilton');
    });
  });

  it('Outputs image URL', () => {
    mockEndpoints({
      cats: 'empty',
      dogs: 'empty',
      hamsters: {
        body: [
          {
            image: {
              url: 'https://some.url',
            },
          },
        ],
      },
    });
    return wrapped.run({}).then((response) => {
      const { animals } = JSON.parse(response.body);
      expect(animals[0].image.url).to.be.equal('https://some.url');
    });
  });

  it('Outputs age in years and months', () => {
    mockdate.set('2018-02-23');
    mockEndpoints({
      cats: 'empty',
      dogs: 'empty',
      hamsters: {
        body: [
          {
            dateOfBirth: '2015-04-02',
          },
        ],
      },
    });
    return wrapped.run({}).then((response) => {
      const { animals } = JSON.parse(response.body);
      mockdate.reset();
      expect(animals[0].age).to.deep.equal({ years: 2, months: 10 });
    });
  });


    it('Shows dogs first, then cats, then hamsters', () => {
      mockEndpoints({
        cats: {
          body: [
            {
              forename: 'Second',
              surname: 'Cat'
            },
          ],
        },
        hamsters: {
          body: [
            {
              forename: 'Third',
              surname: 'Hamster'
            },
          ],
        },
        dogs: {
          body: [
            {
              forename: 'First',
              surname: 'Dog'
            },
          ],
        },
      });
      return wrapped.run({}).then((response) => {
        const { animals } = JSON.parse(response.body);
        expect(animals.map(dog => dog.fullName)).to.deep.equal([
          'First Dog',
          'Second Cat',
          'Third Hamster']);
      });
    });

      it('Orders dogs by age descending', () => {
        mockEndpoints({
          cats: 'empty',
          hamsters: 'empty',
          dogs: {
            body: [
              {
                forename: 'Middle',
                surname: 'Dog',
                dateOfBirth: '2015-01-01',
              },
              {
                forename: 'Younger',
                surname: 'Dog',
                dateOfBirth: '2017-01-01',
              }, {
                forename: 'Older',
                surname: 'Dog',
                dateOfBirth: '2014-01-01',
              },
            ],
          },
        });
        return wrapped.run({}).then((response) => {
          const { animals } = JSON.parse(response.body);
          expect(animals.map(dog => dog.fullName)).to.deep.equal([
            'Older Dog',
            'Middle Dog',
            'Younger Dog']);
        });
      });
});
