import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGODB_DB, MONGODB_PASS, MONGODB_UNAME } from "../utils/constants.js";
const uri = `mongodb+srv://${MONGODB_UNAME}:${MONGODB_PASS}@spotiart-cluster.2bayeve.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        await client.connect();
        const db = client.db(MONGODB_DB);
        const collection = db.collection("user_info");
    }
    catch (error) {
        console.log("Error connecting to MongoDB: ", error);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);
