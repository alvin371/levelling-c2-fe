import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TUsers, TIndexUsersQueryParams } from "../_modules/type";
import { UserQueryKey } from "@/commons/constants";
import { ENDPOINTS } from "@/commons/endpoints";
import { api } from "@/utils/fetcher";
import { TPaginationResponse, TResponse } from "@/commons/types/api";
import { notification } from "antd";
import { errorResponse } from "@/utils/error-response";

export const useGetListUser = (params: TIndexUsersQueryParams) => {
  const userQuery = useQuery({
    queryKey: [UserQueryKey.LIST, params],
    queryFn: () =>
      api.get<TPaginationResponse<TUsers[]>>(ENDPOINTS.USERS, {
        params,
      }),
    select: (data) => data || [],
  });

  return {
    ...userQuery,
  };
};

export const useGetDetailUser = (id: string) => {
  const userQuery = useQuery({
    queryKey: [UserQueryKey.DETAIL, id],
    queryFn: () => api.get<TResponse<TUsers>>(ENDPOINTS.USERS + "/" + id),
    select: (data) => data.data || {},
  });

  return {
    ...userQuery,
  };
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationKey: [UserQueryKey.DELETE],
    mutationFn: (id: string) => api.delete(ENDPOINTS.USERS + "/" + id),
    onSuccess: () => {
      notification.success({
        message: "User deleted successfully",
      });

      queryClient.invalidateQueries({
        queryKey: [UserQueryKey.LIST],
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

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationKey: [UserQueryKey.CREATE],
    mutationFn: (data: TUsers) => api.post<TUsers>(ENDPOINTS.USERS, data),
    onSuccess: () => {
      notification.success({
        message: "User created successfully",
      });

      queryClient.invalidateQueries({
        queryKey: [UserQueryKey.LIST],
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

  const handleSubmit = (data: TUsers) => {
    createUserMutation.mutate(data);
  };

  return {
    handleSubmit,
    ...createUserMutation,
  };
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationKey: [UserQueryKey.UPDATE],
    mutationFn: (data: TUsers) =>
      api.put<TUsers>(ENDPOINTS.USERS + "/" + data.id, data),

    onSuccess: () => {
      notification.success({
        message: "Author updated successfully",
      });

      queryClient.invalidateQueries({
        queryKey: [UserQueryKey.LIST],
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

  const handleSubmit = (data: TUsers) => {
    updateUserMutation.mutate(data);
  };

  return {
    handleSubmit,
    ...updateUserMutation,
  };
};
