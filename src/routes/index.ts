import express from "express";
import questionRoute from "./question.route";
import userSessionRoute from "./userSession.route";
import answersRoute from "./answers.route";

const router = express.Router();

router.use("/questions", questionRoute);
router.use("/user-sessions", userSessionRoute);
router.use("/answers", answersRoute);

export default router;
