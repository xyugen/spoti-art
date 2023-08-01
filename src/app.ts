import dotenv from 'dotenv';
import express from 'express';
import getTokenRoute from './routes/getTokenRoute.js';
import getCurrentlyPlayingRoute from './routes/getCurrentPlayingRoute.js';
import authRoute from './routes/authRoute.js';
import callbackRoute from './routes/callbackRoute.js';

import testRoute from './routes/testRoute.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use(getTokenRoute);
app.use(getCurrentlyPlayingRoute);
app.use(authRoute);
app.use(callbackRoute);
app.use(testRoute);

export default app;