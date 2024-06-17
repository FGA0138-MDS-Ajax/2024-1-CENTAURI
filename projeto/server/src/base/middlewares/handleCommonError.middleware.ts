import { type NextFunction, type Request, type Response } from "express";
import { type ErrorResponse } from "../schemas/error.schema";
import { HttpError } from "http-errors";

export function handleCommonError(
    err: Error,
    req: Request,
    res: Response<ErrorResponse>,
    next: NextFunction,
) {
    if (err instanceof HttpError) {
        return res.status(err.status).json({
            message: err.message,
            timestamp: new Date().toISOString(),
        });
    }

    return res.status(500).json({
        message: err.message,
        timestamp: new Date().toISOString(),
    });
}
