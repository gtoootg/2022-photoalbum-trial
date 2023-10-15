import { useGetCommonCountries } from "../../../../../../../api/common/countries/use-get-common-countries.hooks";
import {
  useUploadingCountry,
  useUploadingLocation,
} from "../../../../../state/use-upload-data.reactive-vars";
import { useEffect, useMemo } from "react";

const tokyo = { lat: 35, lng: 139 };

export const useThirdStepContainerGoogleMapLocation = () => {
  const { data: countries } = useGetCommonCountries();
  const [uploadingCountry] = useUploadingCountry();

  const countryInfo = useMemo(() => {
    if (!countries || !uploadingCountry) {
      return undefined;
    }
    return countries?.find((country) => country.ccn3 === uploadingCountry);
  }, [countries, uploadingCountry]);

  const center = useMemo(() => {
    if (!countries || !uploadingCountry) {
      return tokyo;
    }

    const { latlng } = countryInfo;

    return { lat: latlng[0], lng: latlng[1] };
  }, [countries, uploadingCountry]);

  return center;
};

export const useSetLocationOfSelectedCountry = () => {
  const { data: countries } = useGetCommonCountries();
  const [uploadingCountry] = useUploadingCountry();
  const [, setUploadingLocation] = useUploadingLocation();

  useEffect(() => {
    if (!countries || !uploadingCountry) {
      return;
    }
    const countryInfo = countries?.find(
      (country) => country.ccn3 === uploadingCountry
    );

    const { latlng } = countryInfo;

    setUploadingLocation({ lat: latlng[0], lng: latlng[1] });
  }, [uploadingCountry, countries]);
};
