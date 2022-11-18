const { ClubSchema } = require("../../../schemas/ClubInfo");
const get_notion_integration_key = ({ ClubInfo }) =>
  async function ({ server_id, data }) {
    let result = {
      status: null,
      error: null,
      payload: null,
    };
    try {
      let Club_Data = ClubSchema.exclude(data);
      const guild_key = await ClubInfo.findOne({ _id: server_id });     
      Club_Data._id = server_id;
      // Initiate command starts
      if (!guild_key) {
        result.status = "Could not find the server inside the ClubInfo Collection";
        result.payload = payload;
      // If they run the initiate command AGAIN (test)
      } else { 
        const payload = await ClubInfo.updateOne(
          { _id: server_id },
          { $set: Club_Data }
        );
        result.payload = payload;
      }

      result.status = 1;
    } catch (error) {
      result.error = error; //TODO: replace error
      result.status = 0;
    } finally {
      return result;
    }
    //TODO: Validate Strings
  };
module.exports = { get_notion_integration_key };