import app from '../app';
import request from 'supertest';
import fs from 'fs';
import nock from 'nock';
import chai from 'chai';
const assert = chai.assert;

const apiUrl = process.env.API_URL || 'https://jsonplaceholder.typicode.com';
const endpoint = process.env.POSTS_ENDPOINT || '/posts';

describe('GraphQL query findPost', () => {
  it('should find post by id', (done) => {
    const mockedResponse = JSON.parse(fs.readFileSync('./posts.json'))[0];
    nock(apiUrl).get(endpoint + '/1').reply(200, mockedResponse);

    request(app).post('/graphql')
      .send({ query: '{ findPost(id: 1) { userId id title body } }' })
      .expect(200)
      .end((err, res) => {
        console.log(res.body)
          if (err) return done(err);
          const post = res.body.data.findPost;
          assert.equal(post.userId, 1);
          assert.equal(post.id, 1);
          assert.equal(post.title, 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
          assert.equal(post.body, 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto');
          done();
      });
  });
});