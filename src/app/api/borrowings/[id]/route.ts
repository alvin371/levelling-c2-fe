import borrowings from "@/dummies/borrowings_data.json";
import { UpdateBorrowingRequestSchema } from "@/validations/borrowings";

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } },
) => {
  const filterBorrowing = borrowings.find(
    (borrowing) => borrowing.id.toString() === params.id,
  );
  if (!filterBorrowing)
    return Response.json(
      { message: "Borrowing not found", status: 404 },
      { status: 404 },
    );
  return Response.json({ data: filterBorrowing, status: 200 });
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
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
  borrowings[borrowingIndex] = body;
  return Response.json({ data: body }, { status: 201 });
};
