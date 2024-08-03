import users from "@/dummies/users_data.json";
import borrowings from "@/dummies/borrowings_data.json";
import { NotFoundException } from "@/utils/exceptions";
import { getErrorStatus } from "@/utils/request";
import { UpdateUserRequestSchema } from "@/validations/users";

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const user = users.find((user) => user.id.toString() === params.id);
    if (!user) throw NotFoundException("User not found");
    return Response.json({ data: user, status: 200 });
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
    const userIndex = users.findIndex(
      (user) => user.id.toString() === params.id,
    );
    if (userIndex < 0)
      return Response.json(
        { message: "User not found", status: 404 },
        { status: 404 },
      );

    const valid = UpdateUserRequestSchema.safeParse(body);
    if (valid.error) {
      return Response.json(
        { message: valid.error.errors, status: 400 },
        { status: 400 },
      );
    }
    const data = users[userIndex];
    if (valid.data.name) data.name = valid.data.name;
    if (valid.data.email) data.email = valid.data.email;
    if (valid.data.password) data.password = valid.data.password;
    if (valid.data.membershipDate)
      data.membershipDate = valid.data.membershipDate;
    if (valid.data.status) data.status = valid.data.status;
    if (valid.data.borrowingIds) {
      data.borrowings = valid.data.borrowingIds.map((id) => {
        const borrowing = borrowings.find((borrowing) => borrowing.id === id);
        if (borrowing === undefined)
          throw NotFoundException("Borrowing not found");
        return {
          id,
          bookTitle: borrowing.book.title,
        };
      });
    }
    return Response.json({ data, status: 201 }, { status: 201 });
  } catch (error) {
    return Response.json(error, { status: getErrorStatus(error) });
  }
};
