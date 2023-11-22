type OrdersGetSingleResponseItem = {
  name: string;
  description: string;
  price: number;
  quantity: number;
};

export type OrdersGetSingleResponse = {
  id: string;
  date: string;
  client?: string;
  total: number;
  items: Array<OrdersGetSingleResponseItem>;
};

export type OrdersGetManyResponse = {
  data: Array<OrdersGetSingleResponse>;
};
