import { createContext, useState } from "react";
import { AlbumPostDialogsType } from "../dialog/AlbumPostDialogs";

export const AlbumPostOpeningDialogContext = createContext([]);

export const AlbumPostContextProvider = ({ children }) => {
  const [openingDialog, setOpeningDialog] = useState<
    AlbumPostDialogsType | undefined
  >(undefined);

  return (
    <AlbumPostOpeningDialogContext.Provider
      value={[openingDialog, setOpeningDialog]}
    >
      {children}
    </AlbumPostOpeningDialogContext.Provider>
  );
};
