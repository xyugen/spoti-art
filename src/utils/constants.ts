import dotenv from 'dotenv';
dotenv.config();

// API URLs
export const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
export const SPOTIFY_ACCOUNTS_API_BASE_URL = 'https://accounts.spotify.com';

// Scopes for Spotify API access
export const SPOTIFY_API_SCOPES = 'user-read-private user-read-email user-read-currently-playing';

// Redirect URI for Spotify OAuth flow
const PORT = `:${process.env.PORT}` || null; // Optional port constant
export const REDIRECT_URI = `${process.env.URL}${PORT}/callback`;

// Client
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;

// MongoDB
export const MONGODB_UNAME = process.env.MONGODB_USERNAME;
export const MONGODB_PASS = process.env.MONGODB_PASSWORD;
export const MONGODB_DB = process.env.MONGODB_DBNAME;

// Developer
export const DEBUG = process.env.DEBUG;