import sequilize, { Model } from "sequelize";
import { IUserDbModel, IUserDbModelCreation } from "../../constracts/user";
import { db } from "../sql";

const User = db.define<Model<IUserDbModel, IUserDbModelCreation>>("user", {
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
