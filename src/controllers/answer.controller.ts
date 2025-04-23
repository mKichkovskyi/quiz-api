import { Request, Response } from "express";
import httpStatus from "http-status";
import * as questionService from "../services/question.service";
import * as answerService from "../services/answer.service";
import * as userSessionService from "../services/userSession.service";
import { CreateAnswerRequestBody } from "../types";
import pick from "../utils/pick";

export const createAnswer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { questionId, answer, userSessionId } = req.validated
      ?.body as CreateAnswerRequestBody;

    const session = await userSessionService.findUserSessionByPK(userSessionId);
    if (!session) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "UserSession is not found!",
      });
    }

    const question = await questionService.findQuestionByPK(questionId);
    if (!question) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "Question is not found!",
      });
    }

    const newAnswer = await answerService.createAnswer({
      answer,
      questionId,
      userSessionId,
    });

    await newAnswer.save();

    res.status(httpStatus.CREATED).json({
      data: newAnswer,
    });
  } catch (error: any) {
    console.error("Error creating user session:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

export const getAnswers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const filter = pick(req.validated?.query, ["userSessionId"]);
    const questions = await answerService.queryAnswers(filter);

    res.status(httpStatus.OK).json({
      filter,
      data: questions,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};
