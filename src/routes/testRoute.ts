import express, { Express, Request, Response } from 'express';
import { CLIENT_ID, REDIRECT_URI } from '../utils/constants.js';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    console.log(REDIRECT_URI.toString());
})

export default router;