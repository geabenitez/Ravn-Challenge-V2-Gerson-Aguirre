import { CategoriesGetSingleResponse } from '../../categories/_types/categories.types';
import { ProductImages } from './products.images.types';

export type ProductsGetSingleResponse = {
  name: string;
  description: string;
  price: number;
  category: CategoriesGetSingleResponse;
  images: ProductImages[];
  isActive: boolean;
};

export type ProductsCreateSingleRequest = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl?: string;
  isActive?: boolean;
};

export type ProductsUpdateSingleRequest = Partial<ProductsCreateSingleRequest>;

export type ProductUpdateSingleStatusRequest = {
  isActive: boolean;
};

export type ProductsGetManyRequest = {
  limit: number;
  page: number;
  isActive?: boolean;
  category?: string;
};

export type ProductsGetManyResponse = {
  count: number;
  page: number;
  limit: number;
  data: Array<
    ProductsGetSingleResponse & {
      index: number;
    }
  >;
};
