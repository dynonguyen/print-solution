// EX: Remove this file
import { Query, Resolver } from 'type-graphql';

@Resolver()
export class DemoResolver {
  @Query((_return) => String)
  hello() {
    return 'Hello catalog';
  }
}
