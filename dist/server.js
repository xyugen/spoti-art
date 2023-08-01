import express from 'express';
import axios from 'axios';
const app = express();
const port = 8000;
app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get('/current-music', async (req, res) => {
    try {
        const token = req.query.token;
        if (!token) {
            return res.status(400).json({ error: 'API token is missing.' });
        }
        const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const musicData = response.data;
        return res.status(200).json(musicData);
    }
    catch (error) {
        console.error("Error fetching current music: ", error);
        return res.status(500).json({ error: 'An error occured while fetching current music.' });
    }
});
