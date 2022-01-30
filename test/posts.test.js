import app from '../app';
import request from 'supertest';
import fs from 'fs';
import nock from 'nock';
import chai from 'chai';
const assert = chai.assert;
const should = chai.should();

const apiUrl = process.env.API_URL || 'https://jsonplaceholder.typicode.com';
const endpoint = process.env.POSTS_ENDPOINT || '/posts';
const mockedResponse = fs.readFileSync('./posts.json');

describe('GraphQL query posts', () => {
  it('should returns all posts', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ posts { userId id title body } }' })
      .expect(200)
      .end((err, res) => {
          if (err) return done(err);
          res.body.data.posts.should.have.lengthOf(100);
          const posts = res.body.data.posts[0];
          assert.equal(posts.userId, 1);
          assert.equal(posts.id, 1);
          assert.equal(posts.title, 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
          assert.equal(posts.body, 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto');
          done();
      });
  });

  it('should returns all posts sort by userId asc', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ posts(sort: userId, orders: asc) { userId id title body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const firstPost = res.body.data.posts[0];
        const lastPost = res.body.data.posts[99];
        assert.equal(firstPost.userId, 1);
        assert.equal(lastPost.userId, 10);
        done();
      });
  });

  it('should returns all posts sort by userId desc', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ posts(sort: userId, orders: desc) { userId id title body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const firstPost = res.body.data.posts[0];
        const lastPost = res.body.data.posts[99];
        assert.equal(firstPost.userId, 10);
        assert.equal(lastPost.userId, 1);
        done();
      });
  });

  it('should returns all posts sort by id asc', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ posts(sort: id, orders: asc) { userId id title body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const firstPost = res.body.data.posts[0];
        const lastPost = res.body.data.posts[99];
        assert.equal(firstPost.id, 1);
        assert.equal(lastPost.id, 100);
        done();
      });
  });

  it('should returns all posts sort by id desc', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ posts(sort: id, orders: desc) { userId id title body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const firstPost = res.body.data.posts[0];
        const lastPost = res.body.data.posts[99];
        assert.equal(firstPost.id, 100);
        assert.equal(lastPost.id, 1);
        done();
      });
  });

  it('should returns all posts sort by title asc', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ posts(sort: title, orders: asc) { userId id title body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const firstPost = res.body.data.posts[0];
        const lastPost = res.body.data.posts[99];
        assert.equal(firstPost.title, 'a quo magni similique perferendis');
        assert.equal(lastPost.title, 'voluptatum itaque dolores nisi et quasi');
        done();
      });
  });

  it('should returns all posts sort by title desc', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ posts(sort: title, orders: desc) { userId id title body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const firstPost = res.body.data.posts[0];
        const lastPost = res.body.data.posts[99];
        assert.equal(firstPost.title, 'voluptatum itaque dolores nisi et quasi');
        assert.equal(lastPost.title, 'a quo magni similique perferendis');
        done();
      });
  });

  it('should returns all posts sort by body asc', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ posts(sort: body, orders: asc) { userId id title body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const firstPost = res.body.data.posts[0];
        const lastPost = res.body.data.posts[99];
        assert.equal(firstPost.body, 'ab nemo optio odio\ndelectus tenetur corporis similique nobis repellendus rerum omnis facilis\nvero blanditiis debitis in nesciunt doloribus dicta dolores\nmagnam minus velit');
        assert.equal(lastPost.body, 'voluptatibus ex esse\nsint explicabo est aliquid cumque adipisci fuga repellat labore\nmolestiae corrupti ex saepe at asperiores et perferendis\nnatus id esse incidunt pariatur');
        done();
      });
  });

  it('should returns all posts sort by body desc', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ posts(sort: body, orders: desc) { userId id title body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const firstPost = res.body.data.posts[0];
        const lastPost = res.body.data.posts[99];
        assert.equal(firstPost.body, 'voluptatibus ex esse\nsint explicabo est aliquid cumque adipisci fuga repellat labore\nmolestiae corrupti ex saepe at asperiores et perferendis\nnatus id esse incidunt pariatur');
        assert.equal(lastPost.body, 'ab nemo optio odio\ndelectus tenetur corporis similique nobis repellendus rerum omnis facilis\nvero blanditiis debitis in nesciunt doloribus dicta dolores\nmagnam minus velit');
        done();
      });
  });

  it('should returns posts with pagination', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ posts(page: 1) { userId id title body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const firstPost = res.body.data.posts[0];
        const lastPost = res.body.data.posts[9];
        assert.equal(firstPost.id, 1);
        assert.equal(lastPost.id, 10);
        done();
      });
  });
});