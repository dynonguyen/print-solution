import { ObjectType } from 'type-graphql';
import Product from '~/types/entities/Product';
import { MutationResponseWithDoc } from '../core/MutationResponse';
import { PaginatedResponse, QueryResponse } from '../core/QueryResponse';

@ObjectType()
export class ProductPaginatedResponse extends PaginatedResponse<Product>(Product) {}

@ObjectType()
export class AddProductResponse extends MutationResponseWithDoc<Product>(Product) {}

@ObjectType()
export class ProductResponse extends QueryResponse<Product>(Product) {}
