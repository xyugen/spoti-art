import express from 'express';
import getTokenRoute from './routes/getTokenRoute.js';
import getCurrentlyPlayingRoute from './routes/getCurrentPlayingRoute.js';
const app = express();
app.use(express.json());
app.use(getTokenRoute);
app.use(getCurrentlyPlayingRoute);
export default app;
