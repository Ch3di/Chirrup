import { gql } from "@apollo/client";

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likesCount
      likes {
        username
      }
      commentsCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likesCount
    }
  }
`;

const POST_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentsCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query ($postId: String!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      likesCount
      commentsCount
      username
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export {
  FETCH_POSTS_QUERY,
  FETCH_POST_QUERY,
  LIKE_POST_MUTATION,
  POST_COMMENT_MUTATION
};
