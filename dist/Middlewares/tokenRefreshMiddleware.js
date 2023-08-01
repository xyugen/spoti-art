import axios from 'axios';
import { SPOTIFY_ACCOUNTS_API_BASE_URL, CLIENT_ID, CLIENT_SECRET } from '../utils/constants.js';
import { getUserFromCollection, updateUserAccessToken } from '../database/user.js';
import { isAccessTokenExpired } from '../utils/helpers.js';
import { stringify } from 'querystring';
export const tokenRefreshMiddleware = async (req, res, next) => {
    try {
        const key = req.query.key;
        if (!key) {
            return res.status(400).json({ error: 'API token is missing.' });
        }
        const user = await getUserFromCollection(key);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        if (!user.created_at) {
            return res.status(404).json({ error: 'Creation date not found.' });
        }
        if (isAccessTokenExpired(user.created_at, user.expires_in)) {
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
            await updateUserAccessToken(key, access_token);
            req.headers.authorization = `Bearer ${access_token}`;
        }
        next();
    }
    catch (error) {
        console.error('Error refreshing token:', error);
        return res.status(500).json({ error: 'An error occurred while refreshing the token.' });
    }
};
