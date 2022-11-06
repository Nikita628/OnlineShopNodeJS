import {
  IProduct,
  IProductForCreate,
  IProductSearchParam,
} from "../../models/product";
import { IProductService } from "../contracts/product-service";
import { IProductNoSqlDbModel } from "../../database/contracts/product";
import { ProductModel } from "../../database/nosql/models/product";
import { FilterQuery } from "mongoose";
import { productMapper, productValidator } from "..";
import { Result } from "../../models/utils/result";
import { AggregatedError } from "../../models/utils/aggregated-error";
import { IPage } from "../../models/utils/pagination";

export class ProductServiceNoSqlDb implements IProductService {
  public async getProducts(
    searchParam: IProductSearchParam
  ): Promise<IPage<IProduct>> {
    const filter: FilterQuery<IProductNoSqlDbModel> = {};

    if (searchParam.userId) {
      filter.userId = { $eq: searchParam.userId };
    }

    const productsFromDb = await ProductModel.find(filter)
      .skip(searchParam.pageSize * (searchParam.page - 1))
      .limit(searchParam.pageSize);

    return {
      items: productsFromDb.map((i) =>
        productMapper.toModelFromNoSqlDbModel(i)
      ),
      total: await ProductModel.countDocuments(),
    };
  }

  public async createProduct(
    product: IProductForCreate
  ): Promise<Result<boolean, AggregatedError>> {
    const validationResult = productValidator.onCreate(product);

    if (validationResult) {
      return new Result({ error: validationResult });
    }

    await ProductModel.create({
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      title: product.title,
      userId: product.userId,
    });

    return new Result({ value: true });
  }

  public async getProduct(id: string): Promise<IProduct | null> {
    const dbModel = await ProductModel.findById(id);

    return dbModel
      ? productMapper.toModelFromNoSqlDbModel(dbModel.toObject())
      : null;
  }

  public async updateProduct(
    product: IProduct
  ): Promise<Result<boolean, AggregatedError>> {
    const validationResult = productValidator.onUpdate(product);

    if (validationResult) {
      return new Result({ error: validationResult });
    }

    await ProductModel.updateOne(
      { _id: { $eq: product.id } },
      {
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
        title: product.title,
      }
    );

    return new Result({ value: true });
  }

  public async deleteProduct(productId: string): Promise<void> {
    await ProductModel.deleteOne({ _id: { $eq: productId } });
  }
}
