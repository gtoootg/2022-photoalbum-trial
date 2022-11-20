import { Chip, CircularProgress, Grid } from "@mui/material";
import { ClickableChip } from "../../../../components/ClickableChip/ClickableChip";

import styles from "./CountryAndCategory.module.scss";
import { Category, IconFactory } from "./CategoryIconFactory";

export const CountryAndCategory = ({ uploadedPost, allCategories }) => {
  const { categoryId: arrayOfCategoryId } = uploadedPost;

  if (!uploadedPost || !allCategories) {
    return <CircularProgress />;
  }

  return (
    <Grid container item xs={12}>
      <Grid item xs={6} className={styles.category}>
        {arrayOfCategoryId?.map((categoryId, i) => (
          <ClickableChip
            key={i}
            label={allCategories[categoryId].label}
            color={chipColorByCategory(categoryId)}
            icon={<IconFactory iconType={categoryId} />}
            rootStyles={{ margin: "8px" }}
          />
        ))}
      </Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  );
};

const chipColorByCategory = (category: Category) => {
  if (category === Category.NATURE) {
    return "green";
  }

  if (category === Category.NIGHT_VIEW) {
    return "blue";
  }

  if (category === Category.CITY_VIEW) {
    return "orange";
  }

  if (category === Category.TRAFFIC) {
    return "gray";
  }
};
