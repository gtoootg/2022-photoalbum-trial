export const getCountryDataOfAllUploadedPosts = (
  uploadedPosts,
  allCountries
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
