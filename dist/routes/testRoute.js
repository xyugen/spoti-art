import express from 'express';
import { REDIRECT_URI } from '../utils/constants.js';
const router = express.Router();
router.get('/', async (req, res) => {
    console.log(REDIRECT_URI.toString());
});
export default router;
