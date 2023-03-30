import to from 'await-to-js';
import { Args, Query, Resolver } from 'type-graphql';
import DEFAULTS from '~/constants/default';
import CategoryModel from '~/models/category';
import { PaginationArgs } from '~/types/core/PaginationArg';
import { CategoryPaginatedResponse } from '~/types/response/Category';
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
}

export default CategoryResolver;
