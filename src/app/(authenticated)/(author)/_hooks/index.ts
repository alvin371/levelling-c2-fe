import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TAuthors, TIndexAuthorsQueryParams } from "../_modules/type";
import { AuthorQueryKey } from "@/commons/constants";
import { ENDPOINTS } from "@/commons/endpoints";
import { api } from "@/utils/fetcher";
import { TPaginationResponse, TResponse } from "@/commons/types/api";
import { notification } from "antd";
import { errorResponse } from "@/utils/error-response";

export const useGetListAuthor = (params: TIndexAuthorsQueryParams) => {
  const authorQuery = useQuery({
    queryKey: [AuthorQueryKey.LIST, params], // Include `params` in the queryKey
    queryFn: () =>
      api.get<TPaginationResponse<TAuthors[]>>(ENDPOINTS.AUTHORS, {
        params,
      }),
    select: (data) => data || [],
  });

  return {
    ...authorQuery,
  };
};

export const useGetDetailAuthor = (id: string) => {
  const authorQuery = useQuery({
    queryKey: [AuthorQueryKey.DETAIL, id],
    queryFn: () => api.get<TResponse<TAuthors>>(ENDPOINTS.AUTHORS + "/" + id),
    select: (data) => data.data || {},
  });

  return {
    ...authorQuery,
  };
};

export const useDeleteAuthor = () => {
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationKey: [AuthorQueryKey.DELETE],
    mutationFn: (id: string) => api.delete(ENDPOINTS.AUTHORS + "/" + id),
    onSuccess: () => {
      notification.success({
        message: "Author deleted successfully",
      });

      queryClient.invalidateQueries({
        queryKey: [AuthorQueryKey.LIST],
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        notification.error({
          message: errorResponse(error.message)?.error_message,
        });
      }
    },
  });
  const handleSubmit = (id: string) => {
    deleteUserMutation.mutate(id);
  };
  return {
    handleSubmit,
    ...deleteUserMutation,
  };
};

export const useCreateAuthor = () => {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationKey: [AuthorQueryKey.CREATE],
    mutationFn: (data: TAuthors) => api.post<TAuthors>(ENDPOINTS.AUTHORS, data),
    onSuccess: () => {
      notification.success({
        message: "Author created successfully",
      });

      queryClient.invalidateQueries({
        queryKey: [AuthorQueryKey.LIST],
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        notification.error({
          message: errorResponse(error.message)?.error_message,
        });
      }
    },
  });

  const handleSubmit = (data: TAuthors) => {
    createUserMutation.mutate(data);
  };

  return {
    handleSubmit,
    ...createUserMutation,
  };
};

export const useUpdateAuthor = () => {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationKey: [AuthorQueryKey.UPDATE],
    mutationFn: (data: TAuthors) =>
      api.put<TAuthors>(ENDPOINTS.AUTHORS + "/" + data.id, data),

    onSuccess: () => {
      notification.success({
        message: "Author updated successfully",
      });

      queryClient.invalidateQueries({
        queryKey: [AuthorQueryKey.LIST],
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        notification.error({
          message: errorResponse(error.message)?.error_message,
        });
      }
    },
  });

  const handleSubmit = (data: TAuthors) => {
    updateUserMutation.mutate(data);
  };

  return {
    handleSubmit,
    ...updateUserMutation,
  };
};
