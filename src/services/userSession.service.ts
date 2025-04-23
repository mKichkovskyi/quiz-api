import { UserSession } from "../models";
import { UserSessionAttributes } from "../types";

/**
 * Create user-session
 * @param {UserSessionAttributes} body - Data for new user-session
 * @returns {Promise<UserSession>} - Retun new user session
 */
export const createUserSession = async (
  body: UserSessionAttributes
): Promise<UserSession> => await UserSession.create(body);

/**
 * Find user session by primary key
 * @param {String} pk - Primary key
 * @returns {Promise<UserSession | null>} - Retun user session if exist
 */
export const findUserSessionByPK = async (
  pk: string
): Promise<UserSession | null> => UserSession.findByPk(pk);
