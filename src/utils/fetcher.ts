import withQuery from "with-query";

export const getQueryServer = async <T>(fn: () => Promise<T>) => {
  try {
    const data = await fn();

    return { data };
  } catch (error) {
    return { error: error as Error };
  }
};

type TApi = {
  baseUrl: string;
};

export const Api = ({ baseUrl }: TApi) => {
  return {
    get: async <Resp>(
      input: RequestInfo | URL,
      options?: {
        params?: object | string;
      } & RequestInit,
      isCatch = true
    ) => {
      const params = options?.params;
      if (options?.params) delete options.params;

      const response = await fetch(
        withQuery(new URL(input.toString(), baseUrl).toString(), params),
        {
          method: "GET",
          cache: "no-store",
          ...(options || {}),
          headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
          },
        }
      );

      const data = await response.json();
      if (!response.ok && isCatch) {
        throw new Error(JSON.stringify(data));
      }

      return data as Resp;
    },
    post: async <Resp>(
      input: RequestInfo | URL,
      payload?: any,
      options?: {
        params?: object | string;
      } & RequestInit
    ) => {
      const params = options?.params;

      if (options?.params) delete options.params;

      const url = withQuery(
        new URL(input.toString(), baseUrl).toString(),
        params
      );

      const headers = {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      };

      const requestOptions: RequestInit = {
        method: "POST",
        cache: "no-store", // Set cache to 'no-store'
        ...(options || {}),
        headers,
        body: JSON.stringify(payload),
      };
      const response = await fetch(url, requestOptions);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }
      return data as Resp;
    },

    put: async <Resp>(
      input: RequestInfo | URL,
      payload?: any,
      options?: {
        params?: object | string;
      } & RequestInit
    ) => {
      const params = options?.params;

      if (options?.params) delete options.params;

      const headers = {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      };

      const response = await fetch(
        withQuery(new URL(input.toString(), baseUrl).toString(), params),
        {
          method: "PUT",
          cache: "no-store",
          ...(options || {}),
          headers,
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }
      return data as Resp;
    },
    patch: async <Resp>(
      input: RequestInfo | URL,
      payload?: any,
      options?: {
        params?: object | string;
      } & RequestInit
    ) => {
      const params = options?.params;

      if (options?.params) delete options.params;

      const headers = {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      };

      const response = await fetch(
        withQuery(new URL(input.toString(), baseUrl).toString(), params),
        {
          method: "PATCH",
          cache: "no-store",
          ...(options || {}),
          headers,
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }
      return data as Resp;
    },
    delete: async <Resp>(
      input: RequestInfo | URL,
      payload?: any,
      options?: {
        params?: object | string;
      } & RequestInit
    ) => {
      const params = options?.params;

      if (options?.params) delete options.params;

      const headers = {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      };

      const response = await fetch(
        withQuery(new URL(input.toString(), baseUrl).toString(), params),
        {
          method: "DELETE",
          cache: "no-store",
          ...(options || {}),
          headers,
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }
      return data as Resp;
    },
  };
};

export const api = Api({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL! });
