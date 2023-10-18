import { GetAlbumPostsResponse } from "../../api/album-posts/album-posts.api.types";
import { GetCommonCountriesResponse } from "../../api/common/countries/common-countries.api.types";

export const getCountryDataOfAllUploadedPosts = (
  uploadedPosts: GetAlbumPostsResponse,
  allCountries: GetCommonCountriesResponse
) => {
  const arrayOfCountryId: number[] = [];

  if (!uploadedPosts || !allCountries) {
    return;
  }

  uploadedPosts.forEach((post) => {
    if (arrayOfCountryId.includes(post.country)) {
      return;
    }
    arrayOfCountryId.push(post.country);
  });

  const countryDataOfAllUploadedPosts = arrayOfCountryId.map((countryId) => {
    const countryData = allCountries.find(
      (country) => country.ccn3 === countryId
    );

    return countryData;
  });

  return countryDataOfAllUploadedPosts;
};
