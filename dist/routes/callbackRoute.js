import express from 'express';
import axios from 'axios';
import { stringify } from 'querystring';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SPOTIFY_ACCOUNTS_API_BASE_URL } from '../utils/constants.js';
import { addUserToCollection, checkUsernameExists } from '../database/user.js';
import { fetchUserData } from '../fetchers/fetchUserInfo.js';
const router = express.Router();
router.get('/callback', async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;
    const authHeader = 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    if (state === null) {
        res.redirect('/#' +
            stringify({
                error: 'state_mismatch'
            }));
    }
    else if (code === null) {
        res.redirect('/#' +
            stringify({
                error: 'missing_code'
            }));
    }
    else {
        try {
            const response = await axios.post(`${SPOTIFY_ACCOUNTS_API_BASE_URL}/api/token`, stringify({
                code: code,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code'
            }), {
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            const data = response.data;
            const { access_token, refresh_token, expires_in } = data;
            const userData = await fetchUserData(access_token);
            const { id } = userData;
            if (!await checkUsernameExists(id)) {
                addUserToCollection({ username: id, access_token, refresh_token, expires_in });
            }
            res.redirect(`/embed/currently-playing?key=${id}`);
        }
        catch (error) {
            console.error('Error exchanging code for access token:', error);
            return res.status(500).json({ error: 'An error occurred while exchanging code for access token', errors: error });
        }
    }
});
export default router;
