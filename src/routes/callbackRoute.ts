import express, { Express, Request, Response } from 'express';
import { stringify } from 'querystring';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SPOTIFY_ACCOUNTS_API_BASE_URL } from '../utils/constants.js';

const router = express.Router();

router.get('/callback', (req: Request, res: Response) => {
    const code = req.query.code || null;
    const state = req.query.state || null;

    const authHeader = 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    if (state === null) {
        res.redirect('/#' +
            stringify({
                error: 'state_mismatch'
            }));
    } else {
        const authOptions = {
            url: `${SPOTIFY_ACCOUNTS_API_BASE_URL}/api/token`,
            form: {
                code: code,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': authHeader,
            },
            json: true
        };
    }
});

export default router;