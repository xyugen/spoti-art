import dotenv from 'dotenv';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Routes
import getTokenRoute from './routes/getTokenRoute.js';
import getCurrentlyPlayingRoute from './routes/getCurrentlyPlayingRoute.js';
import authRoute from './routes/authRoute.js';
import callbackRoute from './routes/callbackRoute.js';

// Clients
import renderCurrentlyPlaying from './routes/embed/currently-playing.js';

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the 'public' folder
app.use('/', express.static(path.join(__dirname, '../public')));

// Middleware
app.use(express.json());

// Routes
app.use(getTokenRoute);
app.use(getCurrentlyPlayingRoute);
app.use(authRoute);
app.use(callbackRoute);

// Clients
app.use(renderCurrentlyPlaying);

export default app;