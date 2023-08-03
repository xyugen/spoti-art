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
export const getImageFromCollection = async (imageId) => {
    try {
        const db = getMongoClient().db(MONGODB_DB);
        const collection = db.collection("image_data");
        const image = await collection.findOne({ image_id: imageId });
        return image;
    }
    catch (error) {
        console.log("Error getting image from MongoDB: ", error);
        throw error;
    }
};
export const checkImageExists = async (imageId) => {
    try {
        const db = getMongoClient().db(MONGODB_DB);
        const collection = db.collection("image_data");
        const user = await collection.findOne({ image_id: imageId });
        return user !== null;
    }
    catch (error) {
        console.log("Error checking if username exists in MongoDB: ", error);
        return false;
    }
};
export const updateUserAccessToken = async (imageId, imageUrl, createdAt) => {
    try {
        const db = getMongoClient().db(MONGODB_DB);
        const collection = db.collection("image_data");
        if (!createdAt)
            createdAt = new Date();
        await collection.updateOne({ image_id: imageId }, { $set: { image_url: imageUrl, created_at: createdAt } });
    }
    catch (error) {
        console.log("Error updating image url data: ", error);
    }
};
