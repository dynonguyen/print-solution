import { Field, InputType } from 'type-graphql';
import { MongoID } from '~/types/common';
@InputType()
export class AddCategoryInput {
  @Field((_type) => String)
  name: string;

  @Field((_type) => String)
  photoUrl: string;
}

@InputType()
export class DeleteCategoryInput {
  @Field((_type) => String)
  _id: MongoID;
}

@InputType()
export class UpdateCategoryInput {
  @Field((_type) => String)
  _id: string;

  @Field((_type) => String, { nullable: true })
  name?: string;

  @Field((_type) => String, { nullable: true })
  photoUrl?: string;

  @Field((_type) => Boolean, { nullable: true })
  isHidden?: boolean;
}
