import { useMutation } from "react-query";
import axios from "axios";

interface AuthRequest {
  username: string;
  password: string;
}

export const useRequestAuth = () => {
  const { mutate } = useMutation<unknown, unknown, AuthRequest, unknown>(
    (payload) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        payload
      );
    }
  );

  return { mutate };
};
