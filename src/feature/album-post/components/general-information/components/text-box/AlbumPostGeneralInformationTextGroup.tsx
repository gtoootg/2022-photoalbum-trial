import { useGetAlbumPostData } from "../../../../hooks/use-get-album-post.hooks";
import Typography from "@mui/material/Typography";
import {
  AlbumPostGeneralInformationEditTextGroupBoxStyled,
  AlbumPostGeneralInformationTextGroupStyled,
} from "./AlbumPostGeneralInformationTextGroup.styled";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { Box } from "@mui/material";
import { StepperSecondStepTextFieldStyled } from "../../../../../upload/components/stepper/second-stepper/UploadSecondStepContainer";
import { CommonButton } from "../../../../../../components/button/CommonButton";
import { useUpdateAlbumPost } from "../../../../../../api/album-posts/use-update-album-post.hooks";
import { router } from "next/client";

export const AlbumPostGeneralInformationTextGroup = () => {
  const { postId } = router.query;
  const { t } = useTranslation();
  const { albumPost } = useGetAlbumPostData();
  const [isEditMode, setIsEditMode] = useState(false);
  const [titleToUpdate, setTitleToUpdate] = useState(albumPost?.title || "");
  const [descriptionToUpdate, setDescriptionToUpdate] = useState(
    albumPost?.description || ""
  );

  const { mutate: updateAlbumPost } = useUpdateAlbumPost({
    onSuccessCallback: () => {
      setIsEditMode(false);
    },
  });

  if (!albumPost) {
    return null;
  }

  const { title, description } = albumPost;

  if (isEditMode) {
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
          label={t("generalInformation.edit.title", {
            ns: "album-post",
          })}
          onChange={(e) => setDescriptionToUpdate(e.target.value)}
          value={descriptionToUpdate}
        />
        <Box display={"flex"} justifyContent={"flex-end"}>
          <CommonButton
            variant={"contained"}
            text={"submit"}
            onClick={() => {
              if (typeof postId !== "string") {
                return;
              }
              updateAlbumPost({
                id: Number(postId),
                title: titleToUpdate,
                description: descriptionToUpdate,
              });
            }}
          />
        </Box>
      </AlbumPostGeneralInformationEditTextGroupBoxStyled>
    );
  }

  return (
    <AlbumPostGeneralInformationTextGroupStyled
      width={500}
      onClick={() => setIsEditMode(true)}
    >
      <Typography variant={"h5"} mt={1} mb={1}>
        {title}
      </Typography>
      <Typography variant={"body1"} display="block" mb={1}>
        {description}
      </Typography>
    </AlbumPostGeneralInformationTextGroupStyled>
  );
};
