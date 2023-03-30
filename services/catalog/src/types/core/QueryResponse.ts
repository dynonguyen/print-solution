import { ClassType, Field, Int, InterfaceType, ObjectType } from 'type-graphql';

@InterfaceType()
export abstract class IQueryResponse {
  @Field((_type) => Int)
  code: number;

  @Field((_type) => String, { nullable: true })
  message?: string;
}

export function PaginatedResponse<T>(TClass: ClassType<T>) {
  @ObjectType({ isAbstract: true, implements: IQueryResponse })
  abstract class PaginatedResponseClass extends IQueryResponse {
    @Field((_type) => [TClass])
    docs: T[];

    @Field((_type) => Int)
    page: number;

    @Field((_type) => Int)
    total: number;

    @Field((_type) => Int)
    pageSize: number;

    @Field((_type) => String, { nullable: true })
    sort?: string;

    @Field((_type) => String, { nullable: true })
    search?: string;
  }
  return PaginatedResponseClass;
}
