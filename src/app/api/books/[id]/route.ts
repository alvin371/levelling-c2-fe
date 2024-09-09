import books from "@/dummies/books_data.json";
import authors from "@/dummies/authors_data.json";
import categories from "@/dummies/categories_data.json";
import publishers from "@/dummies/publishers_data.json";
import { BookResponse } from "@/types/books";
import { UpdateBookRequestSchema } from "@/validations/books";
import { NotFoundException, ZodIssueException } from "@/utils/exceptions";
import { getErrorStatus } from "@/utils/request";

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const bookResponse = books.find(
      (author) => author.id.toString() === params.id,
    );
    if (!bookResponse) throw NotFoundException("Book not found");
    return Response.json({ data: bookResponse, status: 200 });
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
    const bookIndex = books.findIndex(
      (book) => book.id.toString() === params.id,
    );
    if (bookIndex < 0) throw NotFoundException("Book not found");

    const valid = UpdateBookRequestSchema.safeParse(body);
    if (valid.error) throw ZodIssueException(valid.error.errors);

    const data: BookResponse = books[bookIndex];
    if (valid.data.title) data.title = valid.data.title;
    if (valid.data.author_ids)
      data.authors = valid.data.author_ids.map((id) => {
        const author = authors.find((author) => author.id === id);
        if (author === undefined) throw NotFoundException("Author not found");
        return {
          id,
          name: author.name,
        };
      });
    if (valid.data.isbn) data.isbn = valid.data.isbn;
    if (valid.data.published_date)
      data.published_date = valid.data.published_date;
    if (valid.data.quantity) data.quantity = valid.data.quantity;
    if (valid.data.category_ids)
      data.categories = valid.data.category_ids.map((id) => {
        const category = categories.find((category) => category.id === id);
        if (category === undefined)
          throw NotFoundException("Category not found");
        return {
          id,
          name: category.name,
        };
      });
    if (valid.data.description) data.description = valid.data.description;
    if (valid.data.publisher_id) {
      const publisher = publishers.find(
        (publisher) => publisher.id === valid.data.publisher_id,
      );
      if (publisher === undefined)
        throw NotFoundException("Publisher not found");
      data.publisher.id = valid.data.publisher_id;
      data.publisher.name = publisher.name;
    }
    if (valid.data.page_count) data.page_count = valid.data.page_count;
    if (valid.data.language) data.language = valid.data.language;
    return Response.json({ data, status: 201 }, { status: 201 });
  } catch (error) {
    return Response.json(error, { status: getErrorStatus(error) });
  }
};

export const DELETE = async (
  _request: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const bookIndex = books.findIndex(
      (book) => book.id.toString() === params.id,
    );
    if (bookIndex < 0) throw NotFoundException("Book not found");

    return Response.json({
      data: `Book with id ${params.id} deleted`,
      status: 200,
    });
  } catch (error) {
    return Response.json(error, { status: getErrorStatus(error) });
  }
};
