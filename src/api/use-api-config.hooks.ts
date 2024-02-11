import { useAuthAccessToken } from "../app/auth/state/use-auth.reactive-vars";
import { useMemo } from "react";

export const useApiConfig = () => {
  const [token] = useAuthAccessToken();

  return useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),
    [token]
  );
};
