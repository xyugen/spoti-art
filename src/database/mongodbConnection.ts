import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGODB_DB, MONGODB_PASS, MONGODB_UNAME } from "../utils/constants.js";


const uri: string = `mongodb+srv://${MONGODB_UNAME}:${MONGODB_PASS}@spotiart-cluster.2bayeve.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const db = client.db(MONGODB_DB);
        const collection = db.collection("user_info");
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);