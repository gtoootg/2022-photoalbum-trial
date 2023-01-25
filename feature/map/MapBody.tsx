import GoogleMapApi from "../../components/google-map/GoogleMapApi";

export const MapBody = () => {
  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <GoogleMapApi
        center={{ lat: 0, lng: 0 }}
        zoom={3}
        clusterLocations={[]}
      />
    </div>
  );
};
