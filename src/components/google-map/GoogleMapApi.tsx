import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import { GoogleMapApiProps } from "./GoogleMapApi.types";

const API_KEY = process.env.GOOGLE_MAP_API_KEY;

const GoogleMapAPI: React.FC<GoogleMapApiProps> = ({
  center,
  zoom,
  clusterItems,
  handleClickMarkerOfCluster,
  markerPositions,
  handleClickMap,
}) => {
  function createKey(location: { lat: number; lng: number }) {
    return location.lat + location.lng;
  }

  console.log(markerPositions);

  return (
    <LoadScript
      googleMapsApiKey={"AIzaSyAhf8RgW3KVsaUK5Oqr-JKTpASBBrHlXd8"}
      language={"en"}
    >
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={zoom}
        onClick={handleClickMap}
      >
        {(markerPositions || []).map(({ lat, lng }) => (
          <Marker
            position={{
              lat,
              lng,
            }}
          />
        ))}
        {clusterItems && (
          <MarkerClusterer>
            {(clusterer) => (
              <>
                {clusterItems.map((location) => (
                  <Marker
                    key={createKey(location)}
                    position={location}
                    clusterer={clusterer}
                    onClick={() => {
                      if (!handleClickMarkerOfCluster) {
                        return;
                      }
                      handleClickMarkerOfCluster(location.id);
                    }}
                    options={{
                      icon: {
                        url: location.imageUrl || "",
                        scaledSize: new window.google.maps.Size(90, 60),
                      },
                    }}
                  />
                ))}
              </>
            )}
          </MarkerClusterer>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapAPI;
