import logger from "../logger";
import { Answer } from "../models";
import { AnswerAttributes } from "../types";

/**
 * Create answer for question for user-session
 * @param {AnswerAttributes} body - answer data
 * @returns {Promise<Answer>} - Retun new answer
 */
export const createAnswer = async (body: AnswerAttributes): Promise<Answer> =>
  await Answer.create(body);

/**
 * Query for Answers
 * @param {IOptions} options - Query options for pagination
 * @returns {Promise<PaginatedResponse<Question>>} Paginated list of Answers
 */
export const queryAnswers = async (filter: {
  userSessionId?: string;
}): Promise<Answer[]> => {
  try {
    const whereClause: Record<string, any> = {};
    if (filter?.userSessionId) {
      whereClause.where = { userSessionId: filter.userSessionId };
    }
    const res = await Answer.findAll(whereClause);

    return res;
  } catch (error: any) {
    logger.error(`Error: ${error.message}`);
    throw new Error(error.message);
  }
};
