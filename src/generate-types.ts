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
  variants?: Maybe<Array<Maybe<ProductVariant>>>;
};

export type ListProducts = {
  __typename?: 'ListProducts';
  items?: Maybe<Array<Product>>;
  totalItems: Scalars['Int'];
};

export enum TypeAsset {
  Image = 'IMAGE',
  Video = 'VIDEO',
  Binary = 'BINARY',
  None = 'NONE'
}

export type Asset = Node & {
  __typename?: 'Asset';
  _id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  type: TypeAsset;
  variantId?: Maybe<Scalars['ID']>;
  fileSize?: Maybe<Scalars['Int']>;
  color?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type ProductVariant = Node & {
  __typename?: 'ProductVariant';
  _id: Scalars['ID'];
  productId: Scalars['ID'];
  product: Product;
  inStock: Scalars['Int'];
  active?: Maybe<Scalars['Boolean']>;
  sku: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Int'];
  featureAsset?: Maybe<Asset>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type CreateProductVariantInput = {
  productId: Scalars['ID'];
  inStock: Scalars['Int'];
  active?: Maybe<Scalars['Boolean']>;
  sku: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  product?: Maybe<Product>;
  products: ListProducts;
  productVariant?: Maybe<ProductVariant>;
};


export type QueryProductArgs = {
  _id: Scalars['ID'];
};


export type QueryProductsArgs = {
  slug: Scalars['String'];
};


export type QueryProductVariantArgs = {
  _id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct?: Maybe<Product>;
  createProductVariant?: Maybe<Array<ProductVariant>>;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateProductVariantArgs = {
  input?: Maybe<CreateProductVariantInput>;
};
