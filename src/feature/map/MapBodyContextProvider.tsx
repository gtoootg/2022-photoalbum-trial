import {createContext, useState} from "react";
import {MapBodyDialogType} from "./components/dialog/MapBodyDialogs";


export const MapBodyOpeningDialogTypeContext = createContext([])
export const MapBodySelectedUploadedPostIdContext = createContext([])

export const MapBodyContextProvider = ({children})=>{
  const [selectedPostId, setSelectedPostId] = useState<number | undefined>(
    undefined
  );
  const [openingDialogType, setOpeningDialogType] = useState<
    MapBodyDialogType | undefined
    >(undefined);

  return (
    <MapBodyOpeningDialogTypeContext.Provider
      value = {[openingDialogType, setOpeningDialogType] }
    >
      <MapBodySelectedUploadedPostIdContext.Provider
        value = {[selectedPostId, setSelectedPostId]}
      >
        {children}
      </MapBodySelectedUploadedPostIdContext.Provider>

    </MapBodyOpeningDialogTypeContext.Provider>

  )


}