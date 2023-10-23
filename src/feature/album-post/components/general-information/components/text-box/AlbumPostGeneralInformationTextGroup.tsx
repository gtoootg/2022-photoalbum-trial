import { useGetAlbumPostData } from "../../../../hooks/use-get-album-post.hooks";
import Typography from "@mui/material/Typography";
import {
  AlbumPostGeneralInformationEditTextGroupBoxStyled,
  AlbumPostGeneralInformationTextGroupStyled,
} from "./AlbumPostGeneralInformationTextGroup.styled";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { Box } from "@mui/material";
import { StepperSecondStepTextFieldStyled } from "../../../../../upload/components/stepper/second-stepper/UploadSecondStepContainer";
import { CommonButton } from "../../../../../../components/button/CommonButton";
import { useUpdateAlbumPost } from "../../../../../../api/album-posts/use-update-album-post.hooks";
import { useRouter } from "next/router";
import { useGetAlbumPosts } from "../../../../../../api/album-posts/use-get-album-posts.hooks";
import { AlbumPostGeneralInformationEditTextGroup } from "./edit-mode/AlbumPostGeneralInformationEditTextGroup";
import {
  useAlbumPostTitleAndDescriptionEditMode
} from "./edit-mode/state/use-edit-title-and-desription-in-album-post.hooks";

export const AlbumPostGeneralInformationTextGroup = () => {
  const { albumPost } = useGetAlbumPostData();
  const [isEditMode, setIsEditMode] = useAlbumPostTitleAndDescriptionEditMode()

  if (!albumPost) {
    return null;
  }

  const { title, description } = albumPost;

  if (isEditMode) {
    return (
      <AlbumPostGeneralInformationEditTextGroup />
    )
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
