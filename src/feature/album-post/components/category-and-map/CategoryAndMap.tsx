import { CircularProgress, Grid } from "@mui/material";
import { ClickableChip } from "../../../../components/clickable-chip/ClickableChip";

import styles from "./CategoryAndMap.module.scss";
import { Category, IconFactory } from "./CategoryIconFactory";
import { AlbumPostMapWithLinkButton } from "./components/map/AlbumPostMap";
import { useGetCommonCategories } from "../../../../api/common/categories/use-get-common-categories.hooks";

export const CategoryAndMap = ({ uploadedPost }) => {
  const { data: allCategories } = useGetCommonCategories();
  const { categories } = uploadedPost;

  if (!uploadedPost || !allCategories || !categories) {
    return <CircularProgress />;
  }

  if (Object.keys(categories).length === 0) {
    return null;
  }

  return (
    <Grid container item xs={12}>
      <Grid item xs={6} className={styles.category}>
        {Object.keys(categories)?.map((categoryId, i) => {
          const categoryIdAsNumber = Number(categoryId);
          return (
            <ClickableChip
              key={i}
              label={allCategories[categoryId].label}
              color={chipColorByCategory(categoryIdAsNumber)}
              icon={<IconFactory iconType={categoryIdAsNumber} />}
              rootStyles={{ margin: "8px" }}
            />
          );
        })}
      </Grid>
      <Grid item xs={6}>
        <AlbumPostMapWithLinkButton uploadedPost={uploadedPost} />
      </Grid>
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
