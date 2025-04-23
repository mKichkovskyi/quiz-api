import express from "express";
import * as userSessionController from "../controllers/userSession.controller";
import * as userSessionValidation from "../validation/userSession.validation";
import validate from "../middlewares/validate.middleware";

const router = express.Router();

/**
 * @swagger
 * /user-sessions:
 *  post:
 *    tags:
 *      - UserSession
 *    summary: Create user session
 *    responses:
 *      201:
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/createUserSessionResponse'
 *      500:
 *        description: Internal server error
 */
router
  .route("/")
  .post(
    validate(userSessionValidation.createUserSession),
    userSessionController.createUserSession
  );

export default router;
