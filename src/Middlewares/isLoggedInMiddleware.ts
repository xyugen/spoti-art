import { Request, Response, NextFunction } from 'express';
import { stringify } from 'querystring';
import { CLIENT_ID, REDIRECT_URI, SPOTIFY_API_SCOPES } from '../utils/constants.js';
import { generateRandomString } from '../utils/helpers.js';

export const isLoggedInMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Check if the access token is present in the request headers
    const accessToken = req.headers.authorization?.replace('Bearer ', '');
    if (accessToken) {
        // Access token is present, the user is logged in
        // You can add any necessary user information to the request object for future use in other middlewares or routes
        req.accessToken = accessToken;
        next();
    } else {
        // Access token is not present, the user is not logged in
        // Redirect the user to the authorization flow
        const state = generateRandomString(16);
        const scope = SPOTIFY_API_SCOPES;

        res.redirect('https://accounts.spotify.com/authorize?' +
            stringify({
                response_type: 'code',
                client_id: CLIENT_ID,
                scope: scope,
                redirect_uri: REDIRECT_URI,
                state: state
            })
        );
    }
};
