import sequilize, { Model } from "sequelize";
import { db } from "../sql";

export interface IUserDbModel {
  id: number;
  name: string;
  email: string;
}

export interface IUserDbModelCreation extends Omit<IUserDbModel, "id"> {}

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
