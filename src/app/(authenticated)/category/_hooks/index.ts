import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TIndexAuthorsQueryParams } from "../_modules/type";
import { CategoryQueryKey } from "@/commons/constants";
import { ENDPOINTS } from "@/commons/endpoints";
import { api } from "@/utils/fetcher";
import { TPaginationResponse, TResponse } from "@/commons/types/api";
import { notification } from "antd";
import { errorResponse } from "@/utils/error-response";
import { z } from "zod";
import { CategorySchema } from "../_components/form";

export type TCategories = z.infer<typeof CategorySchema>;

export const useGetListCategories = (params: TIndexAuthorsQueryParams) => {
  const authorQuery = useQuery({
    queryKey: [CategoryQueryKey.LIST, params], // Include `params` in the queryKey
    queryFn: () =>
      api.get<TPaginationResponse<TCategories[]>>(ENDPOINTS.CATEGORIES, {
        params,
      }),
    select: (data) => data || [],
  });

  return {
    ...authorQuery,
  };
};

export const useGetDetailCategories = (id: string) => {
  const authorQuery = useQuery({
    queryKey: [CategoryQueryKey.DETAIL, id],
    queryFn: () =>
      api.get<TResponse<TCategories>>(ENDPOINTS.CATEGORIES + "/" + id),
    select: (data) => data.data || {},
  });

  return {
    ...authorQuery,
  };
};

export const useDeleteCategories = () => {
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationKey: [CategoryQueryKey.DELETE],
    mutationFn: (id: string) => api.delete(ENDPOINTS.CATEGORIES + "/" + id),
    onSuccess: () => {
      notification.success({
        message: "Categories deleted successfully",
      });

      queryClient.invalidateQueries({
        queryKey: [CategoryQueryKey.LIST],
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

export const useCreateCategories = () => {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationKey: [CategoryQueryKey.CREATE],
    mutationFn: (data: TCategories) =>
      api.post<TCategories>(ENDPOINTS.CATEGORIES, data),
    onSuccess: () => {
      notification.success({
        message: "Categories created successfully",
      });

      queryClient.invalidateQueries({
        queryKey: [CategoryQueryKey.LIST],
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

  const handleSubmit = (data: TCategories) => {
    createUserMutation.mutate(data);
  };

  return {
    handleSubmit,
    ...createUserMutation,
  };
};

export const useUpdateCategories = () => {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationKey: [CategoryQueryKey.UPDATE],
    mutationFn: (data: TCategories) =>
      api.put<TCategories>(ENDPOINTS.CATEGORIES + "/" + data.id, data),

    onSuccess: () => {
      notification.success({
        message: "Categories updated successfully",
      });

      queryClient.invalidateQueries({
        queryKey: [CategoryQueryKey.LIST],
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

  const handleSubmit = (data: TCategories) => {
    updateUserMutation.mutate(data);
  };

  return {
    handleSubmit,
    ...updateUserMutation,
  };
};
