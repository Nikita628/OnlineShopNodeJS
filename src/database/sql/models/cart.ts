import sequilize, { Model } from "sequelize";
import { db } from "../sql";
import { ICartItemDbModel } from "./cart-item";
import { IUserDbModel, User } from "./user";

export interface ICartDbModel {
  id: number;
  userId: number;
  user?: IUserDbModel;
  cartItems?: ICartItemDbModel[];
}

export interface ICartDbModelCreation extends Omit<ICartDbModel, "id"> {}

const Cart = db.define<Model<ICartDbModel, ICartDbModelCreation>>("cart", {
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

Cart.belongsTo(User);

export { Cart };
