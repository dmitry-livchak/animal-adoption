const nock = require('nock');

module.exports.mockEndpoints = (options = { cats: 'empty', dogs: 'empty', hamsters: 'empty' }) => {
  const apiEndpoint = nock('https://apigateway.test.lifeworks.com/rescue-shelter-api');
  const cats = apiEndpoint.get('/cats');
  const dogs = apiEndpoint.get('/dogs');
  const hamsters = apiEndpoint.get('/hamsters');

  switch (options.cats) {
    case 'full':
      cats.reply(200, {
        body: [
          {
            forename: 'Dixie',
            surname: 'Mason',
            dateOfBirth: '2009-02-13',
            colour: 'black',
            image: {
              url: 'http://25.media.tumblr.com/tumblr_m3qf8sQXfQ1qhwmnpo1_1280.jpg',
            },
          },
          {
            forename: 'Sherri',
            surname: 'Baldwin',
            dateOfBirth: '2017-02-04',
            colour: 'ginger',
            image: {
              url: 'https://i.pinimg.com/736x/c4/56/22/c45622f45134a5128dc66d9018ef49e5--cat-things-funny-things.jpg',
            },
          },
          {
            forename: 'Pedro',
            surname: 'Sanchez',
            dateOfBirth: '2011-09-30',
            colour: 'white',
            image: {
              url: 'http://www.catster.com/wp-content/uploads/2014/08/An-albino-cat.jpg',
            },
          },
          {
            forename: 'Lucy',
            surname: 'Morales',
            dateOfBirth: '2010-03-23',
            colour: 'gray',
            image: {
              url: 'https://i.pinimg.com/736x/01/59/c3/0159c31c438de4bf00f23960390a68f6--animal-wallpaper-hd-wallpaper.jpg',
            },
          },
          {
            forename: 'Omar',
            surname: 'Rodriguez',
            dateOfBirth: '2011-07-12',
            colour: 'ginger',
            image: {
              url: 'http://www.great-pictures-of-cats.com/image-files/cat-pics-1.jpg',
            },
          },
          {
            forename: 'Larry',
            surname: 'David',
            dateOfBirth: '2008-01-15',
            colour: 'black',
            image: {
              url: 'http://25.media.tumblr.com/tumblr_lpujhsofGQ1qdvbl3o1_1280.jpg',
            },
          },
          {
            forename: 'Gary',
            surname: 'Neville',
            dateOfBirth: '2007-09-28',
            colour: 'ginger',
            image: {
              url: 'http://farm2.static.flickr.com/1316/5110427851_3e1ca3de4a.jpg',
            },
          },
        ],
      });
      break;
    case 'fail':
      cats.replyWithError('Cats failed to load');
      break;
    case 'empty':
      cats.reply(200, { body: [] });
      break;
    default:
      cats.reply(200, options.cats);
      break;
  }

  switch (options.dogs) {
    case 'full':
      dogs.reply(200, {
        body: [
          {
            forename: 'Nicky',
            surname: 'Stephanos',
            dateOfBirth: '2013-03-24',
            image: {
              url: 'https://dog.ceo/api/img/brabancon/n02112706_1072.jpg',
            },
          },
          {
            forename: 'Violet',
            surname: 'Chomsky',
            dateOfBirth: '2006-05-29',
            image: {
              url: 'https://dog.ceo/api/img/retriever-golden/n02099601_2536.jpg',
            },
          },
          {
            forename: 'Hugo',
            surname: 'Matteau',
            dateOfBirth: '2008-08-24',
            image: {
              url: 'https://dog.ceo/api/img/clumber/n02101556_3690.jpg',
            },
          },
          {
            forename: 'Patches',
            surname: 'Sanchez',
            dateOfBirth: '2007-03-16',
            image: {
              url: 'https://dog.ceo/api/img/setter-english/n02100735_216.jpg',
            },
          },
          {
            forename: 'Diana',
            surname: 'Ionita',
            dateOfBirth: '2012-06-01',
            image: {
              url: 'https://dog.ceo/api/img/terrier-australian/n02096294_4440.jpg',
            },
          },
        ],
      });
      break;
    case 'fail':
      dogs.reply(500, 'Dogs returned HTTP 500');
      break;
    case 'empty':
      dogs.reply(200, { body: [] });
      break;
    default:
      dogs.reply(200, options.dogs);
      break;
  }

  switch (options.hamsters) {
    case 'full':
      hamsters.reply(200, {
        body: [
          {
            forename: 'Felix',
            surname: 'Hamilton',
            dateOfBirth: '2015-04-02',
            image: {
              url: 'https://blueprint-api-production.s3.amazonaws.com/uploads/story/thumbnail/51167/5ee9a826-a4f5-4301-9068-1a4f6eb6fbed.jpg',
            },
          },
          {
            forename: 'Gwendolyn',
            surname: 'Roy',
            dateOfBirth: '2016-05-23',
            image: {
              url: 'https://i.ytimg.com/vi/xkxjNZComZg/maxresdefault.jpg',
            },
          },
          {
            forename: 'Lorenzo',
            surname: 'Parsons',
            dateOfBirth: '2014-08-25',
            image: {
              url: 'https://www.peta.org/wp-content/uploads/2016/09/hamster-602x401.jpg',
            },
          },
        ],
      });
      break;
    case 'fail':
      hamsters.reply(502, 'Bad Gateway');
      break;
    case 'empty':
      hamsters.reply(200, { body: [] });
      break;
    default:
      hamsters.reply(200, options.hamsters);
      break;
  }

  return apiEndpoint;
};
