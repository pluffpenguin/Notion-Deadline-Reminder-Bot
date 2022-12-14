const { UserSchema } = require("../../../schemas/User");
const get_user = ({ UserRegistry }) =>
  async function ({ server_id, data }) {
    const result = {
      status: null,
      error: null,
      payload: null,
    }; //This object will notify the end user the result of their query.
    const User = UserSchema.intersect(data); //Only allow properties that are also in UserSchema and are not null.
    //TODO: Validate Strings
    //Put Precedence in checking by id.
    try {
      result.status = 1;
      const payload = (
        await UserRegistry.findOne({
          _id: server_id,
        })
      )[User.discord_id];
      result.payload = UserSchema.exclude(payload); //Force all the properties of UserSchema
      return result;
    } catch (error) {
      result.status = 0;
      result.error = error; //TODO: Replace error
      return result;
    }
  };
module.exports = { get_user };
