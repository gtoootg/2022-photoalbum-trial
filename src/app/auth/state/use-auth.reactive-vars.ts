import { createGlobalState } from "react-use";

export const useAuthUserId = createGlobalState<number | null>(null);

export const useAuthAccessToken = createGlobalState<string | null>(null);
