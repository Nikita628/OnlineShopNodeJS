export interface IBaseProductDbModel {
  title: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface IProductSqlDbModel extends IBaseProductDbModel {
  id: number;
  userId: number;
}

export interface IProductSqlDbModelForCreate extends Omit<IProductSqlDbModel, "id"> {}

export interface IProductNoSqlDbModel extends IBaseProductDbModel {
  _id: string;
  userId: string;
}

export interface IProductNoSqlDbModelForCreate extends Omit<IProductNoSqlDbModel, "_id"> {}