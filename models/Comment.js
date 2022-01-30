import axios from 'axios';

export const getComments = async () => {
  return await axios.get(process.env.API_URL + process.env.COMMENTS_ENDPOINT);
};

class Comment {
  constructor({postId, id, name, email, body}) {
    this.postId = postId;
    this.id = id;
    this.name = name;
    this.email = email;
    this.body = body;
  }
}

export default Comment;