import { SimpleResponse } from '../../../config/types';

export type UsersCartProcessAdditionRequest = {
  quantity: number;
  productId: string;
};

export type UsersCartProcessAdditionResponse = SimpleResponse;

export type UsersCartProcessPurchaseResponse = SimpleResponse;

type UsersCartGetResponseItems = {
  name: string;
  description: string;
  price: number;
  quantity: number;
};

export type UsersCartGetResponse = {
  total: number;
  items: UsersCartGetResponseItems[];
};
