import to from 'await-to-js';
import { Arg, Args, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import logger from '~/config/logger';
import { USER_ROLES } from '~/constants/common';
import DEFAULTS from '~/constants/default';
import { ERROR_CODE, SUCCESS_CODE } from '~/constants/status-code';
import CategoryModel from '~/models/category';
import MutationResponse from '~/types/core/MutationResponse';
import { PaginationArgs } from '~/types/core/PaginationArg';
import { AddCategoryInput, DeleteCategoryInput, UpdateCategoryInput } from '~/types/input/Category';
import { AddCategoryResponse, CategoryPaginatedResponse } from '~/types/response/Category';
import mongoosePaginate from '~/utils/mongoose-paginate';

@Resolver()
export class CategoryResolver {
  @Query((_return) => CategoryPaginatedResponse)
  async catagories(@Args() args: PaginationArgs): Promise<CategoryPaginatedResponse> {
    let { page = 1, pageSize = DEFAULTS.PAGE_SIZE, sort, search } = args;

    if (page < 1) page = 1;
    if (pageSize < 1) pageSize = DEFAULTS.PAGE_SIZE;
    const searchQuery = search ? { name: { $regex: search, $options: 'i' } } : {};

    const [err, categoryDocs] = await to(
      mongoosePaginate(CategoryModel, { ...searchQuery }, { page, pageSize }, { sort })
    );

    if (err) {
      logger.error('categories query error: ', err);
      return { code: ERROR_CODE.BAD_REQUEST, ...DEFAULTS.PAGINATED_RESPONSE };
    }

    return { code: SUCCESS_CODE.OK, ...categoryDocs, sort, search };
  }

  @Authorized(USER_ROLES.ADMIN)
  @Mutation((_return) => AddCategoryResponse)
  async addCategory(@Arg('addCategoryInput') { name, photoUrl }: AddCategoryInput): Promise<AddCategoryResponse> {
    const isExist = await CategoryModel.exists({ name: name });
    if (isExist) {
      return { code: ERROR_CODE.BAD_REQUEST, msg: 'Danh mục sản phẩm đã tồn tại.', success: false };
    }

    const [err, newCategory] = await to(CategoryModel.create({ name, photo: photoUrl, createdAt: new Date() }));
    if (err) {
      logger.error('Add category failed: ', err);
      return { code: ERROR_CODE.BAD_REQUEST, msg: 'Thêm danh mục thất bại, thử lại', success: false };
    }

    return { success: true, code: SUCCESS_CODE.CREATED, doc: newCategory };
  }

  @Authorized(USER_ROLES.ADMIN)
  @Mutation((_return) => MutationResponse)
  async deleteCategory(@Arg('deleteCategoryInput') { _id }: DeleteCategoryInput): Promise<MutationResponse> {
    const category = await CategoryModel.findById(_id);
    if (!category) return { code: SUCCESS_CODE.OK, success: true };

    if (category.numOfProducts > 0) {
      return { code: ERROR_CODE.FORBIDDEN, success: false };
    }

    await CategoryModel.deleteOne({ _id });
    return { code: SUCCESS_CODE.OK, success: true };
  }

  @Authorized(USER_ROLES.ADMIN)
  @Mutation((_return) => MutationResponse)
  async updateCategory(
    @Arg('updateCategoryInput') { _id, isHidden, name, photoUrl }: UpdateCategoryInput
  ): Promise<MutationResponse> {
    let updateFields: Omit<UpdateCategoryInput, '_id'> = {};

    if (isHidden !== null) updateFields.isHidden = isHidden;
    if (name) updateFields.name = name;
    if (photoUrl) updateFields.photoUrl = photoUrl;

    if (!Object.keys(updateFields).length) return { code: SUCCESS_CODE.OK, success: true };

    const [err] = await to(CategoryModel.updateOne({ _id }, { ...updateFields }));
    if (err) {
      logger.error('Update category failed: ', err);
      return { code: ERROR_CODE.BAD_REQUEST, success: false };
    }

    return { code: SUCCESS_CODE.OK, success: true };
  }
}

export default CategoryResolver;
