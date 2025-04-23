import sequelize from "../config/database";
import Question from "./question.model";
import Answer from "./answer.model";
import UserSession from "./userSession.model";

Answer.belongsTo(Question, { foreignKey: "questionId" });
Answer.belongsTo(UserSession, { foreignKey: "userSessionId" });
UserSession.hasMany(Answer, { foreignKey: "userSessionId" });
Question.hasMany(Answer, { foreignKey: "questionId" });

export { sequelize, Question, Answer, UserSession };
