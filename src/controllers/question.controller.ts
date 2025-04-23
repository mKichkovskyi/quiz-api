import { Request, Response } from "express";
import httpStatus from "http-status";
import * as questionService from "../services/question.service";
import { IOptions } from "../types";
import pick from "../utils/pick";

export const getQuestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const options: IOptions = pick(req.validated?.query, ["page", "limit"]);
    const questions = await questionService.queryQuestions(options);

    res.status(httpStatus.OK).json({
      data: questions,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};
