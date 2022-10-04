import sequilize, { Model } from "sequelize";
import { IOrderItemDbModel, IOrderItemDbModelCreation } from "../../constracts/order-item";
import { db } from "../sql";
import { Order } from "./order";
import { Product } from "./product";

const OrderItem = db.define<Model<IOrderItemDbModel, IOrderItemDbModelCreation>>(
  "order_item",
  {
    id: {
      type: sequilize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    orderId: {
      type: sequilize.INTEGER,
      onDelete: "RESTRICT",
      allowNull: false,
      references: {
        key: "id",
        model: Order,
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

OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);

export { OrderItem };
