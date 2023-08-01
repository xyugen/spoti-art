import { Request } from "express";

declare module 'express' {
    interface Request {
        musicData?: any;
        userData?: any;
        accessToken?: any;
    }
}