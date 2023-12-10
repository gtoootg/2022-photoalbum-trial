import { isMatchRegex, Regex } from "../../../../helper/regex/use-regex";
import {
  RegisterUserRequest,
  useRegisterUser,
} from "../../../../api/auth/use-register-user.hooks";
import { useCallback } from "react";

export const checkRegexForSignUp = (
  value: string,
  regex: Regex,
  setErrorState: (value: boolean) => void
) => {
  if (!value) {
    setErrorState(false);
    return;
  }
  const isCorrect = isMatchRegex(regex, value);
  setErrorState(!isCorrect);
};

export const useHandleSignUp = () => {
  const { mutate, isLoading } = useRegisterUser();

  const registerUser = useCallback(
    (payload: RegisterUserRequest) => {
      mutate(payload);
    },
    [mutate]
  );

  return { registerUser, isLoading };
};
