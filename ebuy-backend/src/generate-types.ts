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
  /** Upload custom scalar type */
  Upload: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Coupon = Node & {
  __typename?: 'Coupon';
  _id: Scalars['ID'];
  code: Scalars['String'];
  percentage: Scalars['Int'];
  maxDiscount: Scalars['Int'];
  startDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
  maxNumber: Scalars['Int'];
  orderCondition: Scalars['Int'];
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type CouponConfig = {
  code: Scalars['String'];
  percentage: Scalars['Int'];
  maxDiscount: Scalars['Int'];
  startDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
  maxNumber: Scalars['Int'];
  condition: Scalars['Int'];
};

export type ListCoupon = {
  __typename?: 'ListCoupon';
  items?: Maybe<Array<Maybe<Coupon>>>;
  totalItems: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getAllCoupon?: Maybe<ListCoupon>;
  getCollections?: Maybe<ListCollection>;
  product?: Maybe<Product>;
  products: ListProducts;
  productVariant?: Maybe<ProductVariant>;
  eligibleShippingAddress?: Maybe<ListAddress>;
  getShippingAddressDetail?: Maybe<ShippingAddress>;
  getDefaultShippingAddress?: Maybe<ShippingAddress>;
  eligibleProvince?: Maybe<ListProvince>;
  eligibleState?: Maybe<ListState>;
  eligibleShippingMethod?: Maybe<Array<ShippingMethod>>;
  getShopInfo: ShopInfo;
  getSliders?: Maybe<Array<Slider>>;
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


export type QueryGetShippingAddressDetailArgs = {
  id: Scalars['ID'];
};


export type QueryEligibleStateArgs = {
  provinceId: Scalars['Int'];
};


export type QueryGetShopInfoArgs = {
  _id?: Maybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCoupon?: Maybe<ListCoupon>;
  updateCoupon?: Maybe<ListCoupon>;
  removeCoupon?: Maybe<ListCoupon>;
  createCollection?: Maybe<ListCollection>;
  removeCollection?: Maybe<ListCollection>;
  updateCollection?: Maybe<ListCollection>;
  addSubCollection?: Maybe<ListCollection>;
  removeSubCollection?: Maybe<ListCollection>;
  updateSubCollection?: Maybe<ListCollection>;
  createProduct?: Maybe<Product>;
  setProductPromotion: Product;
  removeProductPromotion: Product;
  updateProductPromotion: Product;
  addShippingAddress?: Maybe<ListAddress>;
  removeShippingAddress?: Maybe<ListAddress>;
  updateShippingAddress?: Maybe<ListAddress>;
  setAsDefaultAddress?: Maybe<ListAddress>;
  uploadFile?: Maybe<Scalars['Boolean']>;
  addItemToOrder?: Maybe<Order>;
  removeItemFromOrder?: Maybe<Order>;
  incrementOrderItem?: Maybe<Order>;
  decreaseOrderItem?: Maybe<Order>;
  setShippingAddressForOrder?: Maybe<Order>;
  applyCouponToOrder?: Maybe<Order>;
  removeCouponFromOrder?: Maybe<Order>;
  register: RegisterUserAccountResult;
  login: NativeAuthenticationResult;
  upload?: Maybe<Scalars['JSON']>;
};


export type MutationCreateCouponArgs = {
  config: CouponConfig;
};


export type MutationUpdateCouponArgs = {
  _id: Scalars['ID'];
  config: CouponConfig;
};


export type MutationRemoveCouponArgs = {
  _id: Scalars['ID'];
};


export type MutationCreateCollectionArgs = {
  name: Scalars['String'];
  active: Scalars['Boolean'];
  subCollections?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type MutationRemoveCollectionArgs = {
  _id: Scalars['ID'];
};


export type MutationUpdateCollectionArgs = {
  _id: Scalars['ID'];
  name: Scalars['String'];
  active: Scalars['Boolean'];
};


export type MutationAddSubCollectionArgs = {
  _id: Scalars['ID'];
  name: Scalars['String'];
  active: Scalars['Boolean'];
};


export type MutationRemoveSubCollectionArgs = {
  collectionId: Scalars['ID'];
  subCollectionId: Scalars['ID'];
};


export type MutationUpdateSubCollectionArgs = {
  name: Scalars['String'];
  active: Scalars['Boolean'];
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationSetProductPromotionArgs = {
  _id: Scalars['ID'];
  config: ProductSaleConfig;
};


export type MutationRemoveProductPromotionArgs = {
  _id: Scalars['ID'];
};


export type MutationUpdateProductPromotionArgs = {
  _id: Scalars['ID'];
  config: ProductSaleConfig;
};


export type MutationAddShippingAddressArgs = {
  input: ShippingAddressArgs;
};


export type MutationRemoveShippingAddressArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateShippingAddressArgs = {
  id: Scalars['ID'];
  input: UpdateShippingAddressInput;
};


export type MutationSetAsDefaultAddressArgs = {
  id: Scalars['ID'];
};


export type MutationUploadFileArgs = {
  file?: Maybe<Scalars['Upload']>;
};


export type MutationAddItemToOrderArgs = {
  variantId: Scalars['ID'];
  quantity: Scalars['Int'];
};


export type MutationRemoveItemFromOrderArgs = {
  orderLineId: Scalars['ID'];
};


export type MutationIncrementOrderItemArgs = {
  orderLineId: Scalars['ID'];
};


export type MutationDecreaseOrderItemArgs = {
  orderLineId: Scalars['ID'];
};


export type MutationSetShippingAddressForOrderArgs = {
  addressId: Scalars['ID'];
};


export type MutationApplyCouponToOrderArgs = {
  couponId: Scalars['ID'];
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

export type SubCollection = Node & {
  __typename?: 'SubCollection';
  _id: Scalars['ID'];
  name: Scalars['String'];
  active: Scalars['Boolean'];
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type Collection = Node & {
  __typename?: 'Collection';
  _id: Scalars['ID'];
  name: Scalars['String'];
  /** Each collection can have zero or more subcollection. By default, is 0 */
  totalSubCollection: Scalars['Int'];
  /** Array of sub-collections */
  subCollections?: Maybe<Array<Maybe<SubCollection>>>;
  /** Collection active or de-active */
  active: Scalars['Boolean'];
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type ListCollection = {
  __typename?: 'ListCollection';
  collections?: Maybe<Array<Maybe<Collection>>>;
  totalCollections?: Maybe<Scalars['Int']>;
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
  sale?: Maybe<ProductSale>;
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
  type: TypeAsset;
  color?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
  preview?: Maybe<Scalars['String']>;
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
  color?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  type: TypeAsset;
};

export type ProductSale = Node & {
  __typename?: 'ProductSale';
  _id: Scalars['ID'];
  discount: Scalars['Int'];
  percentage: Scalars['Int'];
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type ProductSaleConfig = {
  discount: Scalars['Int'];
  percentage: Scalars['Int'];
};

/** Shipping Address Type - By default, location in Viet Nam */
export type ShippingAddress = Node & {
  __typename?: 'ShippingAddress';
  _id: Scalars['ID'];
  /** By default is VN */
  countryCode: Scalars['String'];
  province?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  streetLine: Scalars['String'];
  zipCode?: Maybe<Scalars['String']>;
  /** Other is description text may be home number, location nearly,...v...v */
  other?: Maybe<Scalars['String']>;
  /** Recipient's phone - this is required field */
  phoneNumber: Scalars['String'];
  /** Recipient's name - this is required field */
  firstName: Scalars['String'];
  /** Recipient's name - this is not required field */
  lastName?: Maybe<Scalars['String']>;
  defaultAddress?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type ShippingAddressArgs = {
  province: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  streetLine: Scalars['String'];
  zipCode?: Maybe<Scalars['String']>;
  other?: Maybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  defaultAddress?: Maybe<Scalars['Boolean']>;
};

export type UpdateShippingAddressInput = {
  province: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  streetLine: Scalars['String'];
  zipCode?: Maybe<Scalars['String']>;
  other?: Maybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
};

export type ListAddress = {
  __typename?: 'ListAddress';
  items?: Maybe<Array<Maybe<ShippingAddress>>>;
  totalItems?: Maybe<Scalars['Int']>;
};

export type Province = {
  __typename?: 'Province';
  _id: Scalars['ID'];
  identify: Scalars['Int'];
  name: Scalars['String'];
};

export type State = {
  __typename?: 'State';
  _id: Scalars['ID'];
  provinceId: Scalars['Int'];
  name: Scalars['String'];
};

export type ListProvince = {
  __typename?: 'ListProvince';
  provinces?: Maybe<Array<Province>>;
  totalItems: Scalars['Int'];
};

export type ListState = {
  __typename?: 'ListState';
  states?: Maybe<Array<State>>;
  totalItems: Scalars['Int'];
};

export enum ShippingType {
  FastExpress = 'FAST_EXPRESS',
  StandardExpress = 'STANDARD_EXPRESS'
}

export type ShippingMethod = Node & {
  __typename?: 'ShippingMethod';
  _id: Scalars['ID'];
  name: Scalars['String'];
  shippingType: ShippingType;
  company: Scalars['String'];
  licenseNumber: Scalars['String'];
  active: Scalars['Boolean'];
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type ShopInfo = Node & {
  __typename?: 'ShopInfo';
  _id: Scalars['ID'];
  brandName: Scalars['String'];
  phoneNumbers: Array<Scalars['String']>;
  shopEmails: Array<Scalars['String']>;
  province: Province;
  state: State;
  streetLine1: Scalars['String'];
  streetLine2: Scalars['String'];
  owner: User;
  avatar?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['String']>;
  metaKeyword?: Maybe<Scalars['String']>;
  metaDescription?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type Slider = Node & {
  __typename?: 'Slider';
  _id: Scalars['ID'];
  title: Scalars['String'];
  subTitle?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  typeAsset: TypeAsset;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type SliderInput = {
  title: Scalars['String'];
  subTitle?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  typeAsset: TypeAsset;
};

export type SliderUpdate = {
  title: Scalars['String'];
  subTitle?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
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
  shippingAddress?: Maybe<ShippingAddress>;
  totalQuantity?: Maybe<Scalars['Int']>;
  subTotal?: Maybe<Scalars['Int']>;
  coupon?: Maybe<Coupon>;
  discount?: Maybe<Scalars['Int']>;
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
