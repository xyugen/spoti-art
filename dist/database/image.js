import { getMongoClient } from './mongodbConnection.js';
import { MONGODB_DB } from '../utils/constants.js';
export const addImageToCollection = async (imageInfo) => {
    try {
        const db = getMongoClient().db(MONGODB_DB);
        const collection = db.collection("image_data");
        imageInfo.created_at = new Date();
        const result = await collection.insertOne(imageInfo);
    }
    catch (error) {
        console.log("Error uploading user to MongoDB: ", error);
    }
};
