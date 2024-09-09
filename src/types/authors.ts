// Authors Module Types

export interface Book {
  id: number;
  title: string;
}

export interface CreateAuthorRequest {
  name: string;
  birthdate: string;
  biography: string;
  nationality: string;
}

export interface AuthorResponse {
  id: number;
  name: string;
  birthdate: string;
  biography: string;
  nationality: string;
}

export interface UpdateAuthorRequest extends CreateAuthorRequest {}

export interface ListAuthorsResponse extends Array<AuthorResponse> {}
