import { Chip, CircularProgress, Grid } from "@mui/material";
import { ClickableChip } from "../../../../components/ClickableChip/ClickableChip";

import styles from "./CountryAndCategory.module.scss";
import { Category, IconFactory } from "./IconFactory";

export const CountryAndCategory = ({ uploadedPost, allCategories }) => {
  // const { categories } = uploadedPost;

  console.log(uploadedPost);

  if (!uploadedPost || !allCategories) {
    return <CircularProgress />;
  }

  return (
    <Grid container item xs={12}>
      {/* <Grid item xs={6} className={styles.category}>
        {categoriesOfUploadedPost?.map((categoryOfUploadedPost, i) => (
          <ClickableChip
            key={i}
            label={allCategories[categoryOfUploadedPost].label}
            color={chipColorByCategory(categoryOfUploadedPost)}
            icon={<IconFactory iconType={categoryOfUploadedPost} />}
          />
        ))}
      </Grid> */}
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
    return "orance";
  }

  if (category === Category.TRAFFIC) {
    return "gray";
  }
};
