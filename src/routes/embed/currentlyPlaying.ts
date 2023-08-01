import express, { Request, Response } from 'express';
import { renderCurrentlyPlaying, renderNothingPlaying } from '../../client/';
import { fetchCurrentMusicData } from '../../middlewares/fetchCurrentMusicData.js';

const router = express.Router();

router.get('/embed/currently-playing', fetchCurrentMusicData, (req: Request, res: Response) => {
    const musicData = req.musicData;
    if (!musicData)
        return res.send(renderNothingPlaying)
    return res.send(renderCurrentlyPlaying(musicData));
});

export default router;