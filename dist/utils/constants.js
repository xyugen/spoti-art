import dotenv from 'dotenv';
dotenv.config();
export const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
export const SPOTIFY_ACCOUNTS_API_BASE_URL = 'https://accounts.spotify.com';
export const SPOTIFY_API_SCOPES = 'user-read-private user-read-email user-read-currently-playing';
const PORT = `:${process.env.PORT}` || null;
export const REDIRECT_URI = `${process.env.URL}${PORT}/callback`;
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const MONGODB_UNAME = process.env.MONGODB_USERNAME;
export const MONGODB_PASS = process.env.MONGODB_PASSWORD;
export const MONGODB_DB = process.env.MONGODB_DBNAME;
export const DEBUG = process.env.DEBUG;
