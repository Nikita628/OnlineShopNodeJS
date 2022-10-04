import sequilize, { Model } from "sequelize";
import { IProductSqlDbModel, IProductSqlDbModelForCreate } from "../../contracts/product";
import { db } from "../sql";
import { Cart } from "./cart";
import { Order } from "./order";
import { User } from "./user";

const Product = db.define<Model<IProductSqlDbModel, IProductSqlDbModelForCreate>>(
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

Product.belongsToMany(Cart, { through: "cart_item" });
Product.belongsToMany(Order, { through: "order_item" });

export { Product };
