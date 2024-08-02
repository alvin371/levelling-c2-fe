import z from "zod";

export async function GET() {
  return Response.json({
    api: {
      authors: {
        list: {
          path: "/api/authors",
          method: "GET",
        },
        detail: {
          path: "/api/authors/:id",
          method: "GET",
        },
        update: {
          path: "/api/authors/:id",
          method: "PUT",
        },
        create: {
          path: "/api/authors",
          method: "POST",
        },
      },
      books: {
        list: {
          path: "/api/books",
          method: "GET",
        },
        detail: {
          path: "/api/books/:id",
          method: "GET",
        },
        update: {
          path: "/api/books/:id",
          method: "PUT",
        },
        create: {
          path: "/api/books",
          method: "POST",
        },
      },
      borrowings: {
        list: {
          path: "/api/borrowings",
          method: "GET",
        },
        detail: {
          path: "/api/borrowings/:id",
          method: "GET",
        },
        update: {
          path: "/api/borrowings/:id",
          method: "PUT",
        },
        create: {
          path: "/api/borrowings",
          method: "POST",
        },
      },
      categories: {
        list: {
          path: "/api/categories",
          method: "GET",
        },
        detail: {
          path: "/api/categories/:id",
          method: "GET",
        },
        update: {
          path: "/api/categories/:id",
          method: "PUT",
        },
        create: {
          path: "/api/categories",
          method: "POST",
        },
      },
      users: {
        list: {
          path: "/api/users",
          method: "GET",
        },
        detail: {
          path: "/api/users/:id",
          method: "GET",
        },
        update: {
          path: "/api/users/:id",
          method: "PUT",
        },
        create: {
          path: "/api/users",
          method: "POST",
        },
      },
    },
  });
}
