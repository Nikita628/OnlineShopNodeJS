import sequilize, { Model } from "sequelize";
import { IOrderSqlDbModel, IOrderDbModelCreation } from "../../contracts/order";
import { db } from "../sql";
import { User } from "./user";

const Order = db.define<Model<IOrderSqlDbModel, IOrderDbModelCreation>>("order", {
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
