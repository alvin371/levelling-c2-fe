import authors from "@/dummies/authors_data.json";
import { AuthorResponse } from "@/types/authors";
import { ZodIssueException } from "@/utils/exceptions";
import { createApi, eq, filter, search, sort } from "@/utils/filter";
import { getErrorStatus } from "@/utils/request";
import { CreateAuthorRequestSchema } from "@/validations/authors";

export const GET = createApi(authors, [
  search({ fields: ["name"] }),
  sort({ fields: ["id", "name", "birthdate"] }),
  filter([eq({ field: "birthdate" })]),
]);

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const valid = await CreateAuthorRequestSchema.safeParseAsync(body);
    if (valid.error) throw ZodIssueException(valid.error.errors);
    const data: AuthorResponse = {
      id: authors.length + 1,
      name: valid.data.name,
      birthdate: valid.data.birthdate,
      biography: valid.data.biography,
      nationality: valid.data.nationality,
    };
    return Response.json({ data, status: 201 }, { status: 201 });
  } catch (error) {
    return Response.json(error, { status: getErrorStatus(error) });
  }
};
