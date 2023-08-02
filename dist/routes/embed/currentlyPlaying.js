import express from 'express';
import { renderCurrentlyPlaying } from '../../client/renderCurrentlyPlaying.js';
import { fetchCurrentMusicData } from '../../middlewares/fetchCurrentMusicData.js';
import { renderNothingPlaying } from '../../client/renderNothingPlaying.js';
const router = express.Router();
router.get('/embed/currently-playing', fetchCurrentMusicData, (req, res) => {
    const musicData = req.musicData;
    if (musicData)
        return res.send(renderCurrentlyPlaying(musicData));
    else
        return res.send(renderNothingPlaying());
});
export default router;
