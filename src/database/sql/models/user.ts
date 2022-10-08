import sequilize, { Model } from "sequelize";
import { IUserSqlDbModel, IUserSqlDbModelForCreate } from "../../contracts/user";
import { db } from "../sql";

const User = db.define<Model<IUserSqlDbModel, IUserSqlDbModelForCreate>>("user", {
  id: {
    type: sequilize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: sequilize.STRING,
    allowNull: false,
  },
  email: {
    type: sequilize.STRING,
    allowNull: false,
  },
});

export { User };
