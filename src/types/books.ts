// Books Module Types

export interface Author {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Publisher {
  id: number;
  name: string;
}

export interface CreateBookRequest {
  title: string;
  authors: Author[];
  isbn: string;
  published_date: string;
  quantity: number;
  categories: Category[];
  description: string;
  publisher: Publisher;
  page_count: number;
  language: string;
}

export interface BookResponse {
  id: number;
  title: string;
  authors: Author[];
  isbn: string;
  published_date: string;
  quantity: number;
  categories: Category[];
  description: string;
  publisher: Publisher;
  page_count: number;
  language: string;
}

export interface UpdateBookRequest extends CreateBookRequest {}

export interface ListBooksResponse extends Array<BookResponse> {}
