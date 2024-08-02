
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
    userId: number;
    bookId: number;
    borrowedDate: string;
    returnDate: string;
    status: string;
    user: User;
    book: Book;
}

export interface BorrowingResponse {
    id: number;
    userId: number;
    bookId: number;
    borrowedDate: string;
    returnDate: string;
    status: string;
    user: User;
    book: Book;
}

export interface UpdateBorrowingRequest extends CreateBorrowingRequest {}

export interface ListBorrowingsResponse extends Array<BorrowingResponse> {}
