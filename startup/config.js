const config = require("config");

module.exports = function () {
  if (!config.get("SECRET_KEY")) {
    throw new Error("ERROR: SECRET_KEY is not set");
  }
  if (!config.get("DB_URI")) {
    throw new Error("ERROR: DB_URI is not set");
  }
  if (!config.get("PORT")) {
    throw new Error("ERROR: PORT is not set");
  }
};
