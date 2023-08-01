import { MONGODB_DB } from '../utils/constants.js';
import { client } from './mongodbConnection.js';
import mongodb from 'mongodb';

export interface UserInfo {
    username: string,
    access_token: string,
    refresh_token: string,
    expires_in: number,
    created_at?: Date,
}

export async function addUserToCollection(userInfo: UserInfo) {
    try {
        await client.connect();

        const db: mongodb.Db = client.db(MONGODB_DB);
        const collection: mongodb.Collection<UserInfo> = db.collection("user_info");

        userInfo.created_at = new Date();

        const result = await collection.insertOne(userInfo as UserInfo);
    } catch (error) {
        console.log("Error uploading user to MongoDB: ", error);
    }
}

export async function getUserFromCollection(username: string) {
    try {
        await client.connect();

        const db: mongodb.Db = client.db(MONGODB_DB);
        const collection: mongodb.Collection<UserInfo> = db.collection("user_info");

        const user = await collection.findOne({ username: username });
        return user;
    } catch (error) {
        console.log("Error getting user from MongoDB: ", error);
    }
}

export async function checkUsernameExists(username: string) {
    try {
        const db: mongodb.Db = client.db(MONGODB_DB);
        const collection: mongodb.Collection<UserInfo> = db.collection("user_info");

        const user = await collection.findOne({ username: username });
        return user !== null; // Return true if user is found, false otherwise
    } catch (error) {
        console.log("Error checking if username exists in MongoDB: ", error);
        return false;
    }
}

export const updateUserAccessToken = async (username: string, token: string) => {
    try {
        const db: mongodb.Db = client.db(MONGODB_DB);
        const collection: mongodb.Collection<UserInfo> = db.collection("user_info");

        const result = await collection.updateOne({ username: username }, { access_token: token });
    } catch (error) {
        console.log("Error updating user access token: ", error);
    }
} 