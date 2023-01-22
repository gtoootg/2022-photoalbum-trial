export const getCountryDataOfAllUploadedPosts = (
  uploadedPosts,
  allCountries
) => {
  let arrayOfCountryId: number[] = [];

  if (!uploadedPosts || !allCountries) {
    return;
  }

  uploadedPosts.forEach((post) => {
    if (arrayOfCountryId.includes(post.country)) {
      return;
    }
    arrayOfCountryId.push(post.country);
  });

  console.log(arrayOfCountryId);

  const countryDataOfAllUploadedPosts = arrayOfCountryId.map((countryId) => {
    const countryData = allCountries.find(
      (country) => country.ccn3 === countryId
    );

    return countryData;
  });

  return countryDataOfAllUploadedPosts;
};
