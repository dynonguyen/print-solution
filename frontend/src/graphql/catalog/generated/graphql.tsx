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

export type DeleteCategoryInput = {
  _id: Scalars['String'];
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
  deleteCategory: MutationResponse;
  updateCategory: MutationResponse;
};


export type MutationAddCategoryArgs = {
  addCategoryInput: AddCategoryInput;
};


export type MutationDeleteCategoryArgs = {
  deleteCategoryInput: DeleteCategoryInput;
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};

export type MutationResponse = IMutationResponse & {
  __typename?: 'MutationResponse';
  code: Scalars['Int'];
  msg?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
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

export type UpdateCategoryInput = {
  _id: Scalars['String'];
  isHidden?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  photoUrl?: InputMaybe<Scalars['String']>;
};

export type FullCategoryFragment = { __typename?: 'Category', _id: string, name: string, photo: string, numOfProducts: number, createdAt: any, updatedAt: any, isHidden: boolean };

export type MutationResponseFragment = { __typename?: 'MutationResponse', code: number, msg?: string | null, success: boolean };

export type AddCategoryMutationVariables = Exact<{
  addCategoryInput: AddCategoryInput;
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', addCategory: { __typename?: 'AddCategoryResponse', code: number, msg?: string | null, success: boolean, doc?: { __typename?: 'Category', _id: string, name: string, photo: string, numOfProducts: number, createdAt: any, updatedAt: any, isHidden: boolean } | null } };

export type DeleteCategoryMutationVariables = Exact<{
  deleteCategoryInput: DeleteCategoryInput;
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: { __typename?: 'MutationResponse', code: number, msg?: string | null, success: boolean } };

export type UpdateCategoryMutationVariables = Exact<{
  updateCategoryInput: UpdateCategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'MutationResponse', code: number, msg?: string | null, success: boolean } };

export type AdminCategoryListQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type AdminCategoryListQuery = { __typename?: 'Query', catagories: { __typename?: 'CategoryPaginatedResponse', code: number, message?: string | null, page: number, total: number, pageSize: number, docs: Array<{ __typename?: 'Category', _id: string, name: string, photo: string, numOfProducts: number, createdAt: any, updatedAt: any, isHidden: boolean }> } };

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
export const MutationResponseFragmentDoc = gql`
    fragment mutationResponse on MutationResponse {
  code
  msg
  success
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
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($deleteCategoryInput: DeleteCategoryInput!) {
  deleteCategory(deleteCategoryInput: $deleteCategoryInput) {
    ...mutationResponse
  }
}
    ${MutationResponseFragmentDoc}`;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      deleteCategoryInput: // value for 'deleteCategoryInput'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {
  updateCategory(updateCategoryInput: $updateCategoryInput) {
    ...mutationResponse
  }
}
    ${MutationResponseFragmentDoc}`;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      updateCategoryInput: // value for 'updateCategoryInput'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const AdminCategoryListDocument = gql`
    query AdminCategoryList($page: Int, $pageSize: Int, $sort: String, $search: String) {
  catagories(page: $page, pageSize: $pageSize, sort: $sort, search: $search) {
    code
    message
    page
    total
    pageSize
    docs {
      ...fullCategory
    }
  }
}
    ${FullCategoryFragmentDoc}`;

/**
 * __useAdminCategoryListQuery__
 *
 * To run a query within a React component, call `useAdminCategoryListQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminCategoryListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminCategoryListQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      sort: // value for 'sort'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useAdminCategoryListQuery(baseOptions?: Apollo.QueryHookOptions<AdminCategoryListQuery, AdminCategoryListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminCategoryListQuery, AdminCategoryListQueryVariables>(AdminCategoryListDocument, options);
      }
export function useAdminCategoryListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminCategoryListQuery, AdminCategoryListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminCategoryListQuery, AdminCategoryListQueryVariables>(AdminCategoryListDocument, options);
        }
export type AdminCategoryListQueryHookResult = ReturnType<typeof useAdminCategoryListQuery>;
export type AdminCategoryListLazyQueryHookResult = ReturnType<typeof useAdminCategoryListLazyQuery>;
export type AdminCategoryListQueryResult = Apollo.QueryResult<AdminCategoryListQuery, AdminCategoryListQueryVariables>;