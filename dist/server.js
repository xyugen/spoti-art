import express from 'express';
const app = express();
const port = 8000;
app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
