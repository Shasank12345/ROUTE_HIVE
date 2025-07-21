import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function UserMap() {
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const busMarkerRef = useRef(null);
  const intervalRef = useRef(null);

  const BUS_ICON = new L.Icon({
    iconUrl: '/bus-icon.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const USER_ICON = new L.Icon({
    iconUrl: '/user-icon.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  const [userLocation, setUserLocation] = useState(null);

  // Flags to track if notifications were sent
  const nearNotifiedRef = useRef(false);
  const arrivedNotifiedRef = useRef(false);

  // Helper to calculate distance in meters between two lat/lng points
  function getDistance(lat1, lon1, lat2, lon2) {
    function toRad(x) {
      return (x * Math.PI) / 180;
    }
    const R = 6371000; // meters
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const startBusSimulation = (start, end) => {
    let currentLat = start.lat;
    let currentLng = start.lng;
    const steps = 300; 
    let step = 0;

    const deltaLat = (end.lat - currentLat) / steps;
    const deltaLng = (end.lng - currentLng) / steps;

    if (busMarkerRef.current) {
      busMarkerRef.current.remove();
    }

    busMarkerRef.current = L.marker([currentLat, currentLng], { icon: BUS_ICON }).addTo(mapRef.current);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (step >= steps) {
        clearInterval(intervalRef.current);
        return;
      }

      currentLat += deltaLat;
      currentLng += deltaLng;
      busMarkerRef.current.setLatLng([currentLat, currentLng]);

      
      const dist = getDistance(currentLat, currentLng, end.lat, end.lng);

      
      if (dist <= 300 && !nearNotifiedRef.current) {
        nearNotifiedRef.current = true;
        fetch('http://localhost:5000/notify_user/near', {
          method: 'POST',
          credentials: 'include',
        }).catch(console.error);
      }

      if (dist <= 10 && !arrivedNotifiedRef.current) {
        arrivedNotifiedRef.current = true;
        fetch('http://localhost:5000/notify_user/arrived', {
          method: 'POST',
          credentials: 'include',
        }).catch(console.error);
      }

      step++;
    }, 300); 
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      alert('Please enable GPS to view your location.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        if (!mapRef.current) {
          mapRef.current = L.map('map').setView([latitude, longitude], 15);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
          }).addTo(mapRef.current);
        }

        fetch('http://localhost:5000/simulate_bus', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ latitude, longitude }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data && data.bus_start && data.user_location) {
              setUserLocation(data.user_location);
              nearNotifiedRef.current = false;
              arrivedNotifiedRef.current = false;
              startBusSimulation(data.bus_start, data.user_location);
            }
          })
          .catch((err) => console.error('Simulation error:', err));
      },
      (err) => {
        alert('Please enable GPS to view your location.');
        console.error(err);
      }
    );

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && userLocation) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
      } else {
        userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
          icon: USER_ICON,
        }).addTo(mapRef.current);
      }
    }
  }, [userLocation]);

  return (
    <div>
      <div
        id="map"
        style={{ height: '500px', width: '100%', borderRadius: '10px', marginTop: '20px' }}
      ></div>
    </div>
  );
}
