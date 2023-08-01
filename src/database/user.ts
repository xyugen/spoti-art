import { MONGODB_DB } from '../utils/constants.js';
import { client } from './mongodbConnection.js';

interface UserInfo {
    username: string,
    access_token: string,
    refresh_token: string,
}

export async function addUserToCollection(userInfo: UserInfo) {
    try {
        await client.connect();

        const db = client.db(MONGODB_DB);
        const collection = db.collection("user_info");

        const result = await collection.insertOne(userInfo as UserInfo);
        console.log("User added to the collection: ", result.insertedId);
    } catch (error) {
        console.log("Error uploading user to MongoDB: ", error);
    } finally {
        await client.close();
    }
}

export async function getUserFromCollection(username: string) {
    try {
        client.connect();

        const db = client.db(MONGODB_DB);
        const collection = db.collection("user_info");

        const user = collection.findOne({ username: username });

        return user;
    } catch (error) {
        console.log("Error getting user from MongoDB: ", error);
    } finally {
        await client.close();
    }
}