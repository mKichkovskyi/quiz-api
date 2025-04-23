import { HttpError } from "../types";
import httpStatus from "http-status";
import { NextFunction, Request, Response, Express } from "express";

const registerGlobalErrorHandlers = (app: Express) => {
  // Catch incorrect routes
  app.use((_req, _res, next) => {
    const error: HttpError = new Error("Route not found");
    error.status = httpStatus.NOT_FOUND;
    next(error);
  });

  // Global err
  app.use(
    (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
      res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).json({
        message: err.message || "Something went wrong",
      });
    }
  );
};

export default registerGlobalErrorHandlers;
