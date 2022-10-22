import {
  ICartItemNoSqlDbModel,
  ICartItemSqlDbModel,
} from "../../../database/contracts/cart-item";
import { ICartItem } from "../../../models/cart/cart-item";

export interface ICartItemMapper {
  toModelFromDbModel(item: ICartItemSqlDbModel): ICartItem;
  toModelFromNoSqlDbModel(item: ICartItemNoSqlDbModel): ICartItem;
}
