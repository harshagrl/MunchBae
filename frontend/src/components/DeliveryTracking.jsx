import React, { useEffect } from "react";
import scooter from "../assets/scooter.png";
import home from "../assets/home.png";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

const deliveryPartnerIcon = L.icon({
  iconUrl: scooter,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});
const customerIcon = L.icon({
  iconUrl: home,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

const MapUpdater = ({ deliveryPartnerLat, deliveryPartnerLong }) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      map.setView([deliveryPartnerLat, deliveryPartnerLong], 16);
    }
  }, [deliveryPartnerLat, deliveryPartnerLong, map]);

  return null;
};

const DeliveryTracking = ({ data }) => {
  const deliveryPartnerLat = data.deliveryPartnerLocation.lat;
  const deliveryPartnerLong = data.deliveryPartnerLocation.long;
  const customerLat = data.customerLocation.lat;
  const customerLong = data.customerLocation.long;
  const path = [
    [deliveryPartnerLat, deliveryPartnerLong],
    [customerLat, customerLong],
  ];
  const center = [deliveryPartnerLat, deliveryPartnerLong];
  return (
    <div className="w-full bg-gray-100 border border-gray-300 h-100 mt-3 rounded-xl overflow-hidden shadow-md">
      <MapContainer className={"w-full h-full"} center={center} zoom={16}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater
          deliveryPartnerLat={deliveryPartnerLat}
          deliveryPartnerLong={deliveryPartnerLong}
        />
        <Marker
          position={[deliveryPartnerLat, deliveryPartnerLong]}
          icon={deliveryPartnerIcon}
        >
          <Popup>Delivery Partner</Popup>
        </Marker>
        <Marker position={[customerLat, customerLong]} icon={customerIcon}>
          <Popup>Customer</Popup>
        </Marker>
        <Polyline positions={path} color="blue" weight={3} />
      </MapContainer>
    </div>
  );
};

export default DeliveryTracking;
