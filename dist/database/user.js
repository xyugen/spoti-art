import { MONGODB_DB } from '../utils/constants.js';
import { getMongoClient } from './mongodbConnection.js';
export const addUserToCollection = async (userInfo) => {
    try {
        const db = getMongoClient().db(MONGODB_DB);
        const collection = db.collection("user_auth");
        userInfo.created_at = new Date();
        const result = await collection.insertOne(userInfo);
    }
    catch (error) {
        console.log("Error uploading user to MongoDB: ", error);
    }
};
export const getUserFromCollection = async (username) => {
    try {
        const db = getMongoClient().db(MONGODB_DB);
        const collection = db.collection("user_auth");
        const user = await collection.findOne({ username: username });
        return user;
    }
    catch (error) {
        console.log("Error getting user from MongoDB: ", error);
        throw error;
    }
};
export const checkUsernameExists = async (username) => {
    try {
        const db = getMongoClient().db(MONGODB_DB);
        const collection = db.collection("user_auth");
        const user = await collection.findOne({ username: username });
        return user !== null;
    }
    catch (error) {
        console.log("Error checking if username exists in MongoDB: ", error);
        return false;
    }
};
export const updateUserAccessToken = async (username, token, createdAt) => {
    try {
        const db = getMongoClient().db(MONGODB_DB);
        const collection = db.collection("user_auth");
        if (!createdAt)
            createdAt = new Date();
        await collection.updateOne({ username: username }, { $set: { access_token: token, created_at: createdAt } });
    }
    catch (error) {
        console.log("Error updating user access token: ", error);
    }
};
