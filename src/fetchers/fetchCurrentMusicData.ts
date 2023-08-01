import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { SPOTIFY_API_BASE_URL } from 'src/utils/constants';

export const fetchCurrentMusicData =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.query.token as string;
        if (!token) {
            return res.status(400).json({ error: 'API token is missing.' });
        }

        const response = await axios.get(`${SPOTIFY_API_BASE_URL}/me/player/currently-playing`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const musicData = response.data;

        req.musicData = musicData;

        next();
    } catch (error) {
        console.error('Error fetching current music: ', error);
        return res.status(500).json({ error: 'An error occured while fetching current music.', errors: error})
    }
};