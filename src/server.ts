import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port: number = 8000;

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});
