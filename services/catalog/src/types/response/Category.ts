import { ObjectType } from 'type-graphql';
import { PaginatedResponse } from '~/types/core/QueryResponse';
import Category from '~/types/entities/Category';
import { MutationResponseWithDoc } from '../core/MutationResponse';

@ObjectType()
export class CategoryPaginatedResponse extends PaginatedResponse<Category>(Category) {}

@ObjectType()
export class AddCategoryResponse extends MutationResponseWithDoc<Category>(Category) {}
