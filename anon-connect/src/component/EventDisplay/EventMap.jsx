/* global google */
import React, { useEffect, useState, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const EventMap = ({ eventsList }) => {
  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); // State to check if map is loaded
  const loaderRef = useRef(null); // Ref to store loader instance

  useEffect(() => {
    // If the loader has already been initialized, do nothing
    if (loaderRef.current) return;

    loaderRef.current = new Loader({
      apiKey: 'AIzaSyAI9qIEtiKAunSO0KOX7TNvKUdQOAyHxd8', // Replace with your valid API Key
      version: 'weekly',
      libraries: ['maps', 'marker'], // Specify libraries once
    });

    loaderRef.current.load().then(() => {
      // Once the Google Maps API is loaded, initialize map
      const mapInstance = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7128, lng: -74.0060 }, // Default to NYC for example, adjust if needed
        zoom: 10,
      });
      setMap(mapInstance);

      // Create LatLngBounds object to adjust bounds dynamically
      const bounds = new google.maps.LatLngBounds();

      // Check if eventsList is an array (for multiple events) or a single event
      const eventArray = Array.isArray(eventsList) ? eventsList : [eventsList];

      eventArray.forEach((event) => {
        const marker = new google.maps.Marker({
          position: event.coordinates,
          map: mapInstance,
          title: event.name,
        });
        bounds.extend(event.coordinates);
      });

      // Fit map bounds to markers
      mapInstance.fitBounds(bounds);
      setIsLoaded(true); // Mark map as loaded
    }).catch((error) => {
      console.error('Google Maps API error', error);
    });

    return () => {
      setIsLoaded(false); // Cleanup when component unmounts
    };
  }, [eventsList]); // Rerun when eventsList changes

  return (
    <div className="map-container" style={{ height: '400px', width: '100%' }}>
      <div id="map" style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default EventMap;
