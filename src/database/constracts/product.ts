export interface IProductDbModel {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  userId: number;
}

export interface IProductDbModelCreation extends Omit<IProductDbModel, "id"> {}

