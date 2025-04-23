import { Request, Response } from "express";
import logger from "../logger";
import * as userSessionService from "../services/userSession.service";
import httpStatus from "http-status";

export const createUserSession = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const session = await userSessionService.createUserSession({
      completed: false,
    });

    await session.save();

    res.status(httpStatus.CREATED).json({
      data: session,
    });
  } catch (error: any) {
    logger.error(`createUserSession err: ${error.message}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};
