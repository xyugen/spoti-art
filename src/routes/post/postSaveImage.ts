import express, { Request, Response } from 'express';
import { addImageToCollection } from 'src/database/image';

const router = express.Router();

router.post('/post/save-image',async (req: Request, res: Response) => {
    try {
        const { image_id, image_url } = req.body;

        addImageToCollection({image_id, image_url});

        res.status(200).json({ message: 'Image URL saved successfully. '});
    } catch (error) {
        console.error('Error saving the image URL to MongoDB: ', error);
        res.status(500).json({ error: 'An error occured while saving the image URL' });
    }
})