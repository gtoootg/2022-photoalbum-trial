import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";

type GoogleMapApiProps = {
  center: { lat: number; lng: number };
  zoom: number;
  onClickAction?: boolean;
  uploadingDataLatLng?: { lat: number; lng: number };
  setUploadingDataLatLng?: (e: any) => void;
  clusterLocations?: { lat: number; lng: number; id: number }[];
  handleClickMarkerOfCluster?: (id: number) => void;
};

const API_KEY = "AIzaSyAhf8RgW3KVsaUK5Oqr-JKTpASBBrHlXd8";

const GoogleMapAPI: React.FC<GoogleMapApiProps> = ({
  center,
  zoom,
  onClickAction,
  uploadingDataLatLng,
  setUploadingDataLatLng,
  clusterLocations,
  handleClickMarkerOfCluster,
}) => {
  const setMarkerPosition = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setUploadingDataLatLng({ ...uploadingDataLatLng, lat: lat, lng: lng });
  };

  function createKey(location) {
    return location.lat + location.lng;
  }

  return (
    <LoadScript googleMapsApiKey={API_KEY} language={"en"}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={zoom}
        onClick={onClickAction && setMarkerPosition}
      >
        {uploadingDataLatLng && (
          <Marker
            position={{
              lat: uploadingDataLatLng.lat,
              lng: uploadingDataLatLng.lng,
            }}
          />
        )}
        {clusterLocations && (
          <MarkerClusterer>
            {(clusterer) => (
              <div>
                {clusterLocations.map((location) => (
                  <Marker
                    key={createKey(location)}
                    position={location}
                    clusterer={clusterer}
                    onClick={() => handleClickMarkerOfCluster(location.id)}
                  />
                ))}
              </div>
            )}
          </MarkerClusterer>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapAPI;
