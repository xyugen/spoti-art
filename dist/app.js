import express from 'express';
import getTokenRoute from './routes/getTokenRoute';
import getCurrentlyPlayingRoute from './routes/getCurrentPlayingRoute';
const app = express();
app.use(express.json());
app.use(getTokenRoute);
app.use(getCurrentlyPlayingRoute);
export default app;
