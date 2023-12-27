export interface GoogleMapApiProps {
  center: { lat: number; lng: number };
  zoom: number;
  // hasClickableMarker?: boolean;
  // uploadingDataLatLng?: { lat: number; lng: number } | null;
  // setUploadingDataLatLng?: (e: { lat: number; lng: number } | null) => void;
  clusterItems?: { lat: number; lng: number; id: number; imageUrl?: string }[];
  handleClickMarkerOfCluster?: (id: number) => void;

  markerPositions?: { lat: number; lng: number }[];
  handleClickMap?: (e: google.maps.MapMouseEvent) => void;
}
