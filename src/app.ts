import express from 'express';
import getTokenRoute from './routes/getTokenRoute';
import getCurrentlyPlayingRoute from './routes/getCurrentPlayingRoute';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use(getTokenRoute);
app.use(getCurrentlyPlayingRoute);

export default app;