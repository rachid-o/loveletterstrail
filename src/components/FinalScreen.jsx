import { useEffect } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { useCompass } from "../hooks/useCompass";
import { haversineDistance, calculateBearing, formatDistance } from "../utils/geo";
import { FINAL } from "../config/trail";

export default function FinalScreen({ arrived, onArrived }) {
  const { position, error: gpsError } = useGeolocation();
  const { heading, permissionNeeded, requestPermission } = useCompass();

  const distance = position
    ? haversineDistance(position.lat, position.lng, FINAL.lat, FINAL.lng)
    : null;

  const bearing = position
    ? calculateBearing(position.lat, position.lng, FINAL.lat, FINAL.lng)
    : null;

  const arrowRotation =
    bearing !== null && heading !== null ? bearing - heading : bearing ?? 0;

  useEffect(() => {
    if (!arrived && distance !== null && distance <= FINAL.arrivalRadius) {
      onArrived();
    }
  }, [distance, arrived, onArrived]);

  if (arrived) {
    return (
      <div className="screen final-arrived-screen">
        <div className="fireworks">🎉</div>
        <h1>{FINAL.title}</h1>
        <div className="final-message">
          {FINAL.message.split("\n").map((line, i) =>
            line ? <p key={i}>{line}</p> : <br key={i} />
          )}
        </div>
        <div className="final-hearts">❤️ ❤️ ❤️</div>
      </div>
    );
  }

  return (
    <div className="screen navigation-screen final-navigation">
      <div className="stop-badge finale">Finale</div>
      <h2>Jullie zijn er bijna!</h2>
      <p className="subtitle">Volg het kompas naar de verrassing</p>

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
    </div>
  );
}
