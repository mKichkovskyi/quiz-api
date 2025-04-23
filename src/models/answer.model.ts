import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { AnswerAttributes } from "../types";

/**
 * @swagger
 * components:
 *  schemas:
 *    createAnswerRequest:
 *      type: object
 *      required:
 *        -answer
 *        -questionId
 *        -userSessionId
 *      properties:
 *        answer:
 *          type: string
 *        questionId:
 *          type: string
 *        userSessionId:
 *          type: string
 *    createAnswerResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        answer:
 *          type: string
 *        questionId:
 *          type: string
 *        userSessionId:
 *          type: string
 *    getAnswersResponse:
 *      type: object
 *      properties:
 *        filter:
 *          type: object
 *        data:
 *          type: array
 *          items:
 *            $ref: "#/components/schemas/createAnswerResponse"
 */
interface AnswerCreationAttributes extends Optional<AnswerAttributes, "id"> {}
class Answer
  extends Model<AnswerAttributes, AnswerCreationAttributes>
  implements AnswerAttributes
{
  public id!: string;
  public answer!: string[];
  public questionId!: string;
  public userSessionId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Answer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    answer: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: null,
    },
    questionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "questions",
        key: "id",
      },
    },
    userSessionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "user_sessions",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "answers",
    timestamps: true,
  }
);

export default Answer;
