import React from "react";
import { useTranslation } from "next-i18next";
import { AlbumPostGeneralInformationEditTextGroupBoxStyled } from "../AlbumPostGeneralInformationTextGroup.styled";
import { StepperSecondStepTextFieldStyled } from "../../../../../../upload/components/stepper/second-stepper/UploadSecondStepContainer";
import { Box } from "@mui/material";
import { MgButton } from "../../../../../../../components/button/MgButton";
import {
  useAlbumPostEditDescription,
  useAlbumPostEditTitle,
  useAlbumPostTitleAndDescriptionEditMode,
} from "./state/use-edit-title-and-desription-in-album-post.hooks";
import { useSetInitialTitleAndDescriptionInAlbumPost } from "./hooks/use-set-initial-title-and-description-in-album-post.hooks";
import { useAlbumPostUpdateGeneralInformation } from "./hooks/use-album-post-update-general-information.hooks";
import { useTheme } from "@mui/system";

export const AlbumPostGeneralInformationEditTextGroup = () => {
  const { t } = useTranslation();
  const [titleToUpdate, setTitleToUpdate] = useAlbumPostEditTitle();
  const [descriptionToUpdate, setDescriptionToUpdate] =
    useAlbumPostEditDescription();
  const { updateAlbumPost, isUpdating } =
    useAlbumPostUpdateGeneralInformation();
  const [, setEditMode] = useAlbumPostTitleAndDescriptionEditMode();
  const theme = useTheme();

  useSetInitialTitleAndDescriptionInAlbumPost();

  return (
    <AlbumPostGeneralInformationEditTextGroupBoxStyled
      display={"flex"}
      flexDirection={"column"}
      width={500}
    >
      <StepperSecondStepTextFieldStyled
        required
        id="outlined-required"
        label={t("generalInformation.edit.title", { ns: "album-post" })}
        onChange={(e) => setTitleToUpdate(e.target.value)}
        value={titleToUpdate}
      />
      <StepperSecondStepTextFieldStyled
        required
        multiline
        id="outlined-required"
        label={t("generalInformation.edit.description", {
          ns: "album-post",
        })}
        onChange={(e) => setDescriptionToUpdate(e.target.value)}
        value={descriptionToUpdate}
      />
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Box mr={1}>
          <MgButton
            disabled={isUpdating}
            color={"secondary"}
            variant={"contained"}
            text={t("generalInformation.edit.cancel", {
              ns: "album-post",
            })}
            onClick={() => {
              setEditMode(false);
            }}
          />
        </Box>
        <Box>
          <MgButton
            disabled={isUpdating}
            variant={"contained"}
            text={t("generalInformation.edit.confirm", {
              ns: "album-post",
            })}
            onClick={updateAlbumPost}
          />
        </Box>
      </Box>
    </AlbumPostGeneralInformationEditTextGroupBoxStyled>
  );
};
