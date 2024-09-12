import { TIndexQueryParams } from "@/commons/types/api";

export type TIndexUsersQueryParams = TIndexQueryParams & {
  membership_date?: string;
};

export type TUsers = {
  id?: number;
  name: string;
  email: string;
  password: string;
  membership_date: string;
  status: string;
  borrowings?: {
    id: number;
    book_title: string;
  }[];
};
