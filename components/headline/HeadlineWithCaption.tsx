import { Typography, Container } from "@mui/material";
import styles from "./HeadlineWithCaption.module.scss";

export interface HeadlineWithCaptionProps {
  headline: string;
  caption: string;
}

export const HeadlineWithCaption = ({
  headline,
  caption,
}: HeadlineWithCaptionProps) => {
  return (
    <>
      <Typography className={styles.headline} variant={"h4"}>
        {headline}
      </Typography>
      <Typography className={styles.caption}>{caption}</Typography>
    </>
  );
};
