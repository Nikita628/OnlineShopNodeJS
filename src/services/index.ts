import { CartServiceSqlDb } from "./sql/cart-service";
import { ICartService } from "./contracts/cart-service";
import { IOrderService } from "./contracts/order-service";
import { IProductService } from "./contracts/product-service";
import { OrderServiceSqlDb } from "./sql/order-service";
import { ProductServiceSqlDb } from "./sql/product-service";
import { ProductServiceNoSqlDb } from "./nosql/product-service";

export const cartService: ICartService = new CartServiceSqlDb();
export const orderService: IOrderService = new OrderServiceSqlDb();
export const productService: IProductService = new ProductServiceNoSqlDb();