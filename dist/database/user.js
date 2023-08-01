import { MONGODB_DB } from '../utils/constants.js';
import { client } from './mongodbConnection.js';
export async function addUserToCollection(userInfo) {
    try {
        await client.connect();
        const db = client.db(MONGODB_DB);
        const collection = db.collection("user_info");
        const result = await collection.insertOne(userInfo);
    }
    catch (error) {
        console.log("Error uploading user to MongoDB: ", error);
    }
}
export async function getUserFromCollection(username) {
    try {
        await client.connect();
        const db = client.db(MONGODB_DB);
        const collection = db.collection("user_info");
        const user = await collection.findOne({ username: username });
        return user;
    }
    catch (error) {
        console.log("Error getting user from MongoDB: ", error);
    }
}
