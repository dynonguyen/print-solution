import { ArgsType, Field, Int } from 'type-graphql';
import DEFAULTS from '~/constants/default';

@ArgsType()
export class PaginationArgs {
  @Field((_type) => Int, { nullable: true, defaultValue: 1 })
  page?: number;

  @Field((_type) => Int, { nullable: true, defaultValue: DEFAULTS.PAGE_SIZE })
  pageSize?: number;

  @Field((_type) => String, { nullable: true, defaultValue: '' })
  sort?: string;

  @Field((_type) => String, { nullable: true, defaultValue: '' })
  search?: string;
}
