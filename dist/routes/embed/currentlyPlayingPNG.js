import express from 'express';
import axios from 'axios';
const router = express.Router();
router.get('/embed/currently-playing.png', async (req, res) => {
    try {
        const key = req.query.key;
        if (!key) {
            return res.status(400).json({ error: 'API key is missing.' });
        }
        const imageUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
        axios.get(imageUrl, { responseType: 'arraybuffer' }).then(response => {
            const imageBuffer = Buffer.from(response.data, 'binary');
            const base64Image = imageBuffer.toString('base64');
            const base64ImageUrl = `data:image/png;base64,${base64Image}`;
            console.log(base64Image);
            res.contentType('image/png');
            res.send(base64ImageUrl);
        });
    }
    catch (error) {
        console.error("Error fetching embed image: ", error);
        return res.status(500).json({ error: 'An error occured while fetching embed image.' });
    }
});
export default router;
