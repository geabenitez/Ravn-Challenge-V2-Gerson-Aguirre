class DTOOrdersGetSingleResponseItem {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

class DTOOrdersGetSingleResponse {
  id: string;
  date: string;
  total: number;
  items: DTOOrdersGetSingleResponseItem[];
}

export class DTOOrdersGetManyResponse {
  data: DTOOrdersGetSingleResponse[];
}
