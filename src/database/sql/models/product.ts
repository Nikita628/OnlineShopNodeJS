import sequilize, { Model } from "sequelize";
import { db } from "../sql";
import { Cart } from "./cart";
import { CartItem } from "./cart-item";
import { User } from "./user";

export interface IProductDbModel {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  userId: number;
}

export interface IProductDbModelCreation extends Omit<IProductDbModel, "id"> {}

const Product = db.define<Model<IProductDbModel, IProductDbModelCreation>>(
  "product",
  {
    id: {
      type: sequilize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: sequilize.STRING,
      allowNull: false,
    },
    price: {
      type: sequilize.DOUBLE,
      allowNull: false,
    },
    imageUrl: {
      type: sequilize.STRING,
      allowNull: false,
    },
    description: {
      type: sequilize.TEXT,
      allowNull: false,
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
  }
);

Product.belongsToMany(Cart, { through: 'cart_item' });

export { Product };
