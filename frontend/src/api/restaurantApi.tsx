import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (city?: string) => {
  const createSearchRequests = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/api/restaurants?city=${city}`
    );

    if (!response.data) {
      throw new Error("Failed to fetch restaurants");
    }

    return response.data;
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
