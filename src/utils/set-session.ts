import { Request, Response } from 'express';

export function setSessionToken(options: {
    sessionToken: string;
    rememberMe: boolean;
    req: Request;
    res: Response;
}) {
    const { sessionToken, rememberMe, req, res } = options;
    if (req.session) {
        req.session.id = sessionToken
    }
}