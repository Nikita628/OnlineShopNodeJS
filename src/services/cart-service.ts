import { ICart } from "../models/cart";
import { ICartService } from "./contracts/cart-service";
import { productServiceInstance } from "./product-service";

const cart: ICart = {
  products: [],
  totalPrice: 0,
};

export class CartServiceInMemory implements ICartService {
  public addToCart(productId: string): void {
    const product = productServiceInstance.getProduct(productId);

    if (!product) {
      return;
    }

    const productInCart = cart.products.find((p) => p.product.id === productId);

    if (productInCart) {
      productInCart.quantity++;
    } else {
      cart.products.push({
        quantity: 1,
        product: product,
      });
    }

    cart.totalPrice += product.price;
  }

  public getCart(cartId: string): ICart {
    return cart;
  }

  public deleteFromCart(productId: string): void {
    cart.products = cart.products.filter((p) => {
      if (p.product.id === productId) {
        cart.totalPrice -= p.quantity * p.product.price;
        return false;
      }

      return true;
    });
  }
}

export const cartServiceInstance: ICartService = new CartServiceInMemory();
