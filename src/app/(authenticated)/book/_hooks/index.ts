import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TBooks, TIndexAuthorsQueryParams } from "../_modules/type";
import { BookQueryKey } from "@/commons/constants";
import { ENDPOINTS } from "@/commons/endpoints";
import { api } from "@/utils/fetcher";
import { TPaginationResponse, TResponse } from "@/commons/types/api";
import { notification } from "antd";
import { errorResponse } from "@/utils/error-response";
import { z } from "zod";
import { BookSchema } from "../_components/form";

export type TBook = z.infer<typeof BookSchema>;

export const useGetListBooks = (params: TIndexAuthorsQueryParams) => {
  const authorQuery = useQuery({
    queryKey: [BookQueryKey.LIST, params], // Include `params` in the queryKey
    queryFn: () =>
      api.get<TPaginationResponse<TBooks[]>>(ENDPOINTS.BOOKS, {
        params,
      }),
    select: (data) => data || [],
  });

  return {
    ...authorQuery,
  };
};

export const useGetDetailBook = (id: string) => {
  const authorQuery = useQuery({
    queryKey: [BookQueryKey.DETAIL, id],
    queryFn: () => api.get<TResponse<TBooks>>(ENDPOINTS.BOOKS + "/" + id),
    select: (data) => data.data || {},
  });

  return {
    ...authorQuery,
  };
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationKey: [BookQueryKey.DELETE],
    mutationFn: (id: string) => api.delete(ENDPOINTS.BOOKS + "/" + id),
    onSuccess: () => {
      notification.success({
        message: "Book deleted successfully",
      });

      queryClient.invalidateQueries({
        queryKey: [BookQueryKey.LIST],
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

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationKey: [BookQueryKey.CREATE],
    mutationFn: (data: TBook) => api.post<TBooks>(ENDPOINTS.BOOKS, data),
    onSuccess: () => {
      notification.success({
        message: "Book created successfully",
      });

      queryClient.invalidateQueries({
        queryKey: [BookQueryKey.LIST],
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

  const handleSubmit = (data: TBook) => {
    createUserMutation.mutate(data);
  };

  return {
    handleSubmit,
    ...createUserMutation,
  };
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationKey: [BookQueryKey.UPDATE],
    mutationFn: (data: TBook) =>
      api.put<TBook>(ENDPOINTS.BOOKS + "/" + data.id, data),

    onSuccess: () => {
      notification.success({
        message: "Book updated successfully",
      });

      queryClient.invalidateQueries({
        queryKey: [BookQueryKey.LIST],
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

  const handleSubmit = (data: TBook) => {
    updateUserMutation.mutate(data);
  };

  return {
    handleSubmit,
    ...updateUserMutation,
  };
};
