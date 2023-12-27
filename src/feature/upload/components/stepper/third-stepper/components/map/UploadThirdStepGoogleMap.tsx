import { useUploadingLocation } from "../../../../../state/use-upload-data.reactive-vars";
import { Box } from "@mui/material";
import GoogleMapApi from "../../../../../../../components/google-map/GoogleMapApi";
import {
  useSetLocationOfSelectedCountry,
  useThirdStepContainerGoogleMapLocation,
} from "./use-third-step-container-google-map.hooks";
import { useCallback } from "react";

export const UploadThirdStepGoogleMap = () => {
  const [uploadingLocation] = useUploadingLocation();
  const center = useThirdStepContainerGoogleMapLocation();
  const [, setUploadingLocation] = useUploadingLocation();

  useSetLocationOfSelectedCountry();

  const setMarkerPosition = useCallback(
    (e: google.maps.MapMouseEvent) => {
      const lat = e.latLng?.lat();
      const lng = e.latLng?.lng();
      if (lat === undefined || lng === undefined) {
        return;
      }
      setUploadingLocation({ lat: lat, lng: lng });
    },
    [setUploadingLocation]
  );

  return (
    <Box sx={{ width: "30rem", height: "40rem" }}>
      <GoogleMapApi
        center={center}
        zoom={5}
        markerPositions={uploadingLocation ? [uploadingLocation] : []}
        handleClickMap={setMarkerPosition}
      />
    </Box>
  );
};
