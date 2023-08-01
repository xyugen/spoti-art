import { fetchUserData } from '../Middlewares/fetchUserInfo.js';
import express from 'express';
const router = express.Router();
router.get('/current-user', fetchUserData, (req, res) => {
    res.json(req.userData);
});
export default router;
