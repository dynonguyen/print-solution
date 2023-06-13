import { NonEmptyArray, Query, Resolver } from 'type-graphql';

@Resolver()
class MyResolver {
  @Query()
  hello(): string {
    return 'Hello, world!';
  }
}

const resolvers: NonEmptyArray<Function> = [MyResolver];

export default resolvers;
