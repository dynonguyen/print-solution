import { NonEmptyArray } from 'type-graphql';
import CategoryResolver from './category';
import ProductResolver, { ProductDetailResolver, ProductFieldResolver } from './product';

const resolvers: NonEmptyArray<Function> = [
  ProductResolver,
  ProductFieldResolver,
  ProductDetailResolver,
  CategoryResolver
];

export default resolvers;
