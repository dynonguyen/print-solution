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

export type Demo = {
  __typename?: 'Demo';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  demo: Demo;
};

export type Subscription = {
  __typename?: 'Subscription';
  newNotification: Scalars['String'];
};

export type GetDemoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDemoQuery = { __typename?: 'Query', demo: { __typename?: 'Demo', _id: string, name: string, createdAt: any, updatedAt: any } };


export const GetDemoDocument = gql`
    query GetDemo {
  demo {
    _id
    name
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetDemoQuery__
 *
 * To run a query within a React component, call `useGetDemoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDemoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDemoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDemoQuery(baseOptions?: Apollo.QueryHookOptions<GetDemoQuery, GetDemoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDemoQuery, GetDemoQueryVariables>(GetDemoDocument, options);
      }
export function useGetDemoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDemoQuery, GetDemoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDemoQuery, GetDemoQueryVariables>(GetDemoDocument, options);
        }
export type GetDemoQueryHookResult = ReturnType<typeof useGetDemoQuery>;
export type GetDemoLazyQueryHookResult = ReturnType<typeof useGetDemoLazyQuery>;
export type GetDemoQueryResult = Apollo.QueryResult<GetDemoQuery, GetDemoQueryVariables>;