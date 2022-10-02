import sequilize, { Model } from "sequelize";
import { db } from "../sql";
import { Cart } from "./cart";
import { IProductDbModel, Product } from "./product";

export interface ICartItemDbModel {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product?: IProductDbModel;
}

export interface ICartItemDbModelCreation
  extends Omit<ICartItemDbModel, "id" | 'product'> {}

const CartItem = db.define<Model<ICartItemDbModel, ICartItemDbModelCreation>>(
  "cart_item",
  {
    id: {
      type: sequilize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    cartId: {
      type: sequilize.INTEGER,
      onDelete: "RESTRICT",
      allowNull: false,
      references: {
        key: "id",
        model: Cart,
      },
    },
    productId: {
      type: sequilize.INTEGER,
      onDelete: "RESTRICT",
      allowNull: false,
      references: {
        key: "id",
        model: Product,
      },
    },
    quantity: {
      type: sequilize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }
);

CartItem.belongsTo(Cart);
CartItem.belongsTo(Product);

export { CartItem };
