import { useEffect } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { useCompass } from "../hooks/useCompass";
import { haversineDistance, calculateBearing, formatDistance } from "../utils/geo";
import { STOPS } from "../config/trail";

export default function NavigationScreen({ stopIndex, onArrived }) {
  const stop = STOPS[stopIndex];
  const { position, error: gpsError } = useGeolocation();
  const { heading, permissionNeeded, requestPermission } = useCompass();

  const distance = position
    ? haversineDistance(position.lat, position.lng, stop.lat, stop.lng)
    : null;

  const bearing = position
    ? calculateBearing(position.lat, position.lng, stop.lat, stop.lng)
    : null;

  // Pijlrotatie relatief aan device-richting
  const arrowRotation =
    bearing !== null && heading !== null ? bearing - heading : bearing ?? 0;

  useEffect(() => {
    if (distance !== null && distance <= stop.arrivalRadius) {
      onArrived();
    }
  }, [distance, stop.arrivalRadius, onArrived]);

  return (
    <div className="screen navigation-screen">
      <div className="stop-badge">
        Stop {stopIndex + 1} / {STOPS.length}
      </div>

      <h2>Volg het kompas</h2>

      {permissionNeeded && (
        <button className="btn-secondary" onClick={requestPermission}>
          Activeer kompas
        </button>
      )}

      <div className="compass-container">
        <div
          className="compass-arrow"
          style={{ transform: `rotate(${arrowRotation}deg)` }}
        >
          <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,5 15,145 50,115 85,145" fill="#d4a017" />
          </svg>
        </div>
      </div>

      <div className="distance-display">
        {gpsError ? (
          <p className="error-text">{gpsError}</p>
        ) : distance !== null ? (
          <>
            <span className="distance-value">{formatDistance(distance)}</span>
            <span className="distance-label">nog te gaan</span>
          </>
        ) : (
          <p className="loading-text">GPS bepalen…</p>
        )}
      </div>

      <p className="nav-hint">
        Houd je telefoon horizontaal voor het beste kompas-resultaat.
      </p>
    </div>
  );
}
