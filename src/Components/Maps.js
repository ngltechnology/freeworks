import React, { useRef } from 'react';
import { useGoogleMap, useMap, useDrawMapMarkers, useMarkerState, useMapClickEvent } from '../Hooks/hooks';

import CardApp from './Card';

require('dotenv').config();
const API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const initialConfig = {
    zoom: 12,
    center: { lat: 35.6432027, lng: 139.6729435 },
    gestureHandling: 'greedy',
    disableDefaultUI: true,
    // zoomControl: {
    //     position: google.maps.ControlPosition.RIGHT_CENTER,
    // }
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
    const items = [1,2,3,4]

    return (
        <div className="MapApp">
            <div
                className="Map"
                ref={mapContainerRef}
            />
            <ul className="lists">
                {items.map((item,index) => 
                    <li key={index} className="list">
                        {index}.item:{item}
                    </li>
                )}
            </ul>
        </div>            
    );
};
