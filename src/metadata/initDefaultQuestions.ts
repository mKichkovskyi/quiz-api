import logger from "../logger";
import { Question } from "../models";
import { QuestionAttributes } from "../types";
import questions from "./questions.json";

export const initDefaultQuestions = async () => {
  try {
    const existingCount = await Question.count();

    if (existingCount === 0) {
      const q = questions as QuestionAttributes[];
      await Question.bulkCreate(q);
      logger.info("Default questions initialized.");
    } else {
      logger.info("Questions already exist. Skipping initialization.");
    }
  } catch {
    logger.error("initDefaultQuestions err");
  }
};
