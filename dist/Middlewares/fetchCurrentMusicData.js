import axios from 'axios';
import { SPOTIFY_API_BASE_URL } from '../utils/constants.js';
import { getUserFromCollection } from '../database/user.js';
export const fetchCurrentMusicData = async (req, res, next) => {
    try {
        const key = req.query.key;
        if (!key) {
            return res.status(400).json({ error: 'API key is missing..' });
        }
        const user = await getUserFromCollection(key);
        if (!user || !user.access_token) {
            console.log(await getUserFromCollection(key));
            return res.status(401).json({ error: 'User not authenticated or access token missing.' });
        }
        const response = await axios.get(`${SPOTIFY_API_BASE_URL}/me/player/currently-playing`, {
            headers: {
                'Authorization': `Bearer ${user.access_token}`,
            },
        });
        const musicData = response.data;
        req.musicData = musicData;
        next();
    }
    catch (error) {
        console.error('Error fetching current music: ', error);
        return res.status(500).json({ error: 'An error occured while fetching current music.' });
    }
};
