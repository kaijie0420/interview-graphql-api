import axios from 'axios';

export const getPosts = async () => {
  return await axios.get(process.env.API_URL + process.env.POSTS_ENDPOINT);
};

export const getPostById = async (id) => {
  return await axios.get(process.env.API_URL + process.env.POSTS_ENDPOINT + '/' + id);
};

class Post {
    constructor({userId, id, title, body}) {
      this.userId = userId;
      this.id = id;
      this.title = title;
      this.body = body;
    }
  }
  
  export default Post;