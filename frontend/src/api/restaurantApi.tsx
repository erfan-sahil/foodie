import type { Restaurant } from "@/types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
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
    queryFn: getMyRestaurantRequest,
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
  };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
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

  const { mutate: createMyRestaurant, isPending } = useMutation({
    mutationFn: createMyRestaurantRequest,

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
    createMyRestaurant,
    isPending,
  };
};

// export const use;
