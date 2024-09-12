import { TIndexQueryParams } from "@/commons/types/api";

export type TIndexAuthorsQueryParams = TIndexQueryParams & {
  birthdate?: string;
};

export type TBorrowing = {
  id: number;
  user_id: number;
  book_id: number;
  borrowed_date: string;
  return_date: string;
  status: string;
  user: {
    id: number;
    name: string;
  };
  book: {
    id: number;
    title: string;
  };
};
