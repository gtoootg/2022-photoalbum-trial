import { useUploadingLocation } from "../../../../../state/use-upload-data.reactive-vars";
import { Box } from "@mui/material";
import GoogleMapApi from "../../../../../../../components/google-map/GoogleMapApi";
import {
  useSetLocationOfSelectedCountry,
  useThirdStepContainerGoogleMapLocation,
} from "./use-third-step-container-google-map.hooks";

export const UploadThirdStepGoogleMap = ({
  onClickAction,
  setUploadingDataLatLng,
}: {
  onClickAction?: boolean;
  setUploadingDataLatLng?: (e: { lat: number; lng: number }) => void;
}) => {
  const [uploadingLocation] = useUploadingLocation();
  const center = useThirdStepContainerGoogleMapLocation();

  useSetLocationOfSelectedCountry();

  return (
    <Box sx={{ width: "30rem", height: "40rem" }}>
      <GoogleMapApi
        center={center}
        zoom={5}
        uploadingDataLatLng={uploadingLocation}
        onClickAction={onClickAction}
        setUploadingDataLatLng={setUploadingDataLatLng}
      />
    </Box>
  );
};
