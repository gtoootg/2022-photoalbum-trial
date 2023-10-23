import {createGlobalState} from "react-use";

export const useAlbumPostTitleAndDescriptionEditMode = createGlobalState<boolean>(false)

export const useAlbumPostEditTitle =  createGlobalState<string>("")

export const useAlbumPostEditDescription = createGlobalState<string>("")