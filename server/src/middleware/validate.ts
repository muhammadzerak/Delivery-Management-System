import { ZodObject, ZodRawShape } from "zod";
import { Request, Response, NextFunction } from "express";
import { failure } from "../utils/response";

export const validate =
    (schema: ZodObject<ZodRawShape>) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse({
                    body: req.body,
                    params: req.params,
                    query: req.query,
                });
                next();
            } catch (err: any) {
                return failure(res, "Validation error", 400, err);
            }
        };
