import { fetchUserData } from '../middlewares/fetchUserInfo.js'; // Adjust the path to your file
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/current-user', fetchUserData, (req: Request, res: Response) => {
    res.json(req.userData);
});

export default router;