import { NonEmptyArray } from 'type-graphql';
import { DemoResolver } from './demo';

const resolvers: NonEmptyArray<Function> = [DemoResolver];

export default resolvers;
