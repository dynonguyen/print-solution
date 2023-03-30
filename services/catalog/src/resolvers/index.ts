import { NonEmptyArray } from 'type-graphql';
import CategoryResolver from './category';
import ProductResolver from './product';

const resolvers: NonEmptyArray<Function> = [ProductResolver, CategoryResolver];

export default resolvers;
