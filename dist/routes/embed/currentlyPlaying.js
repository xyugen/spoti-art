import express from 'express';
import { renderCurrentlyPlaying } from '../../client/renderCurrentlyPlaying.js';
import { fetchCurrentMusicData } from '../../fetchers/fetchCurrentMusicData.js';
const router = express.Router();
router.get('/embed/currently-playing', fetchCurrentMusicData, (req, res) => {
    const musicData = req.musicData;
    return res.send(renderCurrentlyPlaying(musicData));
});
export default router;
