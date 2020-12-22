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

export enum TypeAsset {
  Image = 'IMAGE',
  Video = 'VIDEO',
  Binary = 'BINARY'
}

export type Asset = Node & {
  __typename?: 'Asset';
  _id: Scalars['ID'];
  name: Scalars['String'];
  type: TypeAsset;
  fileSize: Scalars['Int'];
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type ProductVariant = Node & {
  __typename?: 'ProductVariant';
  _id: Scalars['ID'];
  product: Product;
  productId: Scalars['ID'];
  inStock: Scalars['Int'];
  active?: Maybe<Scalars['Boolean']>;
  sku: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Int'];
  featureAsset?: Maybe<Asset>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type Query = {
  __typename?: 'Query';
  productVariant?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  products: ListProducts;
};


export type QueryProductVariantArgs = {
  id: Scalars['ID'];
};


export type QueryProductArgs = {
  _id: Scalars['ID'];
};


export type QueryProductsArgs = {
  slug: Scalars['String'];
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

export type ListProducts = {
  __typename?: 'ListProducts';
  items?: Maybe<Array<Product>>;
  totalItems: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct?: Maybe<Product>;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};
