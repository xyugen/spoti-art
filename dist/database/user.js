import { MONGODB_DB } from '../utils/constants.js';
import { client } from './mongodbConnection.js';
export async function addUserToCollection(userInfo) {
    try {
        await client.connect();
        const db = client.db(MONGODB_DB);
        const collection = db.collection("user_info");
        userInfo.created_at = new Date();
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
export async function checkUsernameExists(username) {
    try {
        const db = client.db(MONGODB_DB);
        const collection = db.collection("user_info");
        const user = await collection.findOne({ username: username });
        return user !== null;
    }
    catch (error) {
        console.log("Error checking if username exists in MongoDB: ", error);
        return false;
    }
}
export const updateUserAccessToken = async (username, token, createdAt) => {
    try {
        const db = client.db(MONGODB_DB);
        const collection = db.collection("user_info");
        if (!createdAt)
            createdAt = new Date();
        const result = await collection.updateOne({ username: username }, { access_token: token, created_at: createdAt });
    }
    catch (error) {
        console.log("Error updating user access token: ", error);
    }
};
