import React from 'react';

const Dashboard = ({ deviceData, deviceHistory }) => {
  if (!deviceData) return null;

  const latitude = deviceData['4198']?.value;
  const longitude = deviceData['4197']?.value;
  const zone = deviceData.zone;

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();
    const durationMs = end - start;
    const minutes = Math.floor(durationMs / 60000);
    return minutes;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-item">
        <h3>Latitude</h3>
        <p>{latitude ? latitude.toFixed(6) : 'N/A'}</p>
      </div>
      <div className="dashboard-item">
        <h3>Longitude</h3>
        <p>{longitude ? longitude.toFixed(6) : 'N/A'}</p>
      </div>
      <div className="dashboard-item">
        <h3>Current Zone</h3>
        <p>{zone || 'Unknown'}</p>
      </div>
      <div className="dashboard-item zone-history">
        <h3>Zone History</h3>
        <ul>
          {deviceHistory?.zoneHistory.map((entry, index, array) => (
            <li key={index}>
              {entry.zone} - {calculateDuration(entry.enteredAt, array[index + 1]?.enteredAt)} minutes
            </li>
          )).reverse()}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;