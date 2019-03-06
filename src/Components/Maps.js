import React, { useRef } from 'react';
import { useGoogleMap, useMap, useDrawMapMarkers, useMarkerState, useMapClickEvent } from '../Hooks/hooks';


const API_KEY = undefined;

const initialConfig = {
    zoom: 12,
    center: { lat: 35.6432027, lng: 139.6729435 }
};

const initialMarkers = [
    //ここにfirestoreからとってくればよさそう
    { lat: 35.6432027, lng: 139.6729435 },
    { lat: 35.5279833, lng: 139.6989209 },
    { lat: 35.6563623, lng: 139.7215211 },
    { lat: 35.6167531, lng: 139.5469376 },
    { lat: 35.6950961, lng: 139.5037899 }
  ]

export const MapApp = () => {

    const googleMap = useGoogleMap(API_KEY);
    const mapContainerRef = useRef(null);
    const map = useMap({ googleMap, mapContainerRef, initialConfig });

    const { markers, addMarker } = useMarkerState(initialMarkers)

    useDrawMapMarkers({ markers, googleMap, map })

    useMapClickEvent({
        onClickMap: ({ lat, lng }) => {
            addMarker({ lat, lng })
        },
        map,
        googleMap
    })

    return (
        <div
            style={{ height: "100vh", width: "100%" }}
            ref={mapContainerRef}
        />            
    );
};
