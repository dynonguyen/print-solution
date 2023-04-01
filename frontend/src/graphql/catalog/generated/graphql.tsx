import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AddCategoryInput = {
  name: Scalars['String'];
  photoUrl: Scalars['String'];
};

export type AddCategoryResponse = IMutationResponse & {
  __typename?: 'AddCategoryResponse';
  code: Scalars['Int'];
  doc?: Maybe<Category>;
  msg?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Category = {
  __typename?: 'Category';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  isHidden: Scalars['Boolean'];
  name: Scalars['String'];
  numOfProducts: Scalars['Float'];
  photo: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CategoryPaginatedResponse = IQueryResponse & {
  __typename?: 'CategoryPaginatedResponse';
  code: Scalars['Int'];
  docs: Array<Category>;
  message?: Maybe<Scalars['String']>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  search?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['String']>;
  total: Scalars['Int'];
};

export type IMutationResponse = {
  code: Scalars['Int'];
  msg?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type IQueryResponse = {
  code: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory: AddCategoryResponse;
};


export type MutationAddCategoryArgs = {
  addCategoryInput: AddCategoryInput;
};

export type Query = {
  __typename?: 'Query';
  catagories: CategoryPaginatedResponse;
};


export type QueryCatagoriesArgs = {
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};

export type FullCategoryFragment = { __typename?: 'Category', _id: string, name: string, photo: string, numOfProducts: number, createdAt: any, updatedAt: any, isHidden: boolean };

export type AddCategoryMutationVariables = Exact<{
  addCategoryInput: AddCategoryInput;
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', addCategory: { __typename?: 'AddCategoryResponse', code: number, msg?: string | null, success: boolean, doc?: { __typename?: 'Category', _id: string, name: string, photo: string, numOfProducts: number, createdAt: any, updatedAt: any, isHidden: boolean } | null } };

export const FullCategoryFragmentDoc = gql`
    fragment fullCategory on Category {
  _id
  name
  photo
  numOfProducts
  createdAt
  updatedAt
  isHidden
}
    `;
export const AddCategoryDocument = gql`
    mutation AddCategory($addCategoryInput: AddCategoryInput!) {
  addCategory(addCategoryInput: $addCategoryInput) {
    code
    msg
    success
    doc {
      ...fullCategory
    }
  }
}
    ${FullCategoryFragmentDoc}`;
export type AddCategoryMutationFn = Apollo.MutationFunction<AddCategoryMutation, AddCategoryMutationVariables>;

/**
 * __useAddCategoryMutation__
 *
 * To run a mutation, you first call `useAddCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCategoryMutation, { data, loading, error }] = useAddCategoryMutation({
 *   variables: {
 *      addCategoryInput: // value for 'addCategoryInput'
 *   },
 * });
 */
export function useAddCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AddCategoryMutation, AddCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCategoryMutation, AddCategoryMutationVariables>(AddCategoryDocument, options);
      }
export type AddCategoryMutationHookResult = ReturnType<typeof useAddCategoryMutation>;
export type AddCategoryMutationResult = Apollo.MutationResult<AddCategoryMutation>;
export type AddCategoryMutationOptions = Apollo.BaseMutationOptions<AddCategoryMutation, AddCategoryMutationVariables>;