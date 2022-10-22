import { ICart } from "../../../models/cart/cart";
import {
  ICartNoSqlDbModel,
  ICartSqlDbModel,
} from "../../../database/contracts/cart";

export interface ICartMapper {
  toModelFromDbModel(item: ICartSqlDbModel): ICart;
  toModelFromNoSqlDbModel(item: ICartNoSqlDbModel): ICart;
}
