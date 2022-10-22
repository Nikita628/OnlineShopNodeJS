import {
  IProductInOrderItemNoSqlDbModel,
  IProductNoSqlDbModel,
  IProductSqlDbModel,
} from "../../../database/contracts/product";
import { IProduct, IProductForCreate } from "../../../models/product";

export interface IProductMapper {
  toModelForCreate(item: any): IProductForCreate;
  toModel(item: any): IProduct;
  toModelFromDbModel(item: IProductSqlDbModel): IProduct;
  toModelFromNoSqlDbModel(item: IProductNoSqlDbModel): IProduct;
  toModelFromInOrderItemNoSqlDbModel(
    item: IProductInOrderItemNoSqlDbModel
  ): IProduct;
}
