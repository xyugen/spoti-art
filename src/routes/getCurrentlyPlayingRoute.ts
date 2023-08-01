import express, { Express, Request, Response } from 'express';
import axios from 'axios';
import { SPOTIFY_API_BASE_URL } from '../utils/constants.js';

const router = express.Router();

router.get('/currently-playing', async (req: Request, res: Response) => {
    try {
        const token = req.query.token as string;
        if (!token) {
            return res.status(400).json({ error: 'API token is missing.' });
        }

        // Fetch the current playing music data from Spotify API
        const response = await axios.get(`${SPOTIFY_API_BASE_URL}/me/player/currently-playing`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const musicData = response.data;

        return res.status(200).json(musicData);
    } catch (error) {
        console.error("Error fetching current music: ", error);
        return res.status(500).json({ error: 'An error occured while fetching current music.', errors: error })
    }
});

export default router;