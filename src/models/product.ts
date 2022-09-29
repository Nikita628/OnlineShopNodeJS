export interface IProduct {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

export const productMapper = {
  toModel(item: any): IProduct {
    return {
      title: item.title ?? '',
      imageUrl: item.imageUrl ?? 'https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg',
      description: item.description ?? '',
      price: Number(item.price) || 0,
    }
  }
};
