export type OrderDetailsCreateSingleRequest = {
  product: string;
  quantity: number;
};

export type OrderDetailsCreateManyRequest =
  Array<OrderDetailsCreateSingleRequest>;
