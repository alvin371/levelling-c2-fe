import authors from "@/dummies/authors_data.json";
import books from "@/dummies/books_data.json";
import { AuthorResponse } from "@/types/authors";
import { NotFoundException, ZodIssueException } from "@/utils/exceptions";
import { getErrorStatus } from "@/utils/request";
import { UpdateAuthorRequestSchema } from "@/validations/authors";

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const author = authors.find((author) => author.id.toString() === params.id);
    if (!author) throw NotFoundException("Author not found");
    return Response.json({ data: author, status: 200 });
  } catch (error) {
    return Response.json(error, { status: getErrorStatus(error) });
  }
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const body = await request.json();
    const authorIndex = authors.findIndex(
      (author) => author.id.toString() === params.id,
    );
    if (authorIndex < 0) throw NotFoundException("Author not found");
    const valid = UpdateAuthorRequestSchema.safeParse(body);
    if (valid.error) throw ZodIssueException(valid.error.errors);

    const data: AuthorResponse = authors[authorIndex];
    if (valid.data.name) data.name = valid.data.name;
    if (valid.data.birthdate) data.birthdate = valid.data.birthdate;
    if (valid.data.biography) data.biography = valid.data.biography;
    if (valid.data.nationality) data.nationality = valid.data.nationality;
    if (valid.data.book_ids) {
      data.books = valid.data.book_ids.map((id) => {
        const book = books.find((book) => book.id === id);
        if (book === undefined) throw NotFoundException("Book not found");
        return {
          id,
          title: book.title,
        };
      });
    }
    return Response.json({ data, status: 201 }, { status: 201 });
  } catch (error) {
    return Response.json(error, { status: getErrorStatus(error) });
  }
};
