import app from '../app';
import request from 'supertest';
import fs from 'fs';
import nock from 'nock';
import chai from 'chai';
const assert = chai.assert;
const should = chai.should();

const mockedResponse = fs.readFileSync('./comments.json');

describe('GraphQL query searchComment', () => {
  it('should returns all comments that match the search string with non number value', (done) => {
    nock(process.env.API_URL)
      .get(process.env.COMMENTS_ENDPOINT)
      .reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ searchComment(search: "tempora") { postId id name email body } }' })
      .expect(200)
      .end((err, res) => {
          if (err) return done(err);
          res.body.data.searchComment.should.have.lengthOf(60);
          const searchComment = res.body.data.searchComment[0];
          assert.include(searchComment.body, 'tempora');
          done();
      });
  });

  it('should returns all comments that match the search string with number value', (done) => {
    nock(process.env.API_URL)
      .get(process.env.COMMENTS_ENDPOINT)
      .reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ searchComment(search: "1") { postId id name email body } }' })
      .expect(200)
      .end((err, res) => {
          if (err) return done(err);
          res.body.data.searchComment.should.have.lengthOf(5);
          const searchComment = res.body.data.searchComment[0];
          assert.equal(searchComment.postId, 1)
          done();
      });
  });
});