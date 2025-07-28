import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const createUserRequest = async (user: CreateUserRequest) => {
    const response = await axios.post(`${API_BASE_URL}/api/v1/user`, user, {
      // headers: {
      //   'Content-Type': 'application/json',
      // },
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
