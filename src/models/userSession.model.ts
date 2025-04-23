import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import { UserSessionAttributes } from "../types";

/**
 * @swagger
 * components:
 *  schemas:
 *    createUserSessionResponse:
 *      type: object
 *      properties:
 *        data:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *            completed:
 *              type: boolean
 *              default: false
 *            updatedAt:
 *              type: string
 *            createAt:
 *              type: string
 */
interface UserSessionCreationAttributes
  extends Optional<UserSessionAttributes, "id"> {}

class UserSession
  extends Model<UserSessionAttributes, UserSessionCreationAttributes>
  implements UserSessionAttributes
{
  public id!: string;
  public completed!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserSession.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "user_sessions",
    timestamps: true,
  }
);

export default UserSession;
