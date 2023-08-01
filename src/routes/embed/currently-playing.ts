import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/embed/currently-playing', (req: Request, res: Response) => {
    const cardWidth = req.query.cardWidth as string || 500;
    const cardHeight = req.query.cardHeight as string || 300;

    return res.send(
        `
        <svg width="${cardWidth}" height="${cardHeight}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${cardWidth}" height="${cardHeight}" fill="#000022" />
            <text x="30" y="30" font-size="20" font-weight="bold">
                Test
            </text>
        </svg>
        `
    )
});

export default router;