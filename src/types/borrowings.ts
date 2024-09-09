// Borrowings Module Types

export interface User {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  title: string;
}

export interface CreateBorrowingRequest {
  user_id: number;
  book_id: number;
  borrowed_date: string;
  return_date: string;
  status: string;
  user: User;
  book: Book;
}

export interface BorrowingResponse {
  id: number;
  user_id: number;
  book_id: number;
  borrowed_date: string;
  return_date: string;
  status: string;
  user: User;
  book: Book;
}

export interface UpdateBorrowingRequest extends CreateBorrowingRequest {}

export interface ListBorrowingsResponse extends Array<BorrowingResponse> {}
