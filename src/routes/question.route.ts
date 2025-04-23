import express from "express";
import * as questionsController from "../controllers/question.controller";
import * as questionsValidation from "../validation/questions.validation";
import validate from "../middlewares/validate.middleware";

const router = express.Router();
/**
 * @swagger
 * /questions:
 *  get:
 *    tags:
 *      - Question
 *    summary: Get questions
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          default: 1
 *        description: The number of current page.
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          default: 10
 *        description: The numbers of items to return.
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/getQuestionResponse'
 *      400:
 *        description: Bad Request
 */
router
  .route("/")
  .get(
    validate(questionsValidation.getQuestions),
    questionsController.getQuestions
  );

export default router;
