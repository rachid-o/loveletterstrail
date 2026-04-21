import { useState, useEffect, useCallback } from "react";

export function useCompass() {
  const [heading, setHeading] = useState(null);
  const [permissionNeeded, setPermissionNeeded] = useState(false);
  const [error, setError] = useState(null);

  const handleOrientation = useCallback((event) => {
    // webkitCompassHeading = iOS absolute heading; alpha = other browsers
    if (event.webkitCompassHeading !== undefined) {
      setHeading(event.webkitCompassHeading);
    } else if (event.absolute && event.alpha !== null) {
      setHeading((360 - event.alpha) % 360);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (typeof DeviceOrientationEvent?.requestPermission === "function") {
      try {
        const result = await DeviceOrientationEvent.requestPermission();
        if (result === "granted") {
          window.addEventListener("deviceorientation", handleOrientation, true);
          setPermissionNeeded(false);
        } else {
          setError("Kompas-toegang geweigerd.");
        }
      } catch {
        setError("Kon kompas niet activeren.");
      }
    }
  }, [handleOrientation]);

  useEffect(() => {
    if (typeof DeviceOrientationEvent?.requestPermission === "function") {
      // iOS 13+ requires explicit permission
      setPermissionNeeded(true);
    } else if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, [handleOrientation]);

  return { heading, permissionNeeded, requestPermission, error };
}
