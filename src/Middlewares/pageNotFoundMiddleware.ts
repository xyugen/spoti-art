import { Request, Response } from 'express';

export const pageNotFoundMiddleware = (req: Request, res: Response) => {
    res.status(404).json({ error: `Page not found`});
};