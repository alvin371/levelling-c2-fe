import { useQuery } from "@tanstack/react-query";
import { TAuthors, TIndexAuthorsQueryParams } from "../_modules/type";
import { Author } from "@/commons/constants";
import { ENDPOINTS } from "@/commons/endpoints";
import { api } from "@/utils/fetcher";
import { TPaginationResponse } from "@/commons/types/api";

export const useGetListAuthor = (params: TIndexAuthorsQueryParams) => {
  const authorQuery = useQuery({
    queryKey: [Author.LIST, params], // Include `params` in the queryKey
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
