import { Field, InputType } from 'type-graphql';

@InputType()
export class AddCategoryInput {
  @Field((_type) => String)
  name: string;

  @Field((_type) => String)
  photoUrl: string;
}
