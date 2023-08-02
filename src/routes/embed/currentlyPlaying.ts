import express, { Request, Response } from 'express';
import { renderCurrentlyPlaying } from '../../client/renderCurrentlyPlaying.js';
import { fetchCurrentMusicData } from '../../middlewares/fetchCurrentMusicData.js';
import { renderNothingPlaying } from '../../client/renderNothingPlaying.js';

const router = express.Router();

router.get('/embed/currently-playing', fetchCurrentMusicData, (req: Request, res: Response) => {
    const musicData = req.musicData;
    return res.send(renderCurrentlyPlaying(musicData, { imgBgColor: "#3F2E3E"}))
});

export default router;