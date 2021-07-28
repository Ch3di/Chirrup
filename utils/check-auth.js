const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, config.get("SECRET_KEY"));
        return user;
      } catch (err) {
        throw new AuthenticationError("invalid/expired token");
      }
    }
    throw new Error(
      "Authentication token must be in the form of 'Bearer <token>"
    );
  }
  throw new Error("Authorization header must be provided");
};
