import React from "react";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { MgText } from "../../../../components/text/MgText";
import { AlbumPostGeneralInformationTextGroup } from "./components/text-box/AlbumPostGeneralInformationTextGroup";

export const AlbumPostGeneralInformation = ({
  userName,
}: {
  userName?: string;
}) => {
  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <Box mr={1}>
          <AccountCircleIcon sx={{ height: "60px", width: "60px" }} />
        </Box>
        <MgText variant={"h5"} content={userName || "user unknown"} />
      </Box>
      <AlbumPostGeneralInformationTextGroup />
    </>
  );
};
