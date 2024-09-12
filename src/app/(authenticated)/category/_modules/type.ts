import { TIndexQueryParams } from "@/commons/types/api";

export type TIndexAuthorsQueryParams = TIndexQueryParams & {
  birthdate?: string;
};

export type TCategories = {
  id: number;
  name: string;
  description: string;
  parentCategory_id: number;
  subcategories: {
    id: number;
    name: string;
  }[];
};
