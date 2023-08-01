import app from './app.js';

const port: number = 8000;

app.listen(port, () => {
    console.log(`Server running of port ${port}`);
});