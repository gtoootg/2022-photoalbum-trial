import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

type GoogleMapApiProps = {
  center: { lat: number; lng: number };
  zoom: number;
  onClickAction?: boolean;
  uploadingDataLatLng: { lat: number; lng: number };
  setUploadingDataLatLng: (e: any) => void;
};

const API_KEY = "AIzaSyAhf8RgW3KVsaUK5Oqr-JKTpASBBrHlXd8"; // TODO: 自分のキーをここに入力

const GoogleMapAPI: React.FC<GoogleMapApiProps> = ({
  center,
  zoom,
  onClickAction,
  uploadingDataLatLng,
  setUploadingDataLatLng,
}) => {
  const setMarkerPosition = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setUploadingDataLatLng({ ...uploadingDataLatLng, lat: lat, lng: lng });
    console.log(uploadingDataLatLng);
  };

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
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapAPI;
