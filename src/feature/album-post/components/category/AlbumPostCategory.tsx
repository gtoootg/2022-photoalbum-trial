import { useGetAlbumPostData } from "../../hooks/use-get-album-post.hooks";
import { ClickableChip } from "../../../../components/clickable-chip/ClickableChip";
import { IconFactory } from "../category-and-map/CategoryIconFactory";
import Box from "@mui/material/Box";
import { useGetCommonCategories } from "../../../../api/common/categories/use-get-common-categories.hooks";
import { chipColorByCategory } from "./helper/get-chip-color-by-category";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styles from "../exif-data/AlbumPostExifData.module.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTranslation } from "next-i18next";

export const AlbumPostCategory = () => {
  const { t } = useTranslation();
  const { data: allCategories } = useGetCommonCategories();
  const { albumPost } = useGetAlbumPostData();
  const { categoryIds } = albumPost || {};

  if (!categoryIds || !allCategories) {
    return null;
  }

  const isCategoryIdsEmpty = Boolean(Object.values(categoryIds).length === 0);

  return (
    <>
      <Box mb={2}>
        <Typography variant={"h5"} fontWeight={"semi-bold"}>
          Category
        </Typography>
      </Box>
      <Grid container>
        {isCategoryIdsEmpty && (
          <Box display={"flex"} mt={2} ml={2}>
            <VisibilityIcon />
            <Typography>
              {t("album-post.category.empty.text", { ns: "album-post" })}
            </Typography>
          </Box>
        )}
        {Object.keys(categoryIds)?.map((categoryId, i) => {
          const categoryIdAsNumber = Number(categoryId);
          const category = allCategories.find(
            ({ id }) => categoryIdAsNumber === id
          );
          return (
            <Grid item xs={6}>
              <ClickableChip
                key={i}
                label={category?.label || ""}
                color={chipColorByCategory(categoryIdAsNumber)}
                icon={<IconFactory iconType={categoryIdAsNumber} />}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
