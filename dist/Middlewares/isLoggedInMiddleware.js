import { stringify } from 'querystring';
import { CLIENT_ID, REDIRECT_URI, SPOTIFY_API_SCOPES } from '../utils/constants.js';
import { generateRandomString } from '../utils/helpers.js';
export const isLoggedInMiddleware = (req, res, next) => {
    const accessToken = req.headers.authorization?.replace('Bearer ', '');
    if (accessToken) {
        req.accessToken = accessToken;
        next();
    }
    else {
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
    }
};
