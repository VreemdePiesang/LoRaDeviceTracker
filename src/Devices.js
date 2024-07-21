import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { 
  SignalIcon,
  BatteryIcon,
  MapPinIcon,
  ClockIcon
} from 'lucide-react';

const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="${color}" d="M12 0a8 8 0 00-8 8c0 1.421.382 2.75 1.031 3.906.108.192.221.381.344.563L12 24l6.625-11.531c.102-.151.19-.311.281-.469A7.954 7.954 0 0020 8a8 8 0 00-8-8zm0 4a4 4 0 110 8 4 4 0 010-8z"/>
        <circle cx="12" cy="8" r="3" fill="white"/>
      </svg>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  });
};

const Devices = ({ devicesData, zones }) => {
  const [selectedDevice, setSelectedDevice] = useState(null);

  const devices = Object.entries(devicesData).map(([deviceId, data]) => ({
    id: deviceId,
    longitude: data['4197'].value,
    latitude: data['4198'].value,
    lastUpdated: data['4197'].created,
    zone: data.zone,
    batteryLevel: Math.random() * 100, // Placeholder: replace with actual battery level
    signalStrength: Math.random() * 100 // Placeholder: replace with actual signal strength
  }));

  const handleDeviceClick = (device) => {
    setSelectedDevice(device);
  };

  return (
    <div className="devices-page p-4">
      <h2 className="text-2xl font-bold mb-4">Device Management</h2>
      <div className="devices-grid grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="devices-list-card bg-white shadow rounded-lg p-4 md:col-span-1">
          <h3 className="card-title text-lg font-semibold mb-2">Devices</h3>
          <ul className="devices-list space-y-2">
            {devices.map(device => (
              <li 
                key={device.id} 
                className={`device-item p-2 rounded cursor-pointer hover:bg-gray-100 ${selectedDevice?.id === device.id ? 'bg-blue-100' : ''}`}
                onClick={() => handleDeviceClick(device)}
              >
                <span className="device-name font-medium">Device {device.id}</span>
                <span className="device-zone text-sm text-gray-600 ml-2">{device.zone}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="device-details-card bg-white shadow rounded-lg p-4 md:col-span-2">
          {selectedDevice ? (
            <>
              <h3 className="card-title text-lg font-semibold mb-4">Device Details</h3>
              <div className="device-details-grid grid grid-cols-2 gap-4 mb-4">
                <div className="detail-item flex items-center">
                  <SignalIcon className="detail-icon w-5 h-5 mr-2 text-blue-500" />
                  <div>
                    <span className="detail-label text-sm text-gray-600 block">Signal Strength</span>
                    <span className="detail-value font-medium">{selectedDevice.signalStrength.toFixed(2)}%</span>
                  </div>
                </div>
                <div className="detail-item flex items-center">
                  <BatteryIcon className="detail-icon w-5 h-5 mr-2 text-green-500" />
                  <div>
                    <span className="detail-label text-sm text-gray-600 block">Battery Level</span>
                    <span className="detail-value font-medium">{selectedDevice.batteryLevel.toFixed(2)}%</span>
                  </div>
                </div>
                <div className="detail-item flex items-center">
                  <MapPinIcon className="detail-icon w-5 h-5 mr-2 text-red-500" />
                  <div>
                    <span className="detail-label text-sm text-gray-600 block">Current Zone</span>
                    <span className="detail-value font-medium">{selectedDevice.zone}</span>
                  </div>
                </div>
                <div className="detail-item flex items-center">
                  <ClockIcon className="detail-icon w-5 h-5 mr-2 text-purple-500" />
                  <div>
                    <span className="detail-label text-sm text-gray-600 block">Last Updated</span>
                    <span className="detail-value font-medium">{new Date(selectedDevice.lastUpdated).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="device-map-container h-64 rounded overflow-hidden">
                <MapContainer center={[selectedDevice.latitude, selectedDevice.longitude]} zoom={13} style={{ height: '100%', width: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker 
                    position={[selectedDevice.latitude, selectedDevice.longitude]} 
                    icon={createCustomIcon('#3388ff')}
                  >
                    <Popup>Device {selectedDevice.id}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </>
          ) : (
            <div className="no-device-selected text-center py-8 text-gray-500">
              <p>Select a device to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Devices;