import users from "@/dummies/users_data.json";
import { UpdateUserRequestSchema } from "@/validations/users";

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } },
) => {
  const user = users.find((user) => user.id.toString() === params.id);
  if (!user)
    return Response.json(
      { message: "User not found", status: 404 },
      { status: 404 },
    );
  return Response.json({ data: user, status: 200 });
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const body = await request.json();
  const userIndex = users.findIndex((user) => user.id.toString() === params.id);
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
  users[userIndex] = body;
  return Response.json({ data: body }, { status: 201 });
};
