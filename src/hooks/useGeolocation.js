import { useState, useEffect, useRef } from "react";

export function useGeolocation() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("GPS wordt niet ondersteund op dit apparaat.");
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setError(null);
      },
      (err) => {
        if (err.code === 1) setError("GPS-toegang geweigerd. Sta locatietoegang toe in je instellingen.");
        else setError("Kan locatie niet bepalen. Zorg dat GPS aanstaat.");
      },
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 }
    );

    return () => {
      if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, []);

  return { position, error };
}
