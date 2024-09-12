import { TIndexQueryParams } from "@/commons/types/api";

export type TIndexAuthorsQueryParams = TIndexQueryParams & {
  birthdate?: string;
};

export type TBooks = {
  id: number;
  title: string;
  authors: {
    id: number;
    name: string;
  }[];
  isbn: string;
  published_date: string;
  quantity: number;
  categories: {
    id: number;
    name: string;
  }[];
  description: string;
  publisher: {
    id: number;
    name: string;
  };
  page_count: number;
  language: string;
};
