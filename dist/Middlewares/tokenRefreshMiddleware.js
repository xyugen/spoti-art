import axios from 'axios';
import { SPOTIFY_ACCOUNTS_API_BASE_URL, CLIENT_ID, CLIENT_SECRET } from '../utils/constants.js';
import { getUserFromCollection, updateUserAccessToken } from '../database/user.js';
import { parseEndpoint, isAccessTokenExpired } from '../utils/helpers.js';
import { stringify } from 'querystring';
async function refreshAccessToken(user) {
    const data = stringify({
        grant_type: 'refresh_token',
        refresh_token: user.refresh_token,
    });
    const authorization = Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');
    const response = await axios.post(`${SPOTIFY_ACCOUNTS_API_BASE_URL}/api/token`, data, {
        headers: {
            'Authorization': `Basic ${authorization}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    const { access_token } = response.data;
    return access_token;
}
const endpointsRequiringTokenRefresh = ['/token', '/currently-playing', '/current-user', '/embed/currently-playing'];
export const tokenRefreshMiddleware = async (req, res, next) => {
    try {
        const currentEndpoint = parseEndpoint(req.originalUrl);
        if (!endpointsRequiringTokenRefresh.includes(currentEndpoint)) {
            console.log(req.originalUrl);
            return next();
        }
        const key = req.query.key;
        if (!key) {
            return res.status(400).json({ error: 'API key is missing.' });
        }
        const user = await getUserFromCollection(key);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        if (!user.created_at) {
            return res.status(404).json({ error: 'Creation date not found.' });
        }
        if (isAccessTokenExpired(user.created_at, user.expires_in)) {
            const newAccessToken = await refreshAccessToken(user);
            await updateUserAccessToken(key, newAccessToken);
            req.headers.authorization = `Bearer ${newAccessToken}`;
        }
        next();
    }
    catch (error) {
        console.error('Error refreshing token:', error);
        return res.status(500).json({ error: 'An error occurred while refreshing the token.' });
    }
};
