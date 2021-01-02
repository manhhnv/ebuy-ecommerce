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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
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
  activeOrder?: Maybe<Order>;
  me: User;
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
  uploadFile?: Maybe<Scalars['Boolean']>;
  addItemToOrder?: Maybe<Order>;
  removeItemFromOrder?: Maybe<Order>;
  register: RegisterUserAccountResult;
  login: NativeAuthenticationResult;
  upload?: Maybe<Scalars['JSON']>;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateProductVariantArgs = {
  input?: Maybe<CreateProductVariantInput>;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};


export type MutationAddItemToOrderArgs = {
  variantId: Scalars['ID'];
  quantity: Scalars['Int'];
};


export type MutationRemoveItemFromOrderArgs = {
  orderLineId: Scalars['ID'];
};


export type MutationRegisterArgs = {
  input?: Maybe<CreateUserInput>;
};


export type MutationLoginArgs = {
  input?: Maybe<LoginInput>;
};


export type MutationUploadArgs = {
  file?: Maybe<Scalars['String']>;
};


export type File = {
  __typename?: 'File';
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
};

export type OrderLine = Node & {
  __typename?: 'OrderLine';
  _id: Scalars['ID'];
  productVariant?: Maybe<ProductVariant>;
  quantity?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type Order = Node & {
  __typename?: 'Order';
  _id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
  lines?: Maybe<Array<Maybe<OrderLine>>>;
  state: Scalars['String'];
  totalQuantity?: Maybe<Scalars['Int']>;
  subTotal?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
  countryCode?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};


export enum ErrorCode {
  UnknownError = 'UNKNOWN_ERROR',
  NativeAuthStrategyError = 'NATIVE_AUTH_STRATEGY_ERROR',
  InvalidCredentialsError = 'INVALID_CREDENTIALS_ERROR',
  OrderStateTransitionError = 'ORDER_STATE_TRANSITION_ERROR',
  EmailAddressConflictError = 'EMAIL_ADDRESS_CONFLICT_ERROR',
  OrderModificationError = 'ORDER_MODIFICATION_ERROR',
  OrderLimitError = 'ORDER_LIMIT_ERROR',
  NegativeQuantityError = 'NEGATIVE_QUANTITY_ERROR',
  InsufficientStockError = 'INSUFFICIENT_STOCK_ERROR',
  IneligibleShippingMethodError = 'INELIGIBLE_SHIPPING_METHOD_ERROR',
  OrderPaymentStateError = 'ORDER_PAYMENT_STATE_ERROR',
  PaymentFailedError = 'PAYMENT_FAILED_ERROR',
  PaymentDeclinedError = 'PAYMENT_DECLINED_ERROR',
  CouponCodeInvalidError = 'COUPON_CODE_INVALID_ERROR',
  CouponCodeExpiredError = 'COUPON_CODE_EXPIRED_ERROR',
  CouponCodeLimitError = 'COUPON_CODE_LIMIT_ERROR',
  AlreadyLoggedInError = 'ALREADY_LOGGED_IN_ERROR',
  MissingPasswordError = 'MISSING_PASSWORD_ERROR',
  PasswordAlreadySetError = 'PASSWORD_ALREADY_SET_ERROR',
  VerificationTokenInvalidError = 'VERIFICATION_TOKEN_INVALID_ERROR',
  VerificationTokenExpiredError = 'VERIFICATION_TOKEN_EXPIRED_ERROR',
  IdentifierChangeTokenInvalidError = 'IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR',
  IdentifierChangeTokenExpiredError = 'IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR',
  PasswordResetTokenInvalidError = 'PASSWORD_RESET_TOKEN_INVALID_ERROR',
  PasswordResetTokenExpiredError = 'PASSWORD_RESET_TOKEN_EXPIRED_ERROR',
  NotVerifiedError = 'NOT_VERIFIED_ERROR',
  NotMatchRegex = 'NOT_MATCH_REGEX',
  UsernameConflictError = 'USERNAME_CONFLICT_ERROR',
  WrongFormatFields = 'WRONG_FORMAT_FIELDS'
}

export type User = Node & {
  __typename?: 'User';
  _id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
  avatarURL?: Maybe<Scalars['String']>;
  active: Scalars['Boolean'];
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  countryCode?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type CreateUserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  avatarURL?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  rememberMe?: Maybe<Scalars['Boolean']>;
};

export type UserWithToken = {
  __typename?: 'UserWithToken';
  user: User;
  token: Scalars['String'];
};

export type InvalidCredentialsError = {
  __typename?: 'InvalidCredentialsError';
  errorCode: ErrorCode;
  message?: Maybe<Scalars['String']>;
  authenticationError?: Maybe<Scalars['String']>;
};

export type Success = {
  __typename?: 'Success';
  success: Scalars['Boolean'];
};

export type RegexNotMatchError = {
  __typename?: 'RegexNotMatchError';
  errorCode: ErrorCode;
  message?: Maybe<Scalars['String']>;
};

export type NativeAuthenticationResult = UserWithToken | InvalidCredentialsError;

export type RegisterUserAccountResult = Success | RegexNotMatchError;
