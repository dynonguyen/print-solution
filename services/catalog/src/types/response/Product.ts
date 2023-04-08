import { ObjectType } from 'type-graphql';
import Product from '~/types/entities/Product';
import { MutationResponseWithDoc } from '../core/MutationResponse';

@ObjectType()
export class AddProductResponse extends MutationResponseWithDoc<Product>(Product) {}
