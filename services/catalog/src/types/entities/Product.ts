import { Field, ID, ObjectType } from 'type-graphql';
import { MongoID } from '../common';
import Category from './Category';

@ObjectType()
export class ProductInfo {
  @Field((_type) => String)
  label: String;

  @Field((_type) => String)
  value: String;
}

@ObjectType()
export class ProductOption {
  @Field((_type) => String)
  optionType: string;

  @Field((_type) => String)
  label: string;

  @Field((_type) => [String], { nullable: true })
  values?: string[];
}

@ObjectType()
class Product {
  @Field((_type) => ID)
  _id: MongoID;

  @Field((_type) => String)
  uuid: string;

  @Field((_type) => String)
  categoryId: MongoID;

  @Field((_type) => String)
  name: string;

  @Field((_type) => String)
  photo: string;

  @Field((_type) => String, { nullable: true, defaultValue: '' })
  htmlDesc: string;

  @Field((_type) => String)
  unit: string;

  @Field((_type) => Number, { defaultValue: 0 })
  price: number;

  @Field((_type) => [ProductInfo], { defaultValue: [], nullable: true })
  infos: ProductInfo[];

  @Field((_type) => [ProductOption], { defaultValue: [], nullable: true })
  options: ProductOption[];

  @Field((_type) => Number, { defaultValue: 0 })
  numOfViews: number;

  @Field((_type) => Number, { defaultValue: 0 })
  numOfFavorites: number;

  // A product cannot be deleted, can only be hidden
  @Field((_type) => Boolean)
  isHidden: boolean;

  @Field((_type) => Date)
  createdAt: Date;

  @Field((_type) => Date)
  updatedAt: Date;

  // Mongoose fields for field resolver (can't access itself directly)
  _doc?: Product;

  // Field resolver
  @Field((_type) => Category, { nullable: true })
  category?: Category;
}

export default Product;
