import books from "@/dummies/books_data.json";
import { UpdateBookRequestSchema } from "@/validations/books";

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } },
) => {
  const book = books.find((author) => author.id.toString() === params.id);
  if (!book)
    return Response.json(
      { message: "Book not found", status: 404 },
      { status: 404 },
    );
  return Response.json({ data: book, status: 200 });
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const body = await request.json();
  const bookIndex = books.findIndex((book) => book.id.toString() === params.id);
  if (bookIndex < 0)
    return Response.json(
      { message: "Book not found", status: 404 },
      { status: 404 },
    );

  const valid = UpdateBookRequestSchema.safeParse(body);
  if (valid.error) {
    return Response.json(
      { message: valid.error.errors, status: 400 },
      { status: 400 },
    );
  }
  books[bookIndex] = body;
  return Response.json({ data: body }, { status: 201 });
};
