import { Container } from "@mui/material";
import { HeadlineWithCaption } from "../../components/headline/HeadlineWithCaption";
import { UploadStepperGroup } from "./components/stepper/UploadStepper";
import styles from "./UploadBody.module.scss";
import { useTranslation } from "next-i18next";

export default function Upload() {
  const { t } = useTranslation();

  return (
    <Container className={styles.uploadBody}>
      <HeadlineWithCaption
        headline={t("headlineWithCaption.headline", { ns: "upload" })}
        caption={t("headlineWithCaption.caption", { ns: "upload" })}
      />
      <UploadStepperGroup />
    </Container>
  );
}
