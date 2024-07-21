import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './LoRaDeviceTracker.css';

const LoRaDeviceTracker = () => {
  const [deviceData, setDeviceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sensecap-openapi.seeed.cc/1.0/devices/data/DEVICE_ID/raw', {
          auth: {
            username: 'TZLFGHYI4Z1I1C3I',
            password: '054A499902F943E694542D2DE49D4389418E54FDFB074D53AE541D9B0EFB04A0'
          }
        });
        setDeviceData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching device data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!deviceData) return <div>No data available</div>;

  const latitude = deviceData.find(item => item.measure_id === 4198)?.value || 0;
  const longitude = deviceData.find(item => item.measure_id === 4197)?.value || 0;

  return (
    <div>
      <h1>LoRa Device Tracker</h1>
      <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[latitude, longitude]}>
          <Popup>Device Location</Popup>
        </Marker>
      </MapContainer>
      <div>
        <h2>Device Data:</h2>
        <pre>{JSON.stringify(deviceData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default LoRaDeviceTracker;