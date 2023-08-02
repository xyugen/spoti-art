import mongodb from 'mongodb';
import { getMongoClient } from './mongodbConnection.js';
import { MONGODB_DB } from '../utils/constants.js';

interface ImageInfo {
    image_id: string;
    image_url: string;
    created_at?: Date;
}

export const addImageToCollection = async (imageInfo: ImageInfo): Promise<void> => {
    try {
        const db: mongodb.Db = getMongoClient().db(MONGODB_DB);
        const collection: mongodb.Collection<ImageInfo> = db.collection("image_data");

        imageInfo.created_at = new Date();

        const result = await collection.insertOne(imageInfo as ImageInfo);
    } catch (error) {
        console.log("Error uploading user to MongoDB: ", error);
    }
}