class DTOUsersOrdersGetSingleResponseItem {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

class DTOUsersOrdersGetSingleResponse {
  id: string;
  date: string;
  total: number;
  items: DTOUsersOrdersGetSingleResponseItem[];
}

export class DTOUsersOrdersGetManyResponse {
  data: DTOUsersOrdersGetSingleResponse[];
}
