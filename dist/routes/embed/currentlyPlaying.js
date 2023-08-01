import express from 'express';
import { renderCurrentlyPlaying } from 'src/client/renderCurrentlyPlaying';
import { fetchCurrentMusicData } from 'src/fetchers/fetchCurrentMusicData';
const router = express.Router();
router.get('/embed/currently-playing', fetchCurrentMusicData, (req, res) => {
    const musicData = req.musicData;
    return res.send(renderCurrentlyPlaying(musicData));
});
export default router;
