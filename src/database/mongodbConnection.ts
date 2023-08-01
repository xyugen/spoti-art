import mongodb, { MongoClient, ServerApiVersion } from "mongodb";
import { MONGODB_DB, MONGODB_PASS, MONGODB_UNAME } from "../utils/constants.js";


const uri: string = `mongodb+srv://${MONGODB_UNAME}:${MONGODB_PASS}@spotiart-cluster.2bayeve.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client: mongodb.MongoClient = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

client.connect().catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
})