import React, { useState, useEffect } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import { ref, onValue } from 'firebase/database';
import { db } from './firebase';
import 'mapbox-gl/dist/mapbox-gl.css';

// Default to San Francisco
const DEFAULT_VIEW_STATE = {
  latitude: 37.7749,
  longitude: -122.4194,
  zoom: 14
};

function App() {
  const [viewState, setViewState] = useState(DEFAULT_VIEW_STATE);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Listen for location updates
    const locationRef = ref(db, 'locations/device_1');
    const unsubscribe = onValue(locationRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Location update:", data);
      if (data) {
        setLocation(data);
        // Optionally auto-center map
        setViewState((prev) => ({
          ...prev,
          latitude: data.latitude,
          longitude: data.longitude
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

  if (!MAPBOX_TOKEN || MAPBOX_TOKEN === 'YOUR_MAPBOX_ACCESS_TOKEN') {
    return (
      <div style={{ padding: 20 }}>
        <h1>Configuration Required</h1>
        <p>Please set <code>VITE_MAPBOX_TOKEN</code> in <code>frontend/.env</code>.</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {location && (
          <Marker
            latitude={location.latitude}
            longitude={location.longitude}
            color="red"
          />
        )}
      </Map>

      <div style={{ position: 'absolute', top: 10, left: 10, background: 'white', padding: 10, borderRadius: 5, zIndex: 1 }}>
        <h3>Device Tracker</h3>
        {location ? (
          <div>
            <p>Lat: {location.latitude.toFixed(6)}</p>
            <p>Lon: {location.longitude.toFixed(6)}</p>
            <p>Last Update: {new Date(location.timestamp * 1000).toLocaleTimeString()}</p>
          </div>
        ) : (
          <p>Waiting for data...</p>
        )}
      </div>
    </div>
  );
}

export default App;
