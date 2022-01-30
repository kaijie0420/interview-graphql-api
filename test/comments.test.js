import app from '../app';
import request from 'supertest';
import fs from 'fs';
import nock from 'nock';
import chai from 'chai';
const assert = chai.assert;
const should = chai.should();

const apiUrl = process.env.API_URL || 'https://jsonplaceholder.typicode.com';
const endpoint = process.env.COMMENTS_ENDPOINT || '/comments';
const mockedResponse = fs.readFileSync('./comments.json');

describe('GraphQL query comments', () => {
  it('should returns all comments', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ comments { postId id name email body } }' })
      .expect(200)
      .end((err, res) => {
          if (err) return done(err);
          res.body.data.comments.should.have.lengthOf(500);
          const comment = res.body.data.comments[0];
          assert.equal(comment.postId, 1);
          assert.equal(comment.id, 1);
          assert.equal(comment.name, 'id labore ex et quam laborum');
          assert.equal(comment.email, 'Eliseo@gardner.biz');
          assert.equal(comment.body, 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium');
          done();
      });
  });

  it('should returns all comments sort by postId asc', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ comments(sort: postId, orders: asc) { postId id name email body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const firstComment = res.body.data.comments[0];
        const lastComment = res.body.data.comments[499];
        assert.equal(firstComment.postId, 1);
        assert.equal(lastComment.postId, 100);
        done();
      });
  });

  it('should returns all comments sort by postId desc', (done) => {
    nock(apiUrl)
      .get(endpoint)
      .reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ comments(sort: postId, orders: desc) { postId id name email body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const firstComment = res.body.data.comments[0];
        const lastComment = res.body.data.comments[499];
        assert.equal(firstComment.postId, 100);
        assert.equal(lastComment.postId, 1);
        done();
      });
  });

  it('should returns all comments sort by id asc', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ comments(sort: id, orders: asc) { postId id name email body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const firstComment = res.body.data.comments[0];
        const lastComment = res.body.data.comments[499];
        assert.equal(firstComment.id, 1);
        assert.equal(lastComment.id, 500);
        done();
      });
  });

  it('should returns all comments sort by id desc', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ comments(sort: id, orders: desc) { postId id name email body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const firstComment = res.body.data.comments[0];
        const lastComment = res.body.data.comments[499];
        assert.equal(firstComment.id, 500);
        assert.equal(lastComment.id, 1);
        done();
      });
  });

  it('should returns all comments sort by name asc', (done) => {
    nock(apiUrl)
      .get(endpoint)
      .reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ comments(sort: name, orders: asc) { postId id name email body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const firstComment = res.body.data.comments[0];
        const lastComment = res.body.data.comments[499];
        assert.equal(firstComment.name, 'a assumenda totam');
        assert.equal(lastComment.name, 'voluptatum totam vel voluptate omnis');
        done();
      });
  });

  it('should returns all comments sort by name desc', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ comments(sort: name, orders: desc) { postId id name email body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const firstComment = res.body.data.comments[0];
        const lastComment = res.body.data.comments[499];
        assert.equal(firstComment.name, 'voluptatum totam vel voluptate omnis');
        assert.equal(lastComment.name, 'a assumenda totam');
        done();
      });
  });

  it('should returns all comments sort by email asc', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ comments(sort: email, orders: asc) { postId id name email body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const firstComment = res.body.data.comments[0];
        const lastComment = res.body.data.comments[499];
        assert.equal(firstComment.email, 'Abigail.OConnell@june.org');
        assert.equal(lastComment.email, 'Zola@lizzie.com');
        done();
      });
  });

  it('should returns all comments sort by email desc', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ comments(sort: email, orders: desc) { postId id name email body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const firstComment = res.body.data.comments[0];
        const lastComment = res.body.data.comments[499];
        assert.equal(firstComment.email, 'Zola@lizzie.com');
        assert.equal(lastComment.email, 'Abigail.OConnell@june.org');
        done();
      });
  });

  it('should returns all comments sort by body asc', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ comments(sort: body, orders: asc) { postId id name email body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const firstComment = res.body.data.comments[0];
        const lastComment = res.body.data.comments[499];
        assert.equal(firstComment.body, 'a at tempore\nmolestiae odit qui dolores molestias dolorem et\nlaboriosam repudiandae placeat quisquam\nautem aperiam consectetur maiores laboriosam nostrum');
        assert.equal(lastComment.body, 'voluptatum voluptatem nisi consequatur et\nomnis nobis odio neque ab enim veniam\nsit qui aperiam odit voluptatem facere\nnesciunt esse nemo');
        done();
      });
  });

  it('should returns all comments sort by body desc', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ comments(sort: body, orders: desc) { postId id name email body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const firstComment = res.body.data.comments[0];
        const lastComment = res.body.data.comments[499];
        assert.equal(firstComment.body, 'voluptatum voluptatem nisi consequatur et\nomnis nobis odio neque ab enim veniam\nsit qui aperiam odit voluptatem facere\nnesciunt esse nemo');
        assert.equal(lastComment.body, 'a at tempore\nmolestiae odit qui dolores molestias dolorem et\nlaboriosam repudiandae placeat quisquam\nautem aperiam consectetur maiores laboriosam nostrum');
        done();
      });
  });

  it('should returns comments with pagination', (done) => {
    nock(apiUrl).get(endpoint).reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ comments(page: 1) { postId id name email body } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.data.comments.should.have.lengthOf(10);
        if (err) return done(err);
        const firstComment = res.body.data.comments[0];
        const lastComment = res.body.data.comments[9];
        assert.equal(firstComment.id, 1);
        assert.equal(lastComment.id, 10);
        done();
      });
  });

});