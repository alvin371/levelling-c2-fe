import borrowings from "@/dummies/borrowings_data.json";
import users from "@/dummies/users_data.json";
import books from "@/dummies/books_data.json";
import { BorrowingResponse } from "@/types/borrowings";
import { NotFoundException, ZodIssueException } from "@/utils/exceptions";
import { getErrorStatus } from "@/utils/request";
import { CreateBorrowingRequestSchema } from "@/validations/borrowings";

export const GET = async (request: Request) => {
  let borrowingsResponse = borrowings;
  const url = new URL(request.url);
  const filterBorrowedDate = url.searchParams.get("borrowedDate");

  if (filterBorrowedDate) {
    borrowingsResponse = borrowingsResponse.filter(
      (borrowing) => borrowing.borrowedDate === filterBorrowedDate,
    );
  }

  return Response.json({ data: borrowingsResponse, status: 200 });
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const valid = await CreateBorrowingRequestSchema.safeParseAsync(body);
    if (valid.error) throw ZodIssueException(valid.error.errors);
    const user = users.find((user) => user.id === valid.data.userId);
    if (user === undefined) throw NotFoundException("User not found");
    const book = books.find((book) => book.id === valid.data.bookId);
    if (book === undefined) throw NotFoundException("Book not found");
    const data: BorrowingResponse = {
      id: borrowings.length + 1,
      userId: valid.data.userId,
      bookId: valid.data.bookId,
      borrowedDate: valid.data.borrowedDate,
      returnDate: valid.data.returnDate,
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
