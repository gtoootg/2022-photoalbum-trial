import { useGetAlbumPostData } from "../../../../hooks/use-get-album-post.hooks";
import Typography from "@mui/material/Typography";
import {
  AlbumPostGeneralInformationEditTextGroupBoxStyled,
  AlbumPostGeneralInformationTextGroupStyled,
} from "./AlbumPostGeneralInformationTextGroup.styled";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "next-i18next";
import { Box } from "@mui/material";
import { StepperSecondStepTextFieldStyled } from "../../../../../upload/components/stepper/second-stepper/UploadSecondStepContainer";
import { CommonButton } from "../../../../../../components/button/CommonButton";
import Button from "@mui/material/Button";

export const AlbumPostGeneralInformationTextGroup = () => {
  const { t } = useTranslation();
  const [isEditMode, setIsEditMode] = useState(false);

  const { albumPost } = useGetAlbumPostData();

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
          label={t("stepper.secondStep.uploadData.title", { ns: "upload" })}
          onChange={(e) => {}}
          value={title}
        />
        <StepperSecondStepTextFieldStyled
          required
          multiline
          id="outlined-required"
          label={t("stepper.secondStep.uploadData.description", {
            ns: "upload",
          })}
          onChange={(e) => {}}
          value={description}
        />
        <Box display={"flex"} justifyContent={"flex-end"}>
          <CommonButton
            variant={"contained"}
            text={"submit"}
            onClick={() => {
              setIsEditMode(false);
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
