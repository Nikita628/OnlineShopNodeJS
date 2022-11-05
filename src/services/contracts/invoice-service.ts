import { IOrderNoSqlDbModel } from "../../database/contracts/order";

export interface IInvoiceService {
  generate(order: IOrderNoSqlDbModel): Promise<void>;
}
