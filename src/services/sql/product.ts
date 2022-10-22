import {
  IProduct,
  IProductSearchParam,
  productMapper,
} from "../../models/product";
import { IProductService } from "../contracts/product-service";
import { Product } from "../../database/sql/models/product";
import { FindOptions } from "sequelize";
import { IProductSqlDbModel } from "../../database/contracts/product";

export class ProductServiceSqlDb implements IProductService {
  public async getProducts(
    searchParam: IProductSearchParam
  ): Promise<IProduct[]> {
    const filter: FindOptions<IProductSqlDbModel> = {};

    if (searchParam.userId) {
      filter.where = {};
      filter.where.userId = searchParam.userId;
    }

    const dbModels = await Product.findAll(filter);

    return dbModels.map((m) => productMapper.toModelFromDbModel(m.get()));
  }

  public async createProduct(product: IProduct): Promise<void> {
    await Product.create({
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      title: product.title,
      userId: +product.userId,
    });
  }

  public async getProduct(id: string): Promise<IProduct | null> {
    const dbModel = await Product.findOne({ where: { id } });

    return dbModel
      ? productMapper.toModelFromDbModel(dbModel.get())
      : null;
  }

  public async updateProduct(product: IProduct): Promise<void> {
    await Product.update(
      {
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
        title: product.title,
      },
      { where: { id: product.id } }
    );
  }

  public async deleteProduct(productId: string): Promise<void> {
    await Product.destroy({ where: { id: productId } });
  }
}
