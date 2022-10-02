import sequilize, { Model } from "sequelize";
import { db } from "../sql";

export interface IProductDbModel {
    id: number,
    title: string,
    price: number,
    imageUrl: string,
    description: string,
}

export interface IProductDbModelCreation extends Omit<IProductDbModel, 'id'>{};

const Product = db.define<Model<IProductDbModel, IProductDbModelCreation>>("product", {
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
});

export { Product };