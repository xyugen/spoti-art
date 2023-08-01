import axios from 'axios';
import { SPOTIFY_API_BASE_URL } from 'src/utils/constants';
export const fetchUserData = async (req, res, next) => {
    try {
        const token = req.query.token;
        if (token === null) {
            return res.status(400).json({ error: 'API token is missing.' });
        }
        const response = await axios.get(`${SPOTIFY_API_BASE_URL}/v1/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        const userData = response.data;
        req.userData = userData;
        next();
    }
    catch (error) {
        return res.status(500).json({ error: 'An error occured while fetching current user.' });
    }
};
