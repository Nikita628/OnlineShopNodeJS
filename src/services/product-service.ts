import { IProduct } from "../models/product";

const products: IProduct[] = [
  {
    id: Math.random().toString(),
    title: "adipisicing",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi!",
    imageUrl: "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
    price: 123.33,
  },
  {
    id: Math.random().toString(),
    title: "amet consectetur",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi!",
    imageUrl: "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
    price: 444.5,
  },
];

export class ProductService {
  getProducts(): IProduct[] {
    return [...products];
  }

  addProduct(product: IProduct): void {
    product.id = Math.random().toString();
    products.push(product);
  }

  getProduct(id: string): IProduct | undefined {
    return products.find(p => p.id === id);
  }
}

export const productServiceInstance = new ProductService();
