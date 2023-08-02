import express, { Request, Response } from 'express';
import { renderCurrentlyPlaying } from '../../client/renderCurrentlyPlaying.js';
import { fetchCurrentMusicData } from '../../middlewares/fetchCurrentMusicData.js';

const router = express.Router();

router.get('/embed/currently-playing', fetchCurrentMusicData, (req: Request, res: Response) => {
    const musicData = req.musicData;
    return res.send(renderCurrentlyPlaying(musicData));
});

export default router;