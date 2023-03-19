// EXAMPLE: remove this file
import { Field, ID, ObjectType } from 'type-graphql';
import { MongoID } from '../common';

@ObjectType()
class Demo {
  @Field((_type) => ID)
  _id: MongoID;

  @Field((_type) => String)
  name: string;

  @Field((_type) => Date)
  createdAt: Date;

  @Field((_type) => Date)
  updatedAt: Date;
}

export default Demo;
