import mongodb, { MongoClient, ServerApiVersion } from "mongodb";
import { MONGODB_PASS, MONGODB_UNAME } from "../utils/constants.js";

const uri: string = `mongodb+srv://${MONGODB_UNAME}:${MONGODB_PASS}@spotiart-cluster.2bayeve.mongodb.net/?retryWrites=true&w=majority`;

const client: mongodb.MongoClient = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },

});

export const connectToMongoDB = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
    }
}

export const getMongoClient = () : MongoClient => {
    return client;
}