const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (post) return post;
        else throw new Error("post not found");
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    createPost: async (_, { body }, context) => {
      const user = checkAuth(context);
      if (body.trim() === "")
        throw new UserInputError("post body must not be empty");
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const post = await newPost.save();
      context.pubSub.publish("NEW_POST", {
        newPost: post
      });
      return post;
    },
    deletePost: async (_, { postId }, context) => {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (!post) {
          return new Error("post not found");
        }
        if (post.username === user.username) {
          await post.delete();
          return "post deleted successfully";
        } else {
          throw new AuthenticationError("action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    likePost: async (_, { postId }, context) => {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          });
        }
        await post.save();
        return post;
      } else throw new UserInputError("post not found");
    }
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubSub }) => pubSub.asyncIterator("NEW_POST")
    }
  }
};
