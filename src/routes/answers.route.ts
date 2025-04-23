import express from "express";
import * as answerController from "../controllers/answer.controller";
import * as answerValidation from "../validation/answer.validation";
import validate from "../middlewares/validate.middleware";

const router = express.Router();
/**
 * @swagger
 * /answers:
 *  get:
 *    tags:
 *      - Answer
 *    summary: Get answers
 *    parameters:
 *      - in: query
 *        name: userSessionId
 *        schema:
 *          type: string
 *        description: id of user session
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/getAnswersResponse'
 *      400:
 *        description: Bad Request
 */
router
  .route("/")
  .get(validate(answerValidation.getAnswers), answerController.getAnswers);

/**
 * @swagger
 * /answers:
 *  post:
 *    tags:
 *      - Answer
 *    summary: create new answer
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/createAnswerRequest'
 *          example:
 *            answer: a
 *            questionId: e2982993-dd3a-456f-babc-92bb13d88fea
 *            userSessionId: 874a4dbf-2ab8-4e51-912a-d4e6aa19d4d6
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/createAnswerResponse'
 *      404:
 *        description: Not found
 */
router
  .route("/")
  .post(validate(answerValidation.createAnswer), answerController.createAnswer);

export default router;
