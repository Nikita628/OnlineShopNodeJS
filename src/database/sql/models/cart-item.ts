import sequilize, { Model } from "sequelize";
import { ICartItemDbModel, ICartItemDbModelCreation } from "../../constracts/cart-item";
import { db } from "../sql";
import { Cart } from "./cart";
import { Product } from "./product";

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
