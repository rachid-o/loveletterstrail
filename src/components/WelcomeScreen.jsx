import { WELCOME, STOPS } from "../config/trail";

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="screen welcome-screen">
      {WELCOME.photo && (
        <div className="welcome-photo">
          <img src={WELCOME.photo} alt="Jullie foto" />
        </div>
      )}

      {!WELCOME.photo && (
        <div className="welcome-icon">🗺️</div>
      )}

      <h1>{WELCOME.title}</h1>

      <div className="welcome-message">
        {WELCOME.message.split("\n").map((line, i) =>
          line ? <p key={i}>{line}</p> : <br key={i} />
        )}
      </div>

      <div className="stop-count">
        <span className="badge">{STOPS.length} stops</span>
        <span className="badge">GPS-tocht</span>
      </div>

      <button className="btn-primary" onClick={onStart}>
        Start het avontuur →
      </button>
    </div>
  );
}
