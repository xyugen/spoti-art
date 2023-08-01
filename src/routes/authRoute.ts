import express, { Express, Request, Response } from 'express';
import { generateRandomString } from 'src/utils/helpers';
import { stringify } from 'querystring';
import { CLIENT_ID, REDIRECT_URI, SPOTIFY_API_SCOPES } from 'src/utils/constants';

const router = express.Router();

router.get('/auth', (req: Request, res: Response) => {
    const state = generateRandomString(16);
    const scope = SPOTIFY_API_SCOPES;

    res.redirect('https://accounts.spotify.com/authorize?' + 
    stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state
    }));
});

export default router;