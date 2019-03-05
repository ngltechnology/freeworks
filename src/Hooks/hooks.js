import { useEffect, useState } from 'react';
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