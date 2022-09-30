import { ICart } from "../models/cart";
import { productServiceInstance } from "./product-service";

const cart: ICart = {
  products: [
    {
      quantity: 1,
      product: {
        id: Math.random().toString(),
        title: "adipisicing",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi!",
        imageUrl:
          "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
        price: 123.33,
      },
    },
  ],
  totalPrice: 123.33,
};

export class CartService {
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

  public deleteProductFromCart(productId: string): void {
    cart.products = cart.products.filter((p) => {
      if (p.product.id === productId) {
        cart.totalPrice -= (p.quantity * p.product.price);
        return false;
      }

      return true;
    });
  }
}

export const cartServiceInstance = new CartService();
