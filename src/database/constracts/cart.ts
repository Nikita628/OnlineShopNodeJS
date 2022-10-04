import { ICartItemDbModel } from "./cart-item";
import { IUserDbModel } from "./user";

export interface ICartDbModel {
  id: number;
  userId: number;
  user?: IUserDbModel;
  cartItems?: ICartItemDbModel[];
}

export interface ICartDbModelCreation extends Omit<ICartDbModel, "id" | 'user' | 'cartItems'> {}
