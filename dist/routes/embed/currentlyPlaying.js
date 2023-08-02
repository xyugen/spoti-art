import express from 'express';
import { renderCurrentlyPlaying } from '../../client/renderCurrentlyPlaying.js';
import { fetchCurrentMusicData } from '../../middlewares/fetchCurrentMusicData.js';
const router = express.Router();
router.get('/embed/currently-playing', fetchCurrentMusicData, (req, res) => {
    const musicData = req.musicData;
    return res.send(renderCurrentlyPlaying(musicData, { imgBgColor: "#3F2E3E" }));
});
export default router;
