import logger from "../logger";
import { Question } from "../models";
import { IOptions, PaginatedResponse } from "../types";

/**
 * Query for questions
 * @param {IOptions} options - Query options for pagination
 * @returns {Promise<PaginatedResponse<Question>>} Paginated list of questions
 */
export const queryQuestions = async (
  options: IOptions
): Promise<PaginatedResponse<Question>> => {
  try {
    const { page, limit } = options;
    const offset = (page - 1) * limit;

    const { count, rows } = await Question.findAndCountAll({
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit) || 0;

    return {
      totalItems: count,
      items: rows,
      page,
      totalPages,
      limit,
    };
  } catch (error: any) {
    logger.error(`Error: ${error.message}`);
    throw new Error(error.message);
  }
};

/**
 * Find question by primary key
 * @param {String} pk - Primary key
 * @returns {Promise<Question | null>} - Retun user session if exist
 */
export const findQuestionByPK = async (pk: string): Promise<Question | null> =>
  Question.findByPk(pk);
