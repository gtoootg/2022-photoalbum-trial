import { Text } from "../../../../../../../components/text/Text";
import { CheckboxGroup } from "../../../../../../../components/checkbox-group/CheckboxGroup";
import styles from "../../UploadThirdStepContainer.module.scss";

import { useGetCommonCategories } from "../../../../../../../api/common/categories/use-get-common-categories.hooks";
import { useTranslation } from "next-i18next";
import { useCategoryCheckBoxSubComponents } from "./hooks/use-category-checkbox-sub-components";

export const UploadThirdStepCategory = () => {
  const { t } = useTranslation();
  const { data: categories } = useGetCommonCategories();

  const categryOptions = (categories || []).map(({ id, label }) => ({
    value: id,
    label,
  }));

  const subComponents = useCategoryCheckBoxSubComponents();

  return (
    <>
      <Text
        variant={"h6"}
        content={t("stepper.thirdStep.uploadData.category.headline", {
          ns: "upload",
        })}
      />

      <CheckboxGroup
        className={styles.formField}
        options={categryOptions}
        subComponents={subComponents}
      />
    </>
  );
};
