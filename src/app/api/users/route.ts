import users from "@/dummies/users_data.json";
import borrowings from "@/dummies/borrowings_data.json";
import { UserResponse } from "@/types/users";
import { NotFoundException, ZodIssueException } from "@/utils/exceptions";
import { CreateUserRequestSchema } from "@/validations/users";
import { getErrorStatus } from "@/utils/request";
import { createApi, eq, filter, search, sort } from "@/utils/filter";

export const GET = createApi(users, [
  search({ fields: ["name", "email"] }),
  sort({ fields: ["id", "name", "email", "membership_date"] }),
  filter([eq({ field: "membership_date" })]),
]);

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const valid = await CreateUserRequestSchema.safeParseAsync(body);
    if (valid.error) throw ZodIssueException(valid.error.errors);
    const data: UserResponse = {
      id: users.length + 1,
      name: valid.data.name,
      email: valid.data.email,
      membershipDate: valid.data.membership_date,
      status: valid.data.status,
      borrowings: valid.data.borrowing_ids.map((id) => {
        const borrowing = borrowings.find((borrowing) => borrowing.id === id);
        if (borrowing === undefined)
          throw NotFoundException("Borrowing not found");
        return {
          id,
          bookTitle: borrowing.book.title,
        };
      }),
    };
    return Response.json({ data, status: 201 }, { status: 201 });
  } catch (error) {
    return Response.json(error, { status: getErrorStatus(error) });
  }
};
