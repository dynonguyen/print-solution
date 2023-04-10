import to from 'await-to-js';
import { Arg, Args, Authorized, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import logger from '~/config/logger';
import { USER_ROLES } from '~/constants/common';
import DEFAULTS from '~/constants/default';
import { ERROR_CODE, SUCCESS_CODE } from '~/constants/status-code';
import CategoryModel from '~/models/category';
import ProductModel from '~/models/product';
import MutationResponse from '~/types/core/MutationResponse';
import { PaginationArgs } from '~/types/core/PaginationArg';
import Category from '~/types/entities/Category';
import Product from '~/types/entities/Product';
import { ProductInput, QueryProductArgs } from '~/types/input/Product';
import { AddProductResponse, ProductPaginatedResponse, ProductResponse } from '~/types/response/Product';
import { generateId, toSearchQuery } from '~/utils/helper';
import mongoosePaginate from '~/utils/mongoose-paginate';

@Resolver()
class ProductResolver {
  @Query((_return) => ProductPaginatedResponse)
  async products(@Args() args: PaginationArgs): Promise<ProductPaginatedResponse> {
    let { page = 1, pageSize = DEFAULTS.PAGE_SIZE, sort, search, searchBy } = args;

    if (page < 1) page = 1;
    if (pageSize < 1) pageSize = DEFAULTS.PAGE_SIZE;

    const [err, productDocs] = await to(
      mongoosePaginate(ProductModel, { ...toSearchQuery(search, searchBy) }, { page, pageSize }, { sort })
    );

    if (err) {
      logger.error('categories query error: ', err);
      return { code: ERROR_CODE.BAD_REQUEST, ...DEFAULTS.PAGINATED_RESPONSE };
    }

    return { code: SUCCESS_CODE.OK, ...productDocs, sort, search };
  }

  @Query((_return) => ProductResponse)
  async product(@Args() { uuid }: QueryProductArgs): Promise<ProductResponse> {
    const product = await ProductModel.findOne({ uuid });
    if (!product) {
      return { code: ERROR_CODE.NOT_FOUND, doc: null, msg: 'Product not found' };
    }
    return { code: SUCCESS_CODE.OK, doc: product };
  }

  @Authorized(USER_ROLES.ADMIN)
  @Mutation((_return) => AddProductResponse)
  async addProduct(@Arg('addProductInput') args: ProductInput): Promise<AddProductResponse> {
    const isExist = await ProductModel.exists({ name: args.name, categoryId: args.categoryId });
    if (isExist) {
      return { code: ERROR_CODE.BAD_REQUEST, msg: 'Sản phẩm đã tồn tại.', success: false };
    }

    const createdAt = new Date();

    const [err, newProduct] = await to(
      ProductModel.create({ ...args, uuid: generateId(), createdAt, updatedAt: createdAt })
    );

    if (err) {
      logger.error('Add product failed: ', err);
      return { code: ERROR_CODE.BAD_REQUEST, msg: 'Thêm sản phẩm thất bại, thử lại', success: false };
    }

    await CategoryModel.updateOne({ _id: newProduct.categoryId }, { $inc: { numOfProducts: 1 } });

    return { success: true, code: SUCCESS_CODE.CREATED, doc: newProduct };
  }

  @Authorized(USER_ROLES.ADMIN)
  @Mutation((_return) => MutationResponse)
  async updateProduct(@Arg('updateProductInput') args: ProductInput): Promise<MutationResponse> {
    const isExist = await ProductModel.exists({ uuid: args.uuid });
    if (!isExist) {
      return { code: ERROR_CODE.BAD_REQUEST, msg: 'Sản phẩm không tồn tại.', success: false };
    }

    const [err] = await to(ProductModel.updateOne({ uuid: args.uuid }, { $set: { ...args } }));

    if (err) {
      return { success: false, code: ERROR_CODE.BAD_REQUEST };
    }

    return { success: true, code: SUCCESS_CODE.OK };
  }
}

@Resolver((_of) => Product)
export class ProductFieldResolver {
  @FieldResolver()
  async category(@Root() { _doc: product }: Product): Promise<Category | null> {
    if (!product?.categoryId) return null;
    const category = await CategoryModel.findById(product.categoryId);
    if (category?._id) return category;
    return null;
  }
}

export default ProductResolver;
