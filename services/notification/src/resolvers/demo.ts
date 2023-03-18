// EX: Remove this file
import { Query, Resolver, Subscription } from 'type-graphql';

@Resolver()
export class DemoResolver {
  @Query((_return) => String)
  hello() {
    return 'Hello catalog';
  }

  @Subscription((_return) => String, {
    topics: 'demo-sub'
  })
  newNotification() {
    return 'abc';
  }
}
