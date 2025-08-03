import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import type { User } from "../types/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await axios.get(`${API_BASE_URL}/api/v1/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.data) {
      throw new Error("Failed to fetch user");
    }
    return response.data;
  };

  const {
    data: currentUser,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["fetchCurrentUser"],
    queryFn: getUserRequest,
  });

  if (isSuccess) {
    console.log("User data fetched successfully");
  }
  if (isError) {
    toast.error("Failed to fetch user data");
  }

  return {
    currentUser,
    isPending,
  };
};

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const queryClient = useQueryClient();
  const createUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.post(`${API_BASE_URL}/api/v1/user`, user, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.data) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: createUserRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    createUser,
    isError,
    isSuccess,
  };
};

type UpdateUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};
export const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateUserRequest = async (formData: UpdateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    console.log("Access Token:", accessToken);
    const response = await axios.put(`${API_BASE_URL}/api/v1/user`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.data) {
      throw new Error("Failed to update user");
    }
    return response.data;
  };

  const { mutateAsync: updateUser, isPending } = useMutation({
    mutationFn: updateUserRequest,
    onSuccess: () => {
      console.log("User updated successfully");
      toast.success("User updated successfully");
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      toast.error(error.toString());
    },
  });

  return {
    updateUser,
    isPending,
  };
};
