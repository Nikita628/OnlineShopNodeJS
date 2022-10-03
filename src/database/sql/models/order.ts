import sequilize, { Model } from "sequelize";
import { db } from "../sql";
import { IOrderItemDbModel } from "./order-item";
import { IUserDbModel, User } from "./user";

export interface IOrderDbModel {
  id: number;
  userId: number;
  user?: IUserDbModel;
  orderItems?: IOrderItemDbModel[];
}

export interface IOrderDbModelCreation extends Omit<IOrderDbModel, "id"> {}

const Order = db.define<Model<IOrderDbModel, IOrderDbModelCreation>>("order", {
  id: {
    type: sequilize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: sequilize.INTEGER,
    onDelete: "RESTRICT",
    allowNull: false,
    references: {
      key: "id",
      model: User,
    },
  },
});

Order.belongsTo(User);

export { Order };
