export type CategoriesGetSingleResponse = {
  id: string;
  name: string;
  description: string;
};

export type CategoriesGetManyResponse = {
  data: Array<CategoriesGetSingleResponse>;
};
