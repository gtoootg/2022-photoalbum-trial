import { useGetCommonCategories } from "../../../../../../../../api/common/categories/use-get-common-categories.hooks";
import { PreviewImageListBox } from "../../../../../../../../components/preview-image-list-box/PreviewImageListBox";
import { useCallback, useMemo } from "react";
import { useUploadingCategories } from "../../../../../../state/use-upload-data.reactive-vars";

export const useCategoryCheckBoxSubComponents = (): JSX.Element[] => {
  const { data: categories } = useGetCommonCategories();
  const setCategoryToImage = useSetCategoryToUploadingImage();
  const getOpacity = useGetOpacityOfImageInCategory();
  return useMemo(
    () =>
      (categories || []).map(({ id: categoryId }, i) => {
        return (
          <PreviewImageListBox
            key={i}
            helperText="select photos"
            onClickImageCallback={(id) => {
              setCategoryToImage(id, categoryId);
            }}
            getImageOpacity={(id) => getOpacity(id, categoryId)}
          />
        );
      }),
    [categories, getOpacity, setCategoryToImage]
  );
};

const useGetOpacityOfImageInCategory = () => {
  const [categories] = useUploadingCategories();

  return useCallback(
    (id: string, categoryId: number) => {
      const imagesForCategory = categories[categoryId];

      if (imagesForCategory?.includes(id)) {
        return "1";
      }
      return "0.6";
    },
    [categories]
  );
};

const useSetCategoryToUploadingImage = () => {
  const [categories, setCategories] = useUploadingCategories();

  return useCallback(
    (id: string, categoryId: number) => {
      const imagesForCategory = categories[categoryId];
      if (!imagesForCategory) {
        setCategories({ ...categories, [categoryId]: [id] });
        return;
      }
      const imagesToSet = new Set(imagesForCategory);

      if (imagesForCategory && imagesForCategory.includes(id)) {
        imagesToSet.delete(id);

        setCategories({ ...categories, [categoryId]: Array.from(imagesToSet) });
        return;
      }

      imagesToSet.add(id);
      setCategories({ ...categories, [categoryId]: Array.from(imagesToSet) });
    },
    [categories, setCategories]
  );
};
