import { useState, useEffect, useCallback } from "react";

export function useCompass() {
  const [heading, setHeading] = useState(null);
  const [permissionNeeded, setPermissionNeeded] = useState(false);
  const [error, setError] = useState(null);

  const handleOrientation = useCallback((event) => {
    if (event.webkitCompassHeading != null) {
      // iOS — absolute compass heading, 0 = north, clockwise
      setHeading(event.webkitCompassHeading);
    } else if (event.alpha != null) {
      // Android — alpha increases counter-clockwise, convert to clockwise compass
      setHeading((360 - event.alpha) % 360);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (typeof DeviceOrientationEvent?.requestPermission === "function") {
      try {
        const result = await DeviceOrientationEvent.requestPermission();
        if (result === "granted") {
          // iOS: no absolute event, use regular deviceorientation (has webkitCompassHeading)
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
      // iOS 13+ — needs explicit permission first
      setPermissionNeeded(true);
      return;
    }

    // Android Chrome 65+: deviceorientationabsolute gives true magnetic north heading.
    // Fall back to deviceorientation on older browsers.
    const eventName =
      "ondeviceorientationabsolute" in window
        ? "deviceorientationabsolute"
        : "deviceorientation";

    window.addEventListener(eventName, handleOrientation, true);
    return () => window.removeEventListener(eventName, handleOrientation, true);
  }, [handleOrientation]);

  return { heading, permissionNeeded, requestPermission, error };
}
