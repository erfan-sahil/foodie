import type { Restaurant } from "@/types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

    return response.data;
  };

  const { mutate: createRestaurant, isPending } = useMutation({
    mutationFn: createRestaurantRequest,
    onSuccess: () => {
      console.log("Restaurant created successfully");
      toast.success("User updated successfully");
    },
    onError: (error) => {
      console.error("Failed to create restaurant:", error);
      toast.success("User updated successfully");
    },
  });

  return {
    createRestaurant,
    isPending,
  };
};
