import express from 'express';
const router = express.Router();
router.get('/embed/currently-playing', (req, res) => {
    return res.send();
});
export default router;
