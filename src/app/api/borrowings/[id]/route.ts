import borrowings from "@/dummies/borrowings_data.json";
import users from "@/dummies/users_data.json";
import books from "@/dummies/books_data.json";
import { NotFoundException, ZodIssueException } from "@/utils/exceptions";
import { getErrorStatus } from "@/utils/request";
import { UpdateBorrowingRequestSchema } from "@/validations/borrowings";

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const filterBorrowing = borrowings.find(
      (borrowing) => borrowing.id.toString() === params.id,
    );
    if (!filterBorrowing) throw NotFoundException("Borrowing not found");
    return Response.json({ data: filterBorrowing, status: 200 });
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
    const borrowingIndex = borrowings.findIndex(
      (borrowing) => borrowing.id.toString() === params.id,
    );
    if (borrowingIndex < 0) throw NotFoundException("Borrowing not found");

    const valid = UpdateBorrowingRequestSchema.safeParse(body);
    if (valid.error) throw ZodIssueException(valid.error.errors);

    const data = borrowings[borrowingIndex];

    if (valid.data.user_id) data.user_id = valid.data.user_id;
    if (valid.data.book_id) data.book_id = valid.data.book_id;
    if (valid.data.borrowed_date) data.borrowed_date = valid.data.borrowed_date;
    if (valid.data.return_date) data.return_date = valid.data.return_date;
    if (valid.data.status) data.status = valid.data.status;
    if (valid.data.user_id !== undefined) {
      const user = users.find((user) => user.id === valid.data.user_id);
      if (user === undefined) throw NotFoundException("User not found");
      data.user.id = user.id;
      data.user.name = user.name;
    }
    if (valid.data.book_id !== undefined) {
      const book = books.find((book) => book.id === valid.data.book_id);
      if (book === undefined) throw NotFoundException("Book not found");
      data.book.id = book.id;
      data.book.title = book.title;
    }

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
    const borrowingIndex = borrowings.findIndex(
      (borrowing) => borrowing.id.toString() === params.id,
    );
    if (borrowingIndex < 0) throw NotFoundException("Borrowing not found");

    return Response.json({
      data: `Borrowing with id ${params.id} deleted`,
      status: 200,
    });
  } catch (error) {
    return Response.json(error, { status: getErrorStatus(error) });
  }
};
