// src/App.jsx
import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { trucks } from './routesData';

const defaultCenter = { lat: 33.7488, lng: -84.3877 }; // Atlanta as example

// Fix: Define a default marker icon (so it works with bundlers like Vite)
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function App() {
  const [selectedTruckId, setSelectedTruckId] = useState(null);

  const visibleTrucks = useMemo(() => {
    if (!selectedTruckId) return trucks;
    return trucks.filter((t) => t.id === selectedTruckId);
  }, [selectedTruckId]);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* LEFT: Map */}
      <div style={{ flex: 1 }}>
        <MapContainer
          center={defaultCenter}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {visibleTrucks.map((truck) => {
            const positions = truck.route.map((p) => [p.lat, p.lng]);
            const start = truck.route[0];
            const end = truck.route[truck.route.length - 1];

            return (
              <React.Fragment key={truck.id}>
                {/* Route line */}
                <Polyline
                  positions={positions}
                  pathOptions={{ color: truck.color, weight: 5 }}
                />

                {/* Start marker */}
                <Marker position={[start.lat, start.lng]} icon={defaultIcon}>
                  <Popup>
                    <strong>{truck.name}</strong>
                    <br />
                    Start of route
                  </Popup>
                </Marker>

                {/* End marker */}
                <Marker position={[end.lat, end.lng]} icon={defaultIcon}>
                  <Popup>
                    <strong>{truck.name}</strong>
                    <br />
                    End of route
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>

      {/* RIGHT: Sidebar */}
      <div
        style={{
          width: 280,
          padding: 16,
          backgroundColor: '#111827',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2 style={{ margin: 0, marginBottom: 8 }}>Fleet Routes</h2>
        <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 16 }}>
          Select a truck to focus on its route, or show all.
        </p>

        {/* Filter buttons */}
        <div style={{ marginBottom: 16 }}>
          <button
            onClick={() => setSelectedTruckId(null)}
            style={{
              padding: '8px 12px',
              marginRight: 8,
              marginBottom: 8,
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              backgroundColor: selectedTruckId ? '#374151' : '#10b981',
              color: 'white',
            }}
          >
            All trucks
          </button>

          {trucks.map((truck) => (
            <button
              key={truck.id}
              onClick={() =>
                setSelectedTruckId(
                  selectedTruckId === truck.id ? null : truck.id
                )
              }
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '8px 12px',
                marginRight: 8,
                marginBottom: 8,
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                backgroundColor:
                  selectedTruckId === truck.id ? truck.color : '#374151',
                color: 'white',
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  backgroundColor: truck.color,
                  marginRight: 6,
                  border: '1px solid rgba(0,0,0,0.4)',
                }}
              />
              {truck.id}
            </button>
          ))}
        </div>

        {/* Truck info list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {trucks.map((truck) => (
            <div
              key={truck.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 4,
                  marginRight: 10,
                  backgroundColor: truck.color,
                }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{truck.id}</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>{truck.name}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, opacity: 0.6, marginTop: 8 }}>
          Ready to embed in Fire TV WebView:
          <br />
          <code>https://your-server.com</code>
        </div>
      </div>
    </div>
  );
}

export default App;

