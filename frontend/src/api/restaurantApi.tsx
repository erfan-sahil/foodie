import type { SearchState } from "@/pages/SearchPage";
import type { RestaurantSearchResponse } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequests = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.data) {
      throw new Error("Failed to fetch restaurants");
    }
    return response.data;
  };

  const { data: results, isPending } = useQuery({
    queryKey: ["searchRestaurants", searchState],
    queryFn: createSearchRequests,
    enabled: !!city,
  });

  return {
    results,
    isPending,
  };
};
