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

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likesCount
      comments {
        id
        body
        createdAt
      }
      commentsCount
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

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: String!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentsCount
    }
  }
`;

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export {
  FETCH_POSTS_QUERY,
  FETCH_POST_QUERY,
  LIKE_POST_MUTATION,
  POST_COMMENT_MUTATION,
  DELETE_POST_MUTATION,
  DELETE_COMMENT_MUTATION,
  CREATE_POST_MUTATION,
  LOGIN_USER,
  REGISTER_USER
};
