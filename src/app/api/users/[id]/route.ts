import users from "@/dummies/users_data.json";
import borrowings from "@/dummies/borrowings_data.json";
import { NotFoundException, ZodIssueException } from "@/utils/exceptions";
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
    if (userIndex < 0) throw NotFoundException("User not found");

    const valid = UpdateUserRequestSchema.safeParse(body);
    if (valid.error) throw ZodIssueException(valid.error.errors);

    const data = users[userIndex];
    if (valid.data.name) data.name = valid.data.name;
    if (valid.data.email) data.email = valid.data.email;
    if (valid.data.password) data.password = valid.data.password;
    if (valid.data.membership_date)
      data.membership_date = valid.data.membership_date;
    if (valid.data.status) data.status = valid.data.status;
    if (valid.data.borrowing_ids) {
      data.borrowings = valid.data.borrowing_ids.map((id) => {
        const borrowing = borrowings.find((borrowing) => borrowing.id === id);
        if (borrowing === undefined)
          throw NotFoundException("Borrowing not found");

        return {
          id,
          book_title: borrowing.book.title,
        };
      });
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
    const filterUser = users.find((user) => user.id.toString() === params.id);
    if (!filterUser) throw NotFoundException("User not found");

    return Response.json({
      data: `User with id ${params.id} deleted`,
      status: 200,
    });
  } catch (error) {
    return Response.json(error, { status: getErrorStatus(error) });
  }
};
