import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGODB_PASS, MONGODB_UNAME } from "../utils/constants.js";
const uri = `mongodb+srv://${MONGODB_UNAME}:${MONGODB_PASS}@spotiart-cluster.2bayeve.mongodb.net/?retryWrites=true&w=majority`;
export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
client.connect().catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
});
