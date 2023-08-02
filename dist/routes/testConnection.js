import express from 'express';
import { getMongoClient } from '../database/mongodbConnection.js';
import { MONGODB_DB } from '../utils/constants.js';
const router = express.Router();
async function getUserFromCollection(username) {
    try {
        const db = getMongoClient().db(MONGODB_DB);
        const collection = db.collection("user_auth");
        const user = await collection.findOne({ username: username });
        return user;
    }
    catch (error) {
        console.log("Error getting user from MongoDB: ", error);
        throw error;
    }
}
router.get('/test-connection', async (req, res) => {
    const key = req.query.key;
    if (!key) {
        return res.status(400).json({ error: "Missing key. " });
    }
    const user = await getUserFromCollection(key);
    return res.send(`${user?.access_token}`);
});
export default router;
