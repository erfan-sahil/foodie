import type { Restaurant } from "@/types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.get(`${API_BASE_URL}/api/v1/restaurant`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.data) {
      throw new Error("Failed to fetch restaurant");
    }

    console.log(response.data);
    return response.data;
  };

  const {
    data: restaurant,
    isPending,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["fetchRestaurant"],
    queryFn: getRestaurantRequest,
  });

  if (isSuccess) {
    console.error("User data fetched successfully");
  }
  if (isError) {
    console.error("Failed to fetch user data");
  }
  if (isPending) {
    console.log("Fetching restaurant data...");
  }
  console.log("from apiiiii", restaurant);
  return {
    restaurant,
    isPending,
  };
};
export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/restaurant`,
      restaurantFormData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.data) {
      throw new Error("Failed to create restaurant");
    }

    console.log("Restaurant created successfully:", response.data);

    return response.data;
  };

  const { mutate: createRestaurant, isPending } = useMutation({
    mutationFn: createRestaurantRequest,

    onSuccess: () => {
      console.log("Restaurant created successfully");
      toast.success("Restaurant created successfully");
    },
    onError: (error) => {
      console.error("Failed to create restaurant:", error);
      toast.error("Failed to create restaurant");
    },
  });

  return {
    createRestaurant,
    isPending,
  };
};
