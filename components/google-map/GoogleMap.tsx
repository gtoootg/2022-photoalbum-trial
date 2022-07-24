import React, { useState, useContext, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";

type Props = {
  lat: number;
  lng: number;
  zoom: number;
  // multipleMarker?:boolean
  onClick?: (e: any) => void;
};

const API_KEY = "AIzaSyAhf8RgW3KVsaUK5Oqr-JKTpASBBrHlXd8"; // TODO: 自分のキーをここに入力

const GoogleMapAPI: React.FC<Props> = ({ lat, lng, zoom, onClick }) => {
  if (lat === undefined && lng === undefined) {
    return (
      <div className="d-flex">
        Select Country, then google map is shown here
      </div>
    );
  } else {
    return (
      <LoadScript googleMapsApiKey={API_KEY} language={"en"}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={{
            lat: lat,
            lng: lng,
          }}
          zoom={zoom}
          onClick={onClick}
        >
          <Marker
            position={{
              lat: 0,
              lng: 0,
            }}
          />
        </GoogleMap>
      </LoadScript>
    );
  }
};

export default GoogleMapAPI;
