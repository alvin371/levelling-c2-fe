import { TIndexQueryParams } from "@/commons/types/api";

export type TIndexAuthorsQueryParams = TIndexQueryParams & {
  birthdate?: string;
};

export type TCategories = {
  id: number;
  name: string;
  description: string;
  parent_category_id: number;
  subcategories: {
    id: number;
    name: string;
  }[];
  sub_category_ids: number[];
};
