import type { RestaurantSearchResponse } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (
  city?: string
): Promise<RestaurantSearchResponse> => {
  const createSearchRequests = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/api/restaurant/search/${city}`
    );

    console.log(response);

    if (!response.data) {
      throw new Error("Failed to fetch restaurants");
    }
    console.log("restaurant search data", response.data);
    return response;
  };

  const { data: results, isPending } = useQuery({
    queryKey: ["searchRestaurants"],
    queryFn: createSearchRequests,
  });

  return {
    results,
    isPending,
  };
};
