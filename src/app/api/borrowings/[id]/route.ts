import borrowings from "@/dummies/borrowings_data.json";
import users from "@/dummies/users_data.json";
import books from "@/dummies/books_data.json";
import { NotFoundException } from "@/utils/exceptions";
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
    if (borrowingIndex < 0)
      return Response.json(
        { message: "Borrowing not found", status: 404 },
        { status: 404 },
      );

    const valid = UpdateBorrowingRequestSchema.safeParse(body);
    if (valid.error) {
      return Response.json(
        { message: valid.error.errors, status: 400 },
        { status: 400 },
      );
    }
    const data = borrowings[borrowingIndex];

    if (valid.data.userId) data.userId = valid.data.userId;
    if (valid.data.bookId) data.bookId = valid.data.bookId;
    if (valid.data.borrowedDate) data.borrowedDate = valid.data.borrowedDate;
    if (valid.data.returnDate) data.returnDate = valid.data.returnDate;
    if (valid.data.status) data.status = valid.data.status;
    if (valid.data.userId) {
      const user = users.find((user) => user.id === valid.data.userId);
      if (user === undefined) throw NotFoundException("User not found");
      data.user.id = user.id;
      data.user.name = user.name;
    }
    if (valid.data.bookId) {
      const book = books.find((book) => book.id === valid.data.bookId);
      if (book === undefined) throw NotFoundException("Book not found");
      data.book.id = book.id;
      data.book.title = book.title;
    }

    return Response.json({ data, status: 201 }, { status: 201 });
  } catch (error) {
    return Response.json(error, { status: getErrorStatus(error) });
  }
};
