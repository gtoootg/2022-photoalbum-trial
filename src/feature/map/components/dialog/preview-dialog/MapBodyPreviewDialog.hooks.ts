import {useTranslation} from "next-i18next";
import {useContext} from "react";
import {
  MapBodyOpeningDialogTypeContext,
  MapBodySelectedUploadedPostIdContext
} from "../../../MapBodyContextProvider";


export const useMapBodyPreviewDialogConfig = ()=>{
  const {t}=useTranslation()

  const [selectedPostId, setSelectedPostId] = useContext(MapBodySelectedUploadedPostIdContext)
  const [openingDialogType, setOpeningDialogType] = useContext(MapBodyOpeningDialogTypeContext)


  const buttonConfig = {
    submitButton:{
      label:t("label.see-details"),
      link:`album-posts/${selectedPostId}`
    },
    cancelButton:{
      label:t("label.close"),
      handleCancel:()=>{setOpeningDialogType(undefined)}
    }


  }

  return {buttonConfig}

}