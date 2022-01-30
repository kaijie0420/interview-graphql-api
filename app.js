import 'dotenv/config';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import _ from 'lodash';
import Comment, { getComments } from './models/Comment';
import Post, { getPosts, getPostById } from './models/Post';
import { paginate } from './utils/helper';

const schema = buildSchema(`
  type Comment {
    postId: Int
    id: Int
    name: String
    email: String
    body: String
  }

  enum SortComment {
    postId
    id
    name
    email
    body
  }

  enum Orders {
    asc
    desc
  }

  type Post {
    userId: Int
    id: Int
    title: String
    body: String
  }

  enum SortPost {
    userId
    id
    title
    body
  }

  type Query {
    comments(sort: SortComment, orders: Orders, page: Int): [Comment]
    searchComment(search: String): [Comment]
    posts(sort: SortPost, orders: Orders, page: Int): [Post]
    findPost(id: Int): Post
  }
`);

var root = {
  comments: async ({sort, orders, page}) => {
    const content = await getComments();
    const comments = _.map(content.data, data => new Comment(data));

    const sorted = _.orderBy(comments, [sort], [orders]);

    return page > 0 ? paginate(sorted, page) : sorted;
  },
  searchComment: async ({search}) => {
    const content = await getComments();
    const comments = _.filter(content.data, data => {
      if (_.filter(Object.keys(data), key => {
        return isNaN(search) ? String(data[key]).includes(search) : data[key] == search;
      }).length) {
        return new Comment(data);
      }
    });

    return comments;
  },
  posts: async ({sort, orders, page}) => {
    const content = await getPosts();
    const posts = _.map(content.data, data => new Post(data));

    const sorted = _.orderBy(posts, [sort], [orders]);

    return page > 0 ? paginate(sorted, page) : sorted;
  },
  findPost: async ({id}) => {
    const content = await getPostById(id);
    const post = content.data;

    return new Post(post);
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

export default app;