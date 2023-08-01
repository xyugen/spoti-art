/**
 * Generates a random string containing numbers and letters
 * @param {number} length The length of the string
 * @returns {string} The generated string
 */
export function generateRandomString(length: number): string {
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
function isAccessTokenExpired(createdAt: Date, expiresInSeconds: number): boolean {
    // Calculate the expiry timestamp by adding the `expiresIn` seconds to the `createdAt` timestamp
    const expiryTimestamp = new Date(createdAt.getTime() + expiresInSeconds * 1000);

    // Get the current timestamp
    const currentTimestamp = new Date();

    // Compare the current timestamp with the expiry timestamp
    return currentTimestamp >= expiryTimestamp;
}