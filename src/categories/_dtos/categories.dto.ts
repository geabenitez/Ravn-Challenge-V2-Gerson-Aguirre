import {
  CategoriesGetManyResponse,
  CategoriesGetSingleResponse,
} from '../_types/categories.types';

export class DTOCategoriesGetSingleResponse
  implements CategoriesGetSingleResponse
{
  id: string;
  name: string;
  description: string;
}

export class DTOCategoriesGetManyResponse implements CategoriesGetManyResponse {
  data: DTOCategoriesGetSingleResponse[];
}
