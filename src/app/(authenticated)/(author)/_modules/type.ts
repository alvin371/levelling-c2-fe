import { TIndexQueryParams } from "@/commons/types/api";

export type TIndexAuthorsQueryParams = TIndexQueryParams & {
  birthdate?: string;
};

export type TAuthors = {
  id: number;
  name: string;
  birthdate: string;
  biography: string;
  nationality: string;
  books: {
    id: number;
    title: string;
  }[];
};
