import { ClassType, Field, Int, InterfaceType, ObjectType } from 'type-graphql';

@InterfaceType()
abstract class IMutationResponse {
  @Field((_type) => Int)
  code: number;

  @Field((_type) => Boolean)
  success: boolean;

  @Field((_type) => String, { nullable: true })
  msg?: string;
}

@ObjectType({ implements: IMutationResponse })
export class MutationResponse extends IMutationResponse {}

export function MutationResponseWithDoc<T>(TClass: ClassType<T>) {
  @ObjectType({ isAbstract: true, implements: IMutationResponse })
  abstract class PaginatedResponseClass extends IMutationResponse {
    @Field((_type) => TClass, { nullable: true })
    doc?: T;
  }
  return PaginatedResponseClass;
}

export default MutationResponse;
