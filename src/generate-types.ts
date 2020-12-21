/* eslint-disable */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};


export type Node = {
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type CreateProductInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  slug: Scalars['String'];
  inStock: Scalars['Int'];
  active?: Maybe<Scalars['Boolean']>;
};

export type Product = Node & {
  __typename?: 'Product';
  _id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  slug: Scalars['String'];
  inStock: Scalars['Int'];
  active?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type Query = {
  __typename?: 'Query';
  product?: Maybe<Product>;
};


export type QueryProductArgs = {
  _id?: Maybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct?: Maybe<Product>;
};


export type MutationCreateProductArgs = {
  input?: Maybe<CreateProductInput>;
};
