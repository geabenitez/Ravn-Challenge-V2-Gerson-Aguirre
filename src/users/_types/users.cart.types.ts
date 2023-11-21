import { SimpleResponse } from '../../../config/types';

export type UsersCartCreateSingleRequest = {
  quantity: number;
  productId: string;
};

export type UsersCartCreateSingleResponse = SimpleResponse;
