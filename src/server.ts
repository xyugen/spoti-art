import express, { Express, Request, Response } from 'express';
import axios from 'axios';
import { stringify } from 'querystring';

const app: Express = express();
const port: number = 8000;

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.get('/current-music', async (req: Request, res: Response) => {
    try {
        const token = req.query.token as string;
        if (!token) {
            return res.status(400).json({ error: 'API token is missing.' });
        }

        // Fetch the current playing music data from Spotify API
        const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const musicData = response.data;

        return res.status(200).json(musicData);
    } catch (error) {
        console.error("Error fetching current music: ", error);
        return res.status(500).json({ error: 'An error occured while fetching current music.'})
    }
});

app.post('/get-token', async (req: Request, res: Response) => {
    try {
        const clientId = req.query.clientId as string;
        const clientSecret = req.query.clientSecret as string;

        // error 400
        if (!(clientId && clientSecret)) {
            return res.status(400).json({ error: 'Client ID and client secret is missing.' });
        } else if (!clientId) {
            return res.status(400).json({ error: 'Client ID is missing.' });
        } else if (!clientSecret) {
            return res.status(400).json({ error: 'Client secret is missing.' });
        }

        const data = stringify({
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
        })

        const response = await axios.post('https://accounts.spotify.com/api/token', data, {
            url: 'https://accounts.spotify.com/api/token',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const tokenData = response.data;

        return res.status(200).json(tokenData);
    } catch (error) {
        console.error("Error fetching token: ", error);
        return res.status(500).json({ error: `An error occured while fetching current token: ${error} ` })
    }
});