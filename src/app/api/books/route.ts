import books from "@/dummies/books_data.json";
import { CreateBookRequestSchema } from "@/validations/books";

export const GET = async (request: Request) => {
  let cloneBooks = books;
  const url = new URL(request.url);
  const filterTitle = url.searchParams.get("title");

  if (filterTitle) {
    cloneBooks = cloneBooks.filter((book) =>
      book.title.toLowerCase().includes(filterTitle?.toLowerCase()),
    );
  }

  return Response.json({ data: cloneBooks, status: 200 });
};

export const POST = async (request: Request) => {
  const body = await request.json();
  const valid = await CreateBookRequestSchema.safeParseAsync(body);
  if (valid.error) {
    return Response.json(
      { message: valid.error.errors, status: 400 },
      { status: 400 },
    );
  }
  books.push(body);
  return Response.json({ data: body, status: 201 }, { status: 201 });
};
