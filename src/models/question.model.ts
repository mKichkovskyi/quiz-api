import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import { QuestionAttributes, QuestionOptions, QuestionType } from "../types";

/**
 * @swagger
 * components:
 *  schemas:
 *    Question:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        title:
 *          type: string
 *        subTitle:
 *          type: string
 *        options:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              src:
 *                type: string
 *              content:
 *                type: string
 *        questionType:
 *          type: string
 *        updatedAt:
 *          type: string
 *        createAt:
 *          type: string
 *    getQuestionResponse:
 *      type: object
 *      properties:
 *        data:
 *          type: object
 *          properties:
 *            totalItems:
 *              type: integer
 *            items:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Question"
 *            page:
 *              type: integer
 *            totalPages:
 *              type: integer
 *            limit:
 *              type: integer
 */
interface QuestionCreationAttributes
  extends Optional<QuestionAttributes, "id"> {}

class Question
  extends Model<QuestionAttributes, QuestionCreationAttributes>
  implements QuestionAttributes
{
  public id!: string;
  public title!: string;
  public subTitle?: string;
  public options?: QuestionOptions[] | null;
  public questionType!: QuestionType;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Question.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    subTitle: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    options: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: null,
    },
    questionType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "text",
    },
  },
  {
    sequelize,
    tableName: "questions",
    timestamps: true,
  }
);

export default Question;
