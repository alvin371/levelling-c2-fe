import borrowings from "@/dummies/borrowings_data.json";
import users from "@/dummies/users_data.json";
import books from "@/dummies/books_data.json";
import { BorrowingResponse } from "@/types/borrowings";
import { NotFoundException, ZodIssueException } from "@/utils/exceptions";
import { getErrorStatus } from "@/utils/request";
import { CreateBorrowingRequestSchema } from "@/validations/borrowings";
import { createApi, eq, filter, sort } from "@/utils/filter";

export const GET = createApi(borrowings, [
  sort({
    fields: [
      "id",
      "user_id",
      "book_id",
      "borrowed_date",
      "return_date",
      "status",
    ],
  }),
  filter([
    eq({ field: "user_id" }),
    eq({ field: "book_id" }),
    eq({ field: "borrowed_date" }),
    eq({ field: "return_date" }),
    eq({ field: "status" }),
  ]),
]);

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const valid = await CreateBorrowingRequestSchema.safeParseAsync(body);
    if (valid.error) throw ZodIssueException(valid.error.errors);
    const user = users.find((user) => user.id === valid.data.user_id);
    if (user === undefined) throw NotFoundException("User not found");
    const book = books.find((book) => book.id === valid.data.book_id);
    if (book === undefined) throw NotFoundException("Book not found");
    const data: BorrowingResponse = {
      id: borrowings.length + 1,
      user_id: valid.data.user_id,
      book_id: valid.data.book_id,
      borrowed_date: valid.data.borrowed_date,
      return_date: valid.data.return_date,
      status: valid.data.status,
      user: {
        id: user.id,
        name: user.name,
      },
      book: {
        id: book.id,
        title: book.title,
      },
    };
    return Response.json({ data, status: 201 }, { status: 201 });
  } catch (error) {
    return Response.json(error, { status: getErrorStatus(error) });
  }
};
