import authors from "@/dummies/authors_data.json";
import { UpdateAuthorRequestSchema } from "@/validations/authors";

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } },
) => {
  const author = authors.find((author) => author.id.toString() === params.id);
  if (!author)
    return Response.json(
      { message: "Author not found", status: 404 },
      { status: 404 },
    );
  return Response.json({ data: author, status: 200 });
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const body = await request.json();
  const authorIndex = authors.findIndex(
    (author) => author.id.toString() === params.id,
  );
  if (authorIndex < 0)
    return Response.json(
      { message: "Author not found", status: 404 },
      { status: 404 },
    );
  const valid = UpdateAuthorRequestSchema.safeParse(body);
  if (valid.error) {
    return Response.json(
      { message: valid.error.errors, status: 400 },
      { status: 400 },
    );
  }
  authors[authorIndex] = body;
  return Response.json({ data: body }, { status: 201 });
};
