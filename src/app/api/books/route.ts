import books from "@/dummies/books_data.json";
import authors from "@/dummies/authors_data.json";
import categories from "@/dummies/categories_data.json";
import publishers from "@/dummies/publishers_data.json";
import { BookResponse } from "@/types/books";
import { CreateBookRequestSchema } from "@/validations/books";
import { ZodIssueException, NotFoundException } from "@/utils/exceptions";
import { getErrorStatus } from "@/utils/request";
import { createApi, eq, filter, search, sort } from "@/utils/filter";

export const GET = createApi(books, [
  search({ fields: ["title"] }),
  sort({ fields: ["id", "title", "published_date"] }),
  filter([eq({ field: "isbn" })]),
]);

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const valid = await CreateBookRequestSchema.safeParseAsync(body);
    if (valid.error) {
      throw ZodIssueException(valid.error.errors);
    }
    const publisher = publishers.find(
      (publisher) => publisher.id === valid.data.publisher_id,
    );
    if (publisher === undefined) throw NotFoundException("Publisher not found");
    const data: BookResponse = {
      id: books.length + 1,
      title: valid.data.title,
      authors: valid.data.author_ids.map((id) => {
        const author = authors.find((author) => author.id === id);
        if (author === undefined) throw NotFoundException("Author not found");
        return {
          id,
          name: author.name,
        };
      }),
      isbn: valid.data.isbn,
      published_date: valid.data.published_date,
      quantity: valid.data.quantity,
      categories: valid.data.category_ids.map((id) => {
        const category = categories.find((category) => category.id === id);
        if (category === undefined)
          throw NotFoundException("Category not found");
        return {
          id,
          name: category.name,
        };
      }),
      description: valid.data.description,
      publisher: {
        id: publisher.id,
        name: publisher.name,
      },
      page_count: valid.data.page_count,
      language: valid.data.language,
    };
    return Response.json({ data, status: 201 }, { status: 201 });
  } catch (error) {
    return Response.json(error, { status: getErrorStatus(error) });
  }
};
