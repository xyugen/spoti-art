import express, { NextFunction, Request, Response } from 'express';
import { renderCurrentlyPlaying } from '../../client/renderCurrentlyPlaying.js';
import { fetchCurrentMusicData } from '../../middlewares/fetchCurrentMusicData.js';

const router = express.Router();

router.get('/embed/currently-playing', fetchCurrentMusicData, (req: Request, res: Response) => {
    const musicData = req.musicData;
    const key = req.query.key as string;
    const renderedCard = renderCurrentlyPlaying(musicData, key, { imgBgColor: "#3F2E3E" });
    
    res.locals.renderedCard = renderedCard;
    
    res.redirect('/embed/currently-playing.png');
});

export default router;