import express from 'express';
import axios from 'axios';
import { stringify } from 'querystring';
import { SPOTIFY_ACCOUNTS_API_BASE_URL } from '../utils/constants.js';
const router = express.Router();
router.post('/get-token', async (req, res) => {
    try {
        const clientId = req.query.clientId;
        const clientSecret = req.query.clientSecret;
        if (!(clientId && clientSecret)) {
            return res.status(400).json({ error: 'Client ID and client secret is missing.' });
        }
        else if (!clientId) {
            return res.status(400).json({ error: 'Client ID is missing.' });
        }
        else if (!clientSecret) {
            return res.status(400).json({ error: 'Client secret is missing.' });
        }
        const data = stringify({
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
        });
        const response = await axios.post(`${SPOTIFY_ACCOUNTS_API_BASE_URL}api/token`, data, {
            url: `${SPOTIFY_ACCOUNTS_API_BASE_URL}/api/token`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        const tokenData = response.data;
        return res.status(200).json(tokenData);
    }
    catch (error) {
        console.error("Error fetching token: ", error);
        return res.status(500).json({ error: `An error occured while fetching current token: ${error}` });
    }
});
export default router;
