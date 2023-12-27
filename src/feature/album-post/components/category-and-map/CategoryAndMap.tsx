import { CircularProgress, Grid } from "@mui/material";
import { ClickableChip } from "../../../../components/clickable-chip/ClickableChip";

import styles from "./CategoryAndMap.module.scss";
import { Category, IconFactory } from "./CategoryIconFactory";
import { AlbumPostMapWithLinkButton } from "./components/map/AlbumPostMap";
import { useGetCommonCategories } from "../../../../api/common/categories/use-get-common-categories.hooks";
import { GetAlbumPostResponse } from "../../../../api/album-posts/album-posts.api.types";

// export const CategoryAndMap = ({
//   uploadedPost,
// }: {
//   uploadedPost: GetAlbumPostResponse;
// }) => {
//   const { data: allCategories } = useGetCommonCategories();
//   const { categoryIds } = uploadedPost;
//
//   if (!allCategories || !categoryIds) {
//     return <CircularProgress />;
//   }
//
//   return (
//     <Grid container item xs={12}>
//       <Grid item xs={6} className={styles.category}>
//         {Object.keys(categoryIds)?.map((categoryId, i) => {
//           const categoryIdAsNumber = Number(categoryId);
//           const category = allCategories.find(
//             ({ id }) => categoryIdAsNumber === id
//           );
//           return (
//             <ClickableChip
//               key={i}
//               label={category?.label || ""}
//               color={chipColorByCategory(categoryIdAsNumber)}
//               icon={<IconFactory iconType={categoryIdAsNumber} />}
//               rootStyles={{ margin: "8px" }}
//             />
//           );
//         })}
//       </Grid>
//       <Grid item xs={6}>
//         <AlbumPostMapWithLinkButton uploadedPost={uploadedPost} />
//       </Grid>
//     </Grid>
//   );
// };

// const chipColorByCategory = (category: Category) => {
//   if (category === Category.NATURE) {
//     return "green";
//   }
//
//   if (category === Category.NIGHT_VIEW) {
//     return "blue";
//   }
//
//   if (category === Category.CITY_VIEW) {
//     return "orange";
//   }
//
//   if (category === Category.TRAFFIC) {
//     return "gray";
//   }
// };
