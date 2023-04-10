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

export type AddProductResponse = IMutationResponse & {
  __typename?: 'AddProductResponse';
  code: Scalars['Int'];
  doc?: Maybe<Product>;
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
  msg?: Maybe<Scalars['String']>;
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
  msg?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory: AddCategoryResponse;
  addProduct: AddProductResponse;
  deleteCategory: MutationResponse;
  updateCategory: MutationResponse;
};


export type MutationAddCategoryArgs = {
  addCategoryInput: AddCategoryInput;
};


export type MutationAddProductArgs = {
  addProductInput: ProductInput;
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

export type Product = {
  __typename?: 'Product';
  _id: Scalars['ID'];
  category?: Maybe<Category>;
  categoryId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  htmlDesc?: Maybe<Scalars['String']>;
  infos?: Maybe<Array<ProductInfo>>;
  isHidden: Scalars['Boolean'];
  name: Scalars['String'];
  numOfFavorites: Scalars['Float'];
  numOfViews: Scalars['Float'];
  options?: Maybe<Array<ProductOption>>;
  photo: Scalars['String'];
  price: Scalars['Float'];
  unit: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  uuid: Scalars['String'];
};

export type ProductInfo = {
  __typename?: 'ProductInfo';
  label: Scalars['String'];
  value: Scalars['String'];
};

export type ProductInfoInput = {
  label: Scalars['String'];
  value: Scalars['String'];
};

export type ProductInput = {
  categoryId: Scalars['String'];
  htmlDesc?: InputMaybe<Scalars['String']>;
  infos?: InputMaybe<Array<ProductInfoInput>>;
  name: Scalars['String'];
  numOfFavorites?: InputMaybe<Scalars['Float']>;
  numOfViews?: InputMaybe<Scalars['Float']>;
  options?: InputMaybe<Array<ProductOptionInput>>;
  photo: Scalars['String'];
  price?: Scalars['Float'];
  unit: Scalars['String'];
};

export type ProductOption = {
  __typename?: 'ProductOption';
  label: Scalars['String'];
  optionType: Scalars['String'];
  values?: Maybe<Array<Scalars['String']>>;
};

export type ProductOptionInput = {
  label: Scalars['String'];
  optionType: Scalars['String'];
  values?: InputMaybe<Array<Scalars['String']>>;
};

export type ProductPaginatedResponse = IQueryResponse & {
  __typename?: 'ProductPaginatedResponse';
  code: Scalars['Int'];
  docs: Array<Product>;
  msg?: Maybe<Scalars['String']>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  search?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['String']>;
  total: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  catagories: CategoryPaginatedResponse;
  products: ProductPaginatedResponse;
};


export type QueryCatagoriesArgs = {
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  searchBy?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryProductsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  searchBy?: InputMaybe<Scalars['String']>;
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

type MutationResponseWithDoc_AddCategoryResponse_Fragment = { __typename?: 'AddCategoryResponse', code: number, msg?: string | null, success: boolean };

type MutationResponseWithDoc_AddProductResponse_Fragment = { __typename?: 'AddProductResponse', code: number, msg?: string | null, success: boolean };

type MutationResponseWithDoc_MutationResponse_Fragment = { __typename?: 'MutationResponse', code: number, msg?: string | null, success: boolean };

export type MutationResponseWithDocFragment = MutationResponseWithDoc_AddCategoryResponse_Fragment | MutationResponseWithDoc_AddProductResponse_Fragment | MutationResponseWithDoc_MutationResponse_Fragment;

export type FullProductFragment = { __typename?: 'Product', _id: string, uuid: string, categoryId: string, name: string, photo: string, price: number, unit: string, numOfFavorites: number, numOfViews: number, createdAt: any, updatedAt: any, infos?: Array<{ __typename?: 'ProductInfo', label: string, value: string }> | null, options?: Array<{ __typename?: 'ProductOption', optionType: string, label: string, values?: Array<string> | null }> | null };

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

export type AddProductMutationVariables = Exact<{
  addProductInput: ProductInput;
}>;


export type AddProductMutation = { __typename?: 'Mutation', addProduct: { __typename?: 'AddProductResponse', code: number, msg?: string | null, success: boolean, doc?: { __typename?: 'Product', _id: string, uuid: string, categoryId: string, name: string, photo: string, price: number, unit: string, numOfFavorites: number, numOfViews: number, createdAt: any, updatedAt: any, infos?: Array<{ __typename?: 'ProductInfo', label: string, value: string }> | null, options?: Array<{ __typename?: 'ProductOption', optionType: string, label: string, values?: Array<string> | null }> | null } | null } };

export type AdminCategoryListQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type AdminCategoryListQuery = { __typename?: 'Query', catagories: { __typename?: 'CategoryPaginatedResponse', code: number, msg?: string | null, page: number, total: number, pageSize: number, docs: Array<{ __typename?: 'Category', _id: string, name: string, photo: string, numOfProducts: number, createdAt: any, updatedAt: any, isHidden: boolean }> } };

export type CategoryForSelectQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  pageSize?: InputMaybe<Scalars['Int']>;
}>;


export type CategoryForSelectQuery = { __typename?: 'Query', catagories: { __typename?: 'CategoryPaginatedResponse', docs: Array<{ __typename?: 'Category', _id: string, name: string }> } };

export type AdminProductListQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  searchBy?: InputMaybe<Scalars['String']>;
}>;


