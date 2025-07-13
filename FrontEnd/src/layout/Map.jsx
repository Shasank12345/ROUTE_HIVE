import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const userMarkerRef = useRef(null);
  const busMarkerRef = useRef(null);
  const busPathRef = useRef([]);
  const polylineRef = useRef(null);

  const [userPos, setUserPos] = useState(null);

  useEffect(() => {
    // Initialize the Leaflet map
    if (!mapRef.current) {
      const bounds = L.latLngBounds([27.60, 85.25], [27.82, 85.65]);

     mapRef.current = L.map(mapContainerRef.current, {
  center: [(27.6935 + 27.6224) / 2, (85.2848 + 85.5466) / 2],
  zoom: 12,
  maxZoom: 18,
  minZoom: 10,
  maxBounds: bounds,
  maxBoundsViscosity: 0.9,
})

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);
    }

    // ✅ Track user's current GPS location
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newPos = [latitude, longitude];
        setUserPos(newPos);

        if (!userMarkerRef.current) {
          userMarkerRef.current = L.marker(newPos, {
            title: 'You',
            icon: L.icon({
              iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png',
              iconSize: [30, 30],
              iconAnchor: [15, 30],
            }),
          }).addTo(mapRef.current);
        } else {
          userMarkerRef.current.setLatLng(newPos);
        }

        // Optionally auto center map on user
        // mapRef.current.setView(newPos, 14);
      },
      (err) => {
        alert("GPS error: " + err.message);
      },
      { enableHighAccuracy: true }
    );

    // ✅ Simulate Bus Movement
    let busLat = 27.6194;
    let busLng = 85.5388;

    const simulateBus = setInterval(() => {
      // Simulate GPS changes
      busLat += 0.0005;
      busLng += 0.0007;

      const newBusPos = [busLat, busLng];
      busPathRef.current.push(newBusPos);

      // Create or update bus marker
      if (!busMarkerRef.current) {
        busMarkerRef.current = L.marker(newBusPos, {
          title: 'Bus',
          icon: L.icon({
            iconUrl: 'https://www.pngfind.com/pngs/m/686-6862411_bus-icon-stop-positioning-logo-hq-image-free.png', // better bus icon
            iconSize: [38, 38],
            iconAnchor: [19, 38],
          }),
        }).addTo(mapRef.current);
      } else {
        busMarkerRef.current.setLatLng(newBusPos);
      }

      // Create or update polyline path
      if (!polylineRef.current) {
        polylineRef.current = L.polyline(busPathRef.current, {
          color: 'blue',
          weight: 4,
        }).addTo(mapRef.current);
      } else {
        polylineRef.current.setLatLngs(busPathRef.current);
      }
    }, 2000); // moves every 2 seconds

    // Optional: stop simulation after 20 seconds
    setTimeout(() => {
      clearInterval(simulateBus);
    }, 20000);

    // Cleanup on component unmount
    return () => {
      navigator.geolocation.clearWatch(watchId);
      clearInterval(simulateBus);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      

      <div
        ref={mapContainerRef}
        style={{
          height: '500px',
          width: '90%',
          margin: '20px auto',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      />

    
    </>
  );
}
