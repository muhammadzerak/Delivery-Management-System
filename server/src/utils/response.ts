// utils/response.ts
import { Response } from "express";

export const success = (
    res: Response,
    data: any = {},
    message = "Success",
    statusCode = 200
) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

export const failure = (
    res: Response,
    message = "Something went wrong",
    statusCode = 500,
    error: any = null
) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error,
    });
};
