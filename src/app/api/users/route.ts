import users from "@/dummies/users_data.json";
import borrowings from "@/dummies/borrowings_data.json";
import { UserResponse } from "@/types/users";
import { NotFoundException, ZodIssueException } from "@/utils/exceptions";
import { CreateUserRequestSchema } from "@/validations/users";
import { getErrorStatus } from "@/utils/request";

export const GET = async (request: Request) => {
  let authorsResponse = users;
  const url = new URL(request.url);
  const filterName = url.searchParams.get("name");

  if (filterName) {
    authorsResponse = authorsResponse.filter((author) =>
      author.name.toLowerCase().includes(filterName?.toLowerCase()),
    );
  }

  return Response.json({ data: authorsResponse, status: 200 });
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const valid = await CreateUserRequestSchema.safeParseAsync(body);
    if (valid.error) throw ZodIssueException(valid.error.errors);
    const data: UserResponse = {
      id: users.length + 1,
      name: valid.data.name,
      email: valid.data.email,
      membershipDate: valid.data.membershipDate,
      status: valid.data.status,
      borrowings: valid.data.borrowingIds.map((id) => {
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
