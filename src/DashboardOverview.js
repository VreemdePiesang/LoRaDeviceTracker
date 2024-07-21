import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 10px; height: 10px; border-radius: 50%;"></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
    popupAnchor: [0, -5]
  });
};

const DashboardOverview = ({ devicesData, zones }) => {
  const devices = Object.entries(devicesData).map(([deviceId, data]) => ({
    id: deviceId,
    longitude: data['4197'].value,
    latitude: data['4198'].value,
    lastUpdated: data['4197'].created,
    zone: data.zone
  }));

  const center = devices.length > 0 
    ? [devices[0].latitude, devices[0].longitude] 
    : [0, 0];

  return (
    <div className="dashboard-overview">
      <div className="overview-grid">
        <div className="overview-card">
          <span className="card-value">{devices.length}</span>
          <span className="card-label">Devices</span>
        </div>
        <div className="overview-card">
          <span className="card-value">{zones.length}</span>
          <span className="card-label">Zones</span>
        </div>
        <div className="overview-card">
          <span className="card-value">{devices.filter(d => d.zone === 'Outside any zone').length}</span>
          <span className="card-label">Unzoned</span>
        </div>
        <div className="overview-card">
          <span className="card-value">3</span>
          <span className="card-label">Alerts</span>
        </div>
      </div>

      <div className="map-container">
        <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {devices.map(device => (
            <Marker 
              key={device.id} 
              position={[device.latitude, device.longitude]} 
              icon={createCustomIcon('#3388ff')}
            >
              <Popup>
                <div>
                  <strong>Device {device.id}</strong>
                  <p>Zone: {device.zone}</p>
                  <p>Last Updated: {new Date(device.lastUpdated).toLocaleString()}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="device-list">
        <h3>Device Status</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Zone</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {devices.map(device => (
              <tr key={device.id}>
                <td>{device.id}</td>
                <td>{device.zone}</td>
                <td>{new Date(device.lastUpdated).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardOverview;