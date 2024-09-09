
// Users Module Types

export interface Borrowing {
    id: number;
    bookTitle: string;
}

export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    membershipDate: string;
    status: string;
    borrowings: Borrowing[];
}

export interface UserResponse {
    id: number;
    name: string;
    email: string;
    membershipDate: string;
    status: string;
    borrowings: Borrowing[];
}

export interface UpdateUserRequest extends CreateUserRequest {}

export interface ListUsersResponse extends Array<UserResponse> {}
