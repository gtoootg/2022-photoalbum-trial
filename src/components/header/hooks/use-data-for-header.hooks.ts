import { useGetCommonCountries } from "../../../api/common/countries/use-get-common-countries.hooks";
import { useGetAlbumPostsSelector } from "../../../api/album-posts/use-get-album-posts.hooks";
import { useMemo } from "react";
import { useGetCommonCategories } from "../../../api/common/categories/use-get-common-categories.hooks";

export const useCountriesFromAlbumPostsForHeader = () => {
  const getAlbumPostsSelector = useGetAlbumPostsSelector();
  const albumPosts = getAlbumPostsSelector?.data;
  const { data: allCountries } = useGetCommonCountries();

  return useMemo(() => {
    const countryIds: Set<string> = new Set([]);
    if (!albumPosts || !allCountries) {
      return undefined;
    }

    albumPosts.forEach(({ country }) => {
      countryIds.add(country);
    });

    return Array.from(countryIds).map((countryId) => {
      const countryData = allCountries.find(
        (country) => country.ccn3 === countryId
      );

      return {
        label: countryData?.name.common || "",
        link: `/country/${countryData?.ccn3}`,
      };
    });
  }, [albumPosts, allCountries]);
};

export const useCategoriesFromAlbumPostsForHeader = () => {
  const getAlbumPostsSelector = useGetAlbumPostsSelector();
  const albumPosts = getAlbumPostsSelector?.data;
  const { data: categories } = useGetCommonCategories();

  return useMemo(() => {
    const categoryIdsToUse: Set<string> = new Set([]);
    if (!albumPosts || !categories) {
      return undefined;
    }

    const categoryIdsFromAllPosts = albumPosts
      .map(({ categoryIds }) => Object.keys(categoryIds))
      .flat();

    categoryIdsFromAllPosts.forEach((categoryId) => {
      categoryIdsToUse.add(categoryId);
    });

    return Array.from(categoryIdsToUse).map((categoryId) => {
      const category = categories.find(({ id }) => String(id) === categoryId);
      return {
        label: category?.label || "",
        link: `category/${category?.id}`,
      };
    });
  }, [albumPosts, categories]);
};
