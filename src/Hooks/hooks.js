import { useEffect, useState, useRef } from 'react';
import GoogleMapsApiLoader from 'google-maps-api-loader';


//google mapsのオブジェクト呼び出し
export const useGoogleMap = (apikey) => {
    const [googleMap, setGoogleMap] = useState(null)
    useEffect(() => {
        GoogleMapsApiLoader({ apikey }).then((google) =>{
            setGoogleMap(google)
        })
    }, []) //useEffectの第二引数を[]とすることで、初回一回だけ実行される
    return googleMap
}

//実際にMapをDOMにマウントする処理
export const useMap = ({ googleMap, mapContainerRef, initialConfig }) => {
    const [map, setMap] = useState(null)
    useEffect(() => {
        //googleMapかmapContainerRefが初期化されていなければ何もしない
        if (!googleMap || !mapContainerRef.current) {
            return
        }
        const map = new googleMap.maps.Map(mapContainerRef.current, initialConfig)
        setMap(map)
    },
    //googleMapかmapContainerRefが変化したらeffectが発火する
    //initialConfigは変わったとしても再マウントするとへんなことになるから更新対象にしない
    [googleMap, mapContainerRef])

    //あとで使えるようにmapを返すようにする
    return map
}

// add hooks to add marker
export const useDrawMapMarkers = ({ markers, googleMap, map }) => {
    
    const markerObjectRef = useRef({})
    
    useEffect(() => {
        if (!googleMap || !map) {
            return
        }
        const { Marker } = googleMap.maps
        markers.map((position, i) => {
            if (markerObjectRef.current[i]) {
                return
            }
            const markerObj = new Marker({
                position,
                map,
                title: "marker!"
            })
            markerObjectRef.current[i] = markerObj
        })
    },[markers, googleMap, map])
}

// 3.markerをstate管理する
export const useMarkerState = (initialMarkers) => {
    const [markers, setMarkers] = useState(initialMarkers)
    const addMarker = ({ lat, lng }) => {
        setMarkers([...markers, { lat, lng }])
    }
    return { markers, addMarker }
}

// start Event clicked on Map
export const useMapClickEvent = ({ onClickMap, googleMap, map }) => {
    useEffect(() => {
        if (!googleMap || !map) {
            return
        }
        const listener = googleMap.maps.event.addListener(map, 'click', (e) => {
            onClickMap({
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            })
        })
        // Event is deleted if "onClickMap" changed.
        return () => {
            googleMap.maps.event.removeListener(listener)
        }
    },[googleMap, map, onClickMap])
} 