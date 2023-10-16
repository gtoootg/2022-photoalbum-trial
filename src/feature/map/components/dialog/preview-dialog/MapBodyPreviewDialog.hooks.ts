import { useTranslation } from "next-i18next";
import { useMapSelectedPostId } from "../../../state/use-map-selected-post-id.reactive-vars";

export const useMapBodyPreviewDialogConfig = () => {
  const { t } = useTranslation();
  const [selectedPostId, setSelectedPostId] = useMapSelectedPostId();

  const buttonConfig = {
    submitButton: {
      label: t("label.see-details"),
      link: `album-posts/${selectedPostId}`,
    },
    cancelButton: {
      label: t("label.close"),
      handleCancel: () => setSelectedPostId(null),
    },
  };

  return { buttonConfig };
};
