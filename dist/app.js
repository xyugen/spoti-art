import dotenv from 'dotenv';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { connectToMongoDB } from './database/mongodbConnection.js';
import getTokenRoute from './routes/getTokenRoute.js';
import getCurrentlyPlayingRoute from './routes/getCurrentlyPlayingRoute.js';
import authRoute from './routes/authRoute.js';
import callbackRoute from './routes/callbackRoute.js';
import getCurrentUser from './routes/getCurrentUser.js';
import currentlyPlaying from './routes/embed/currentlyPlaying.js';
import currentlyPlayingPNG from './routes/embed/currentlyPlayingPNG.js';
import { tokenRefreshMiddleware } from './middlewares/tokenRefreshMiddleware.js';
import { pageNotFoundMiddleware } from './middlewares/pageNotFoundMiddleware.js';
dotenv.config();
const app = express();
connectToMongoDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(authRoute);
app.use(callbackRoute);
app.use(express.json());
app.use(tokenRefreshMiddleware);
app.use(getTokenRoute);
app.use(getCurrentlyPlayingRoute);
app.use(getCurrentUser);
app.use(currentlyPlaying);
app.use(currentlyPlayingPNG);
app.use(pageNotFoundMiddleware);
export default app;
