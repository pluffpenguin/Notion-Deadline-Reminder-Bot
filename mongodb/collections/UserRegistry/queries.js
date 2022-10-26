const { get_user } = require("./calls/get_user");
const { create_user } = require("./calls/create_user");
const { rate_limiter } = require("../../lib/ratelimiter");
const queries = (Dependencies) => {
  return {
    get: {
      user: rate_limiter(() => get_user(Dependencies)),
    },
    create: {
      user: rate_limiter(() => create_user(Dependencies)),
    },
    update: {},
  };
};
module.exports = { queries };