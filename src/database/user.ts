import { MONGODB_DB } from '../utils/constants.js';
import mongodb from 'mongodb';
import { getMongoClient } from './mongodbConnection.js';

/**
 * Represents user information stored in the database.
 *
 * @interface UserInfo
 */
export interface UserInfo {
    /**
     * The username of the user.
     *
     * @type {string}
     */
    username: string;

    /**
     * The access token associated with the user's Spotify account.
     *
     * @type {string}
     */
    access_token: string;

    /**
     * The refresh token used to obtain a new access token when it expires.
     *
     * @type {string}
     */
    refresh_token: string;

    /**
     * The duration in seconds for which the access token is valid.
     *
     * @type {number}
     */
    expires_in: number;

    /**
     * The optional date and time when the user information was created.
     * This field may not be present for all user records in the database.
     *
     * @type {Date | undefined}
     */
    created_at?: Date;
}

/**
 * Adds a new user to the "user_info" collection in the MongoDB database.
 *
 * @param {UserInfo} userInfo - The user information to be added to the collection.
 * @returns {Promise<void>} A Promise that resolves when the operation is complete.
 */
export const addUserToCollection = async (userInfo: UserInfo): Promise<void> => {
    try {
        const db: mongodb.Db = getMongoClient().db(MONGODB_DB);
        const collection: mongodb.Collection<UserInfo> = db.collection("user_info");

        userInfo.created_at = new Date();

        const result = await collection.insertOne(userInfo as UserInfo);
    } catch (error) {
        console.log("Error uploading user to MongoDB: ", error);
    }
}

/**
 * Retrieves user information from the "user_info" collection based on the username.
 *
 * @param {string} username - The username of the user to retrieve.
 * @returns {Promise<UserInfo | null>} A Promise that resolves with the user information if found,
 * or null if the user does not exist in the database.
 * @throws {Error} Throws an error if there was a problem fetching the user information from the database.
 */
export const getUserFromCollection = async (username: string): Promise<UserInfo | null> => {
    try {
        const db: mongodb.Db = getMongoClient().db(MONGODB_DB);
        const collection: mongodb.Collection<UserInfo> = db.collection("user_info");

        const user = await collection.findOne({ username: username });
        return user;
    } catch (error) {
        console.log("Error getting user from MongoDB: ", error);
        throw error;
    }
}

/**
 * Checks if a user with the specified username exists in the "user_info" collection.
 *
 * @param {string} username - The username to check for existence in the database.
 * @returns {Promise<boolean>} A Promise that resolves with true if the user exists, or false otherwise.
 */
export const checkUsernameExists = async (username: string): Promise<boolean> => {
    try {
        const db: mongodb.Db = getMongoClient().db(MONGODB_DB);
        const collection: mongodb.Collection<UserInfo> = db.collection("user_info");

        const user = await collection.findOne({ username: username });
        return user !== null;
    } catch (error) {
        console.log("Error checking if username exists in MongoDB: ", error);
        return false;
    }
}

/**
 * Updates the access token and creation date of a user in the "user_info" collection.
 *
 * @param {string} username - The username of the user to update.
 * @param {string} token - The new access token to set for the user.
 * @param {Date} [createdAt] - The optional date and time to set as the creation date for the user.
 * If not provided, the current date will be used.
 * @returns {Promise<void>} A Promise that resolves when the update is complete.
 */
export const updateUserAccessToken = async (username: string, token: string, createdAt?: Date): Promise<void> => {
    try {
        const db: mongodb.Db = getMongoClient().db(MONGODB_DB);
        const collection: mongodb.Collection<UserInfo> = db.collection("user_info");

        if (!createdAt) createdAt = new Date();

        await collection.updateOne(
            { username: username },
            { $set: { access_token: token, created_at: createdAt } },
        );
    } catch (error) {
        console.log("Error updating user access token: ", error);
    }
}