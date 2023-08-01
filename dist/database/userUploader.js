import { MONGODB_DB } from 'src/utils/constants';
import { client } from './mongodbConnection';
async function addUserToCollection(username, token, refresh_token) {
    try {
        await client.connect();
        const db = client.db(MONGODB_DB);
        const collection = db.collection("user_info");
        const userDocument = {
            username,
            token,
            refresh_token,
        };
        const result = await collection.insertOne(userDocument);
        console.log("User added to the collection: ", result.insertedId);
    }
    catch (error) {
        console.log("Error uploading user to MongoDB: ", error);
    }
    finally {
        await client.close();
    }
}
