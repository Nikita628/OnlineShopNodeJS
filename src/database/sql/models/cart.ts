import sequilize, { Model } from "sequelize";
import { ICartDbModel, ICartDbModelCreation } from "../../contracts/cart";
import { db } from "../sql";
import { User } from "./user";

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
