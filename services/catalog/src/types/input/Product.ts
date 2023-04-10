import { ArgsType, Field, InputType } from 'type-graphql';
import { MongoID } from '../common';

@InputType()
export class ProductInfoInput {
  @Field((_type) => String)
  label: String;

  @Field((_type) => String)
  value: String;
}

@InputType()
export class ProductOptionInput {
  @Field((_type) => String)
  optionType: string;

  @Field((_type) => String)
  label: string;

  @Field((_type) => [String], { nullable: true, defaultValue: [] })
  values?: Array<string>;
}

@InputType()
export class ProductInput {
  @Field((_type) => String, { nullable: true })
  uuid?: string;

  @Field((_type) => String)
  categoryId: MongoID;

  @Field((_type) => String)
  name: string;

  @Field((_type) => String)
  photo: string;

  @Field((_type) => String)
  unit: string;

  @Field((_type) => String, { nullable: true, defaultValue: '' })
  htmlDesc: string;

  @Field((_type) => Number, { defaultValue: 0 })
  price: number;

  @Field((_type) => [ProductInfoInput], { nullable: true, defaultValue: [] })
  infos: ProductInfoInput[];

  @Field((_type) => [ProductOptionInput], { nullable: true, defaultValue: [] })
  options: ProductOptionInput[];

  @Field((_type) => Number, { nullable: true, defaultValue: 0 })
  numOfViews: number;

  @Field((_type) => Number, { nullable: true, defaultValue: 0 })
  numOfFavorites: number;
}

@ArgsType()
export class QueryProductArgs {
  @Field((_type) => String)
  uuid: string;
}
