import { BASE_URL } from "./constants.js";

/**
 * Generates a random string containing numbers and letters
 * @param {number} length The length of the string
 * @returns {string} The generated string
 */
export const generateRandomString =(length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
 * Check whether an access token has expired.
 * @param createdAt The date the access token was initialized.
 * @param expiresInSeconds The amount of seconds before an access token expires
 * @returns 'true' if the access token is past it's expiration time
 */
export const isAccessTokenExpired = (createdAt: Date, expiresInSeconds: number): boolean => {
    // Calculate the expiry timestamp by adding the `expiresIn` seconds to the `createdAt` timestamp
    const expiryTimestamp = new Date(createdAt.getTime() + expiresInSeconds * 1000);

    // Get the current timestamp
    const currentTimestamp = new Date();

    // Compare the current timestamp with the expiry timestamp
    return currentTimestamp >= expiryTimestamp;
}

/**
 * Parse the endpoint from the given URL string.
 *
 * @param {string} urlString - The URL string to parse.
 * @returns {string} The parsed endpoint.
 */
export const parseEndpoint = (urlString: string): string => {
    const parsedUrl = new URL(urlString, BASE_URL);
    const endpoint = parsedUrl.pathname;
    return endpoint;
}

export class UserKey {
    private static key: string = "";

    constructor() {
        UserKey.key = "";
    }

    public static getKey() {
        return UserKey.key;
    }

    public static setKey(key: string) {
        UserKey.key = key;
    }
}