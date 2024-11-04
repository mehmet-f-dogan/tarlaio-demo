import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string; // Assuming 'id' is part of the JWT payload
            };
        }
    }
}
