import { NonEmptyArray } from 'type-graphql';
import CategoryResolver from './category';
import ProductResolver, { ProductFieldResolver } from './product';

const resolvers: NonEmptyArray<Function> = [ProductResolver, ProductFieldResolver, CategoryResolver];

export default resolvers;
