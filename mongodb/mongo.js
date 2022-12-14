require("dotenv").config({ path: "../.env" });
const { MongoClient, ServerApiVersion } = require("mongodb");
const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_CLUSTER,
  MONGODB_DATABASE_NAME,
} = process.env; 
const URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}/?retryWrites=true&w=majority`;
const MONGODB_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
};
const DATABASE_NAME = MONGODB_DATABASE_NAME;
let Client = null; //private
//TODO: Remove above comment.
// This is put outside of the object so that it's visibility is limited, i.e. private.
//User is then forced to utilize the interface we design for them, allowing us to ensure that they can use
//the client safely with respect to our protocols.

class MongoDBWrapper {
  constructor() {
    if (Client !== null) return; //This prevents multiple instances
    try {
      Client = new MongoClient(URI, MONGODB_CONFIG);
    } catch (error) {
      console.error(error);
    }
  }
  async connect(collection_name) {
    try {
      if (Client === null)
        await Client.connect().catch((error) => console.error(error));
      return await Client.db(DATABASE_NAME).collection(collection_name);
    } catch (error) {
      console.error(error);
      //Define what happens when there is an error
    }
  }

  async close() {
    let result = {
      status: null,
      error: null,
      payload: null,
    };
    try {
      if (Client) {
        await Client.close();
        result.status = 1;
        result.payload = "successfully closed";
        return result;
      }
    } catch (error) {
      result.status = 0;
      result.error = error; //TODO: replace error
      //Define what happens when there is an error
    } finally {
      Client = null;
    }
  }
}

module.exports = { MongoDBWrapper };
