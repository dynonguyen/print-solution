// EXAMPLE: Remove this file
import { Query, Resolver, Subscription } from 'type-graphql';
import Demo from '~/types/entities/Demo';

@Resolver()
export class DemoResolver {
  @Query((_return) => Demo)
  demo(): Demo {
    return { _id: '1234', createdAt: new Date(), name: 'Sản phẩm 1', updatedAt: new Date() };
  }

  @Subscription((_return) => String, {
    topics: 'demo-sub'
  })
  newNotification() {
    return 'abc';
  }
}
