import { Field, ID, ObjectType } from 'type-graphql';
import { MongoID } from '../common';

@ObjectType()
class Category {
  @Field((_type) => ID)
  _id: MongoID;

  @Field((_type) => String)
  name: string;

  @Field((_type) => String)
  desc: string;

  // A category cannot be deleted, can only be hidden
  @Field((_type) => Boolean)
  isHidden: boolean;

  @Field((_type) => Number)
  numOfProducts: number;

  @Field((_type) => String)
  photo: string;

  @Field((_type) => Date)
  createdAt: Date;

  @Field((_type) => Date)
  updatedAt: Date;
}

export default Category;