export type AdminProductListQuery = { __typename?: 'Query', products: { __typename?: 'ProductPaginatedResponse', code: number, msg?: string | null, page: number, total: number, pageSize: number, docs: Array<{ __typename?: 'Product', _id: string, uuid: string, photo: string, name: string, price: number, isHidden: boolean, createdAt: any, updatedAt: any, category?: { __typename?: 'Category', name: string } | null }> } };

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
export const MutationResponseWithDocFragmentDoc = gql`
    fragment mutationResponseWithDoc on IMutationResponse {
  code
  msg
  success
}
    `;
export const FullProductFragmentDoc = gql`
    fragment fullProduct on Product {
  _id
  uuid
  categoryId
  name
  photo
  price
  unit
  numOfFavorites
  numOfViews
  infos {
    label
    value
  }
  options {
    optionType
    label
    values
  }
  createdAt
  updatedAt
}
    `;
export const AddCategoryDocument = gql`
    mutation AddCategory($addCategoryInput: AddCategoryInput!) {
  addCategory(addCategoryInput: $addCategoryInput) {
    ...mutationResponseWithDoc
    doc {
      ...fullCategory
    }
  }
}
    ${MutationResponseWithDocFragmentDoc}
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
export const AddProductDocument = gql`
    mutation AddProduct($addProductInput: ProductInput!) {
  addProduct(addProductInput: $addProductInput) {
    ...mutationResponseWithDoc
    doc {
      ...fullProduct
    }
  }
}
    ${MutationResponseWithDocFragmentDoc}
${FullProductFragmentDoc}`;
export type AddProductMutationFn = Apollo.MutationFunction<AddProductMutation, AddProductMutationVariables>;

/**
 * __useAddProductMutation__
 *
 * To run a mutation, you first call `useAddProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductMutation, { data, loading, error }] = useAddProductMutation({
 *   variables: {
 *      addProductInput: // value for 'addProductInput'
 *   },
 * });
 */
export function useAddProductMutation(baseOptions?: Apollo.MutationHookOptions<AddProductMutation, AddProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProductMutation, AddProductMutationVariables>(AddProductDocument, options);
      }
export type AddProductMutationHookResult = ReturnType<typeof useAddProductMutation>;
export type AddProductMutationResult = Apollo.MutationResult<AddProductMutation>;
export type AddProductMutationOptions = Apollo.BaseMutationOptions<AddProductMutation, AddProductMutationVariables>;
export const AdminCategoryListDocument = gql`
    query AdminCategoryList($page: Int, $pageSize: Int, $sort: String, $search: String) {
  catagories(page: $page, pageSize: $pageSize, sort: $sort, search: $search) {
    code
    msg
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
export const CategoryForSelectDocument = gql`
    query CategoryForSelect($page: Int, $sort: String, $pageSize: Int) {
  catagories(page: $page, sort: $sort, pageSize: $pageSize) {
    docs {
      _id
      name
    }
  }
}
    `;

/**
 * __useCategoryForSelectQuery__
 *
 * To run a query within a React component, call `useCategoryForSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryForSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryForSelectQuery({
 *   variables: {
 *      page: // value for 'page'
 *      sort: // value for 'sort'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useCategoryForSelectQuery(baseOptions?: Apollo.QueryHookOptions<CategoryForSelectQuery, CategoryForSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryForSelectQuery, CategoryForSelectQueryVariables>(CategoryForSelectDocument, options);
      }
export function useCategoryForSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryForSelectQuery, CategoryForSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryForSelectQuery, CategoryForSelectQueryVariables>(CategoryForSelectDocument, options);
        }
export type CategoryForSelectQueryHookResult = ReturnType<typeof useCategoryForSelectQuery>;
export type CategoryForSelectLazyQueryHookResult = ReturnType<typeof useCategoryForSelectLazyQuery>;
export type CategoryForSelectQueryResult = Apollo.QueryResult<CategoryForSelectQuery, CategoryForSelectQueryVariables>;
export const AdminProductListDocument = gql`
    query AdminProductList($page: Int, $pageSize: Int, $sort: String, $search: String, $searchBy: String) {
  products(
    page: $page
    pageSize: $pageSize
    sort: $sort
    search: $search
    searchBy: $searchBy
  ) {
    code
    msg
    page
    total
    pageSize
    docs {
      _id
      uuid
      photo
      name
      price
      isHidden
      createdAt
      updatedAt
      category {
        name
      }
    }
  }
}
    `;

/**
 * __useAdminProductListQuery__
 *
 * To run a query within a React component, call `useAdminProductListQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminProductListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminProductListQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      sort: // value for 'sort'
 *      search: // value for 'search'
 *      searchBy: // value for 'searchBy'
 *   },
 * });
 */
export function useAdminProductListQuery(baseOptions?: Apollo.QueryHookOptions<AdminProductListQuery, AdminProductListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminProductListQuery, AdminProductListQueryVariables>(AdminProductListDocument, options);
      }
export function useAdminProductListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminProductListQuery, AdminProductListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminProductListQuery, AdminProductListQueryVariables>(AdminProductListDocument, options);
        }
export type AdminProductListQueryHookResult = ReturnType<typeof useAdminProductListQuery>;
export type AdminProductListLazyQueryHookResult = ReturnType<typeof useAdminProductListLazyQuery>;
export type AdminProductListQueryResult = Apollo.QueryResult<AdminProductListQuery, AdminProductListQueryVariables>;