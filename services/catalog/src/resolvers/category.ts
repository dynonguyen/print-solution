import to from 'await-to-js';
import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import logger from '~/config/logger';
import DEFAULTS from '~/constants/default';
import { ERROR_CODE, SUCCESS_CODE } from '~/constants/status-code';
import CategoryModel from '~/models/category';
import { PaginationArgs } from '~/types/core/PaginationArg';
import { AddCategoryInput } from '~/types/input/Category';
import { AddCategoryResponse, CategoryPaginatedResponse } from '~/types/response/Category';
import mongoosePaginate from '~/utils/mongoose-paginate';

@Resolver()
export class CategoryResolver {
  @Query((_return) => CategoryPaginatedResponse)
  async catagories(@Args() args: PaginationArgs): Promise<CategoryPaginatedResponse> {
    let { page = 1, pageSize = DEFAULTS.PAGE_SIZE, sort, search } = args;

    if (page < 1) page = 1;
    if (pageSize < 1) pageSize = DEFAULTS.PAGE_SIZE;
    const searchQuery = search ? { name: { $regex: search } } : {};

    const [err, categoryList] = await to(
      mongoosePaginate(CategoryModel, { ...searchQuery }, { page, pageSize }, { sort })
    );
    console.log(categoryList);

    return { code: 200, ...DEFAULTS.PAGINATED_RESPONSE };
  }

  @Mutation((_return) => AddCategoryResponse)
  async addCategory(@Arg('addCategoryInput') { name, photoUrl }: AddCategoryInput): Promise<AddCategoryResponse> {
    const isExist = await CategoryModel.exists({ name: name });
    if (isExist) {
      return { code: ERROR_CODE.BAD_REQUEST, msg: 'Danh mục sản phẩm đã tồn tại.', success: false };
    }

    const [err, newCategory] = await to(CategoryModel.create({ name, photo: photoUrl }));
    if (err) {
      logger.error('Add category failed: ', err);
      return { code: ERROR_CODE.BAD_REQUEST, msg: 'Thêm danh mục thất bại, thử lại', success: false };
    }

    return { success: true, code: SUCCESS_CODE.CREATED, doc: newCategory };
  }
}

export default CategoryResolver;
