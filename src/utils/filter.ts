import { getErrorStatus } from "./request";

export const createApi = (
  data: any[],
  cbs: ((data: any, request: Request) => any[])[],
) => {
  try {
    return (request: Request) => {
      const filteredData = cbs.reduce((acc, cb) => cb(acc, request), data);
      const paginatedData = pagination(request)(filteredData);
      return Response.json(paginatedData, { status: 200 });
    };
  } catch (err) {
    return Response.json(err, { status: getErrorStatus(err) });
  }
};

export const pagination = (request: Request) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || "1");
  const perPage = Number(url.searchParams.get("per_page") || "10");
  const startData = ((page <= 1 ? 1 : page) - 1) * perPage;
  return (data: any[]) => {
    return {
      data: data.slice(startData, startData + perPage),
      meta: {
        total: data.length,
        total_page: Math.ceil(data.length / perPage),
        current_page: page,
        per_page: perPage,
      },
    };
  };
};

export const sort = ({ fields }: { fields: string[] }) => {
  return (data: any[], request: Request) => {
    const url = new URL(request.url);
    const order = url.searchParams.get("order");
    const sort = url.searchParams.get("sort_by");
    if (!order || !sort) return data;
    const field = fields.find((field) => field === sort);
    if (!field) return data;
    return data.sort((a, b) => {
      if (order === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
  };
};

export const search = ({ fields }: { fields: string[] }) => {
  return (data: any[], request: Request) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || "";
    return data.filter((item) => {
      return fields.some((field) => item[field].includes(search));
    });
  };
};

export const filter = (
  filterFns: ((data: any[], request: Request) => any)[],
) => {
  return (data: any[], request: Request) => {
    return filterFns.reduce((acc, fn) => fn(acc, request), data);
  };
};

export const eq = ({ field }: { field: string }) => {
  return (data: any[], request: Request) => {
    const url = new URL(request.url);
    const fieldValue = url.searchParams.get(field);
    if (!fieldValue) return data;
    return data.filter((item) => item[field] === fieldValue);
  };
};

export const includes = ({ field }: { field: string }) => {
  return (data: any[], request: Request) => {
    const url = new URL(request.url);
    const fieldValue = url.searchParams.get(field);
    if (!fieldValue) return data;
    return data.filter((item) => item[field].includes(fieldValue));
  };
};
