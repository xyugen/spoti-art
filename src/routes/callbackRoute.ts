import express, { Request, Response } from 'express';
import axios from 'axios';
import { stringify } from 'querystring';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SPOTIFY_ACCOUNTS_API_BASE_URL } from '../utils/constants.js';

const router = express.Router();

router.get('/callback', async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const state = req.query.state as string;

    const authHeader = 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    if (state === null) {
        res.redirect('/#' +
            stringify({
                error: 'state_mismatch'
            }));
    } else if (code === null) {
        res.redirect('/#' +
            stringify({
                error: 'missing_code'
            }));
    } else {
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

            const urlSafeBase64Encode = (data: string): string => {
                return Buffer.from(data, 'utf-8').toString('base64')
                    .replace(/\+/g, '-')
                    .replace(/\//g, '_')
                    .replace(/=/g, '');
            };

            const data = response.data;
            // Here you can handle the access token and other data in the response
            //res.json(data);
            const { access_token } = data;

            res.redirect(`/embed/currently-playing?token=${access_token}`)
        } catch (error) {
            console.error('Error exchanging code for access token:', error);
            return res.status(500).json({ error: 'An error occurred while exchanging code for access token' });
        }
    }
});

export default router;
