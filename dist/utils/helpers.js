export const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
export const isAccessTokenExpired = (createdAt, expiresInSeconds) => {
    const expiryTimestamp = new Date(createdAt.getTime() + expiresInSeconds * 1000);
    const currentTimestamp = new Date();
    return currentTimestamp >= expiryTimestamp;
};
export const parseEndpoint = (urlString) => {
    const parsedUrl = new URL(urlString);
    const endpoint = parsedUrl.pathname;
    return endpoint;
};
