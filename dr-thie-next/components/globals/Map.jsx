'use client'
import { useState, useEffect, useMemo } from 'react';
import { useLoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import Image from 'next/image';
import logo from '../../public/logos/logo-basic-transparent.png';

export default function Map({ clinicData }){
  const [google, setGoogle] = useState(null);
  const [location, setLocation] = useState(null);
  const address = `${clinicData.street_address}, ${clinicData.region}, ${clinicData.country}`;
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
    <div className="w-full h-full">
      { location && <GoogleMap 
        zoom={ 15 }
        center={ location }
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '100%', height: '100%' }}
      >
        <Marker position={ location }>
        </Marker>
        <InfoWindow position={ location } >
            <>
            <div className='storemapper-logo relative h-12 w-12'>
              <Image 
                src={ logo }
                alt="Dr. Ingrid Thie - Logo"
                fill= { true }
                style={{ objectFit: 'cover' }}
                sizes='100px'
              />
            </div>
            <p className="storemapper.popup-address">{ address }</p>
            <p className="storemapper.popup-phone">{ clinicData.phone_number }</p>
          </>
        </InfoWindow>
      </GoogleMap> }
    </div>
  );
};
 