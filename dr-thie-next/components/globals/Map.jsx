import { useState, useEffect, useMemo } from 'react';
import { useLoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import Image from 'next/image';
import logo from '../../public/logos/logo-basic-transparent.png';

export default function Map(){
  const [google, setGoogle] = useState(null);
  const [location, setLocation] = useState(null);
  const address = '390 Commissioners Rd W Suite 101, London, ON N6J 1Y3';
  const libraries = useMemo(()=>['places'], []);

  const isLoaded = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries: libraries,
  });

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
          });
        }
      });
    }
  },[isLoaded, google, location]);


  return (
    <div className="relative w-full h-72 my-4 sm:w-3/6 sm:h-6/6 lg:w-4/6 justify-self-end rounded-lg overflow-hidden">
      { location && <GoogleMap 
        zoom={ 15 }
        center={ location }
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '100%', height: '100%' }}
      >
        <Marker position={ location }>
        </Marker>
        <InfoWindow position={ location }>
          <div className='flex items-center'>
            <div className='relative h-16 w-16 me-2'>
              <Image 
                src={ logo }
                fill= { true }
                style={{ objectFit: 'cover' }}
                sizes='100px'
              />
            </div>
            <div>
              <h4 className='text-lg font-medium'>Dr. Ingrid Thie</h4>
              <h5 className='text-lg'>Family Dentist</h5>
            </div>
          </div>
        </InfoWindow>
      </GoogleMap> }
    </div>
  );
};
 