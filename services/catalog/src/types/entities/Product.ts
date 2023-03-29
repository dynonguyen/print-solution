import { Field, ID, ObjectType } from 'type-graphql';
import { MongoID } from '../common';

@ObjectType()
export class ProductInfo {
  @Field((_type) => String)
  label: String;

  @Field((_type) => String)
  value: String;
}

@ObjectType()
class Product {
  @Field((_type) => ID)
  _id: MongoID;

  @Field((_type) => String)
  categoryId: MongoID;

  @Field((_type) => String)
  name: string;

  @Field((_type) => String)
  photo: string;

  @Field((_type) => String, { nullable: true, defaultValue: '' })
  htmlDesc: string;

  @Field((_type) => Number, { defaultValue: 0 })
  price: number;

  @Field((_type) => [ProductInfo], { defaultValue: [] })
  infos: ProductInfo[];

  @Field((_type) => Number, { defaultValue: 0 })
  numOfViews: number;

  @Field((_type) => Number, { defaultValue: 0 })
  numOfFavorites: number;

  @Field((_type) => Date)
  createdAt: Date;

  @Field((_type) => Date)
  updatedAt: Date;
}

export default Product;
