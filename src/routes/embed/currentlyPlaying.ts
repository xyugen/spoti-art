import express, { Request, Response } from 'express';
import { renderCurrentlyPlaying } from 'src/client/renderCurrentlyPlaying';
import { fetchCurrentMusicData } from 'src/fetchers/fetchCurrentMusicData';

const router = express.Router();



router.get('/embed/currently-playing', fetchCurrentMusicData, (req: Request, res: Response) => {
    const musicData = req.musicData;
    return res.send(
        renderCurrentlyPlaying(musicData)
    )
});

export default router;