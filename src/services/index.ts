import { CartServiceSqlDb } from "./sql/cart-service";
import { ICartService } from "./contracts/cart-service";
import { IOrderService } from "./contracts/order-service";
import { IProductService } from "./contracts/product-service";
import { OrderServiceSqlDb } from "./sql/order-service";
import { ProductServiceSqlDb } from "./sql/product-service";
import { ProductServiceNoSqlDb } from "./nosql/product-service";
import { OrderServiceNoSqlDb } from "./nosql/order-service";
import { CartServiceNoSqlDb } from "./nosql/cart-service";

export const cartService: ICartService = new CartServiceNoSqlDb();
export const orderService: IOrderService = new OrderServiceNoSqlDb();
export const productService: IProductService = new ProductServiceNoSqlDb();