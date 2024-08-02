import borrowings from "@/dummies/borrowings_data.json";
import { CreateBorrowingRequestSchema } from "@/validations/borrowings";

export const GET = async (request: Request) => {
  let cloneBorrowings = borrowings;
  const url = new URL(request.url);
  const filterBorrowedDate = url.searchParams.get("borrowedDate");

  if (filterBorrowedDate) {
    cloneBorrowings = cloneBorrowings.filter(
      (borrowing) => borrowing.borrowedDate === filterBorrowedDate,
    );
  }

  return Response.json({ data: cloneBorrowings, status: 200 });
};

export const POST = async (request: Request) => {
  const body = await request.json();
  const valid = await CreateBorrowingRequestSchema.safeParseAsync(body);
  if (valid.error) {
    return Response.json(
      { message: valid.error.errors, status: 400 },
      { status: 400 },
    );
  }
  borrowings.push(body);
  return Response.json({ data: body, status: 201 }, { status: 201 });
};
