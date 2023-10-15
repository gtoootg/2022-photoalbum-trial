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
  uploadingDataLatLng?: { lat: number; lng: number } | null;
  setUploadingDataLatLng?: (e: { lat: number; lng: number } | null) => void;
  clusterItems?: { lat: number; lng: number; id: number; imageUrl?: string }[];
  handleClickMarkerOfCluster?: (id: number) => void;
};

const API_KEY = process.env.GOOGLE_MAP_API_KEY;

const GoogleMapAPI: React.FC<GoogleMapApiProps> = ({
  center,
  zoom,
  onClickAction,
  uploadingDataLatLng,
  setUploadingDataLatLng,
  clusterItems,
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
        {clusterItems && (
          <MarkerClusterer>
            {(clusterer) => (
              <div>
                {clusterItems.map((location) => (
                  <Marker
                    key={createKey(location)}
                    position={location}
                    clusterer={clusterer}
                    onClick={() => handleClickMarkerOfCluster(location.id)}
                    options={{
                      icon: {
                        url: location.imageUrl && location.imageUrl,
                        scaledSize: new window.google.maps.Size(90, 60),
                      },
                    }}
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
