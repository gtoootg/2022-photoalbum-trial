import { Typography, Box } from "@mui/material";

export interface HeadlineWithCaptionProps {
  headline: string;
  caption: string;
}

export const HeadlineWithCaption = ({
  headline,
  caption,
}: HeadlineWithCaptionProps) => {
  return (
    <Box>
      <Typography mb={0.5} variant={"h4"}>
        {headline}
      </Typography>
      <Typography>{caption}</Typography>
    </Box>
  );
};
