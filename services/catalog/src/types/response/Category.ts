import { ObjectType } from 'type-graphql';
import { PaginatedResponse } from '~/types/core/QueryResponse';
import Category from '~/types/entities/Category';

@ObjectType()
export class CategoryPaginatedResponse extends PaginatedResponse<Category>(Category) {}
