import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ObjectSchema } from "joi";

type SchemaContainer = {
  query?: ObjectSchema;
  params?: ObjectSchema;
  body?: ObjectSchema;
};

const validate =
  (schema: Record<string, any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const targets = Object.keys(schema) as (keyof SchemaContainer)[];
    const validated: Record<string, any> = {};

    for (const key of targets) {
      if (schema[key]) {
        const { error, value } = schema[key]!.validate(req[key], {
          errors: { label: "key" },
        });

        if (error) {
          res.status(httpStatus.BAD_REQUEST).json({
            error,
          });
          return;
        }

        validated[key] = value;
      }
    }

    req.validated = validated;

    next();
  };

export default validate;
