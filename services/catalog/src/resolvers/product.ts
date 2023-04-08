import to from 'await-to-js';
import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import logger from '~/config/logger';
import { USER_ROLES } from '~/constants/common';
import { ERROR_CODE, SUCCESS_CODE } from '~/constants/status-code';
import ProductModel from '~/models/product';
import { ProductInput } from '~/types/input/Product';
import { AddProductResponse } from '~/types/response/Product';
import { generateId } from '~/utils/helper';

@Resolver()
class ProductResolver {
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

    return { success: true, code: SUCCESS_CODE.CREATED, doc: newProduct };
  }
}

export default ProductResolver;
