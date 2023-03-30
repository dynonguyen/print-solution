import { Field, Int, InterfaceType, ObjectType } from 'type-graphql';

@InterfaceType()
abstract class IMutationResponse {
  @Field((_type) => Int)
  code: number;

  @Field((_type) => Boolean)
  success: boolean;

  @Field((_type) => String, { nullable: true })
  message?: string;
}

@ObjectType({ implements: IMutationResponse })
export class MutationResponse extends IMutationResponse {}

export default MutationResponse;
