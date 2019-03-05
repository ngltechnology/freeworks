import React, { useRef } from 'react';
import { useGoogleMap, useMap } from '../Hooks/hooks';


const API_KEY = undefined;

const initialConfig = {
    zoom: 12,
    center: { lat: 35.6432027, lng: 139.6729435 }
};

export const MapApp = () => {
    const googleMap = useGoogleMap(API_KEY);
    const mapContainerRef = useRef(null);
    useMap({ googleMap, mapContainerRef, initialConfig });
    return (
        <div
            style={{ height: "100vh", width: "100%" }}
            ref={mapContainerRef}
        />            
    );
};
