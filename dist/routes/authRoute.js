import express from 'express';
import { generateRandomString } from 'src/utils/helpers';
import { stringify } from 'querystring';
const router = express.Router();
const clientId = process.env.CLIENT_ID;
const redirectUri = `${process.env.URL}:${process.env.PORT}/callback`;
router.get('/auth', (req, res) => {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email user-read-currently-playing';
    res.redirect('https://accounts.spotify.com/authorize?' +
        stringify({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirectUri,
            state: state
        }));
});
