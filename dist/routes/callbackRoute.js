import express from 'express';
import { stringify } from 'querystring';
const router = express.Router();
const redirectUri = `${process.env.URL}:${process.env.PORT}/callback`;
const clientId = `${process.env.CLIENT_ID}`;
const clientSecret = `${process.env.CLIENT_SECRET}`;
router.get('/callback', (req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const authHeader = 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    if (state === null) {
        res.redirect('/#' +
            stringify({
                error: 'state_mismatch'
            }));
    }
    else {
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirectUri,
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
