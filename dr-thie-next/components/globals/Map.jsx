import { useState, useEffect, useMemo } from 'react';
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";

export default function Map(){
  const [google, setGoogle] = useState(null);
  const [location, setLocation] = useState(null);
  const address = '390 Commissioners Rd W Suite 101, London, ON N6J 1Y3'
  const libraries = useMemo(()=>['places'], []);

  const isLoaded = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries: libraries,
  })

  useEffect(()=>{
    if (window.google && !google){
      setGoogle(window.google)
    }
    if (google && !location){
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({address: address}, (results, status)=> {
        if (status == google.maps.GeocoderStatus.OK){
          setLocation({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          })
        }
      })
    }
  },[isLoaded, google, location])


  return (
    <div className="relative w-full h-72 my-4 sm:w-3/6 sm:h-6/6 lg:w-4/6 justify-self-end rounded-lg overflow-hidden">
      { google && <GoogleMap 
        // options={ mapOptions }
        zoom={ 15 }
        center={ location }
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        onLoad={() => console.log('Map Component Loaded...')}
      >
        <Marker position={ location }/>
      </GoogleMap> }
    </div>
  );
};
 