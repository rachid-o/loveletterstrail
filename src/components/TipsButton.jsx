import { useState } from "react";

const TIPS = [
  "Loop eerst 5–10 meter rond om het kompas te kalibreren.",
  "Gebruik Chrome voor de beste ervaring.",
  "Installeer de app via “Toevoegen aan beginscherm” voor volledig scherm zonder adresbalk.",
];

export default function TipsButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="tips-btn"
        onClick={() => setOpen(true)}
        title="Tips"
        aria-label="Tips tonen"
      >
        ?
      </button>

      {open && (
        <div className="confirm-overlay" onClick={() => setOpen(false)}>
          <div className="confirm-dialog tips-dialog" onClick={(e) => e.stopPropagation()}>
            <h3 className="tips-title">Tips</h3>
            <ul className="tips-list">
              {TIPS.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
            <button className="btn-secondary" onClick={() => setOpen(false)}>
              Sluiten
            </button>
          </div>
        </div>
      )}
    </>
  );
}
