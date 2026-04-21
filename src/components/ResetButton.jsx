import { useState } from "react";

export default function ResetButton() {
  const [confirming, setConfirming] = useState(false);

  function handleReset() {
    localStorage.clear();
    window.location.reload(true);
  }

  return (
    <>
      <button
        className="reset-btn"
        onClick={() => setConfirming(true)}
        title="Opnieuw beginnen"
        aria-label="Opnieuw beginnen"
      >
        ✕
      </button>

      {confirming && (
        <div className="confirm-overlay" onClick={() => setConfirming(false)}>
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <p>Alle voortgang wissen en opnieuw beginnen?</p>
            <div className="confirm-actions">
              <button className="btn-secondary" onClick={() => setConfirming(false)}>
                Annuleren
              </button>
              <button className="btn-danger" onClick={handleReset}>
                Ja, opnieuw
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
