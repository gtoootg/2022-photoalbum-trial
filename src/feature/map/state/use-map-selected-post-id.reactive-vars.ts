import { createGlobalState } from "react-use";

export const useMapSelectedPostId = createGlobalState<number | null>(null);
