import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  TBorrowing as TDetailBorrowing,
  TIndexAuthorsQueryParams,
} from "../_modules/type";
import { BorrowingQueryKey } from "@/commons/constants";
import { ENDPOINTS } from "@/commons/endpoints";
import { api } from "@/utils/fetcher";
import { TPaginationResponse, TResponse } from "@/commons/types/api";
import { notification } from "antd";
import { errorResponse } from "@/utils/error-response";
import { z } from "zod";
import { BorrowingSchema } from "../_components/form";
export type TBorrowing = z.infer<typeof BorrowingSchema>;

export const useGetListBorrowing = (params: TIndexAuthorsQueryParams) => {
  const authorQuery = useQuery({
    queryKey: [BorrowingQueryKey.LIST, params], // Include `params` in the queryKey
    queryFn: () =>
      api.get<TPaginationResponse<TBorrowing[]>>(ENDPOINTS.BORROWINGS, {
        params,
      }),
    select: (data) => data || [],
  });

  return {
    ...authorQuery,
  };
};

export const useGetDetailBorrowing = (id: string) => {
  const authorQuery = useQuery({
    queryKey: [BorrowingQueryKey.DETAIL, id],
    queryFn: () =>
      api.get<TResponse<TDetailBorrowing>>(ENDPOINTS.BORROWINGS + "/" + id),
    select: (data) => data.data || {},
  });

  return {
    ...authorQuery,
  };
};

export const useDeleteBorrowing = () => {
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationKey: [BorrowingQueryKey.DELETE],
    mutationFn: (id: string) => api.delete(ENDPOINTS.BORROWINGS + "/" + id),
    onSuccess: () => {
      notification.success({
        message: "Borrowings deleted successfully",
      });

      queryClient.invalidateQueries({
        queryKey: [BorrowingQueryKey.LIST],
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

export const useCreateBorrowing = () => {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationKey: [BorrowingQueryKey.CREATE],
    mutationFn: (data: TBorrowing) =>
      api.post<TBorrowing>(ENDPOINTS.BORROWINGS, data),
    onSuccess: () => {
      notification.success({
        message: "Borrowings created successfully",
      });

      queryClient.invalidateQueries({
        queryKey: [BorrowingQueryKey.LIST],
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

  const handleSubmit = (data: TBorrowing) => {
    createUserMutation.mutate(data);
  };

  return {
    handleSubmit,
    ...createUserMutation,
  };
};

export const useUpdateBorrowing = () => {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationKey: [BorrowingQueryKey.UPDATE],
    mutationFn: (data: TBorrowing) =>
      api.put<TBorrowing>(ENDPOINTS.BORROWINGS + "/" + data.id, data),

    onSuccess: () => {
      notification.success({
        message: "Borrowings updated successfully",
      });

      queryClient.invalidateQueries({
        queryKey: [BorrowingQueryKey.LIST],
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

  const handleSubmit = (data: TBorrowing) => {
    updateUserMutation.mutate(data);
  };

  return {
    handleSubmit,
    ...updateUserMutation,
  };
};
