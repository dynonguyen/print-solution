import { NonEmptyArray } from 'type-graphql';
import CategoryResolver from './category';
import ProductResolver, { ProductDetailResolver, ProductFieldResolver, ProductsSearchResolver } from './product';

const resolvers: NonEmptyArray<Function> = [
  ProductResolver,
  ProductFieldResolver,
  ProductDetailResolver,
  CategoryResolver,
  ProductsSearchResolver
];

export default resolvers;
