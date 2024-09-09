import { TApiResponseError, TParseApiErrorResponse } from "@/commons/types/api";

export const errorResponse = (
  errors: string
): TParseApiErrorResponse | null => {
  if (!errors) return null;

  const errorResponseApi = JSON.parse(errors) as TApiResponseError;

  return {
    error_message: errorResponseApi.error_message.split("|")[0],
    errors: errors,
  };
};
