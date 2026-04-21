import { useState } from "react";
import { PIN } from "../config/trail";

export default function PinScreen({ onSuccess }) {
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);

  function handleDigit(d) {
    const next = input + d;
    if (next.length < PIN.length) {
      setInput(next);
    } else if (next.length === PIN.length) {
      if (next === PIN) {
        onSuccess();
      } else {
        setShake(true);
        setTimeout(() => {
          setInput("");
          setShake(false);
        }, 600);
      }
    }
  }

  function handleDelete() {
    setInput((prev) => prev.slice(0, -1));
  }

  const dots = Array.from({ length: PIN.length }, (_, i) => i);

  return (
    <div className="screen pin-screen">
      <div className="pin-header">
        <div className="compass-icon">🗝️</div>
        <h1>Love Letters Trail</h1>
        <p>Voer de PIN-code in</p>
      </div>

      <div className={`pin-dots ${shake ? "shake" : ""}`}>
        {dots.map((i) => (
          <div key={i} className={`dot ${i < input.length ? "filled" : ""}`} />
        ))}
      </div>

      <div className="pin-pad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <button key={d} className="pin-btn" onClick={() => handleDigit(String(d))}>
            {d}
          </button>
        ))}
        <div />
        <button className="pin-btn" onClick={() => handleDigit("0")}>0</button>
        <button className="pin-btn delete-btn" onClick={handleDelete}>⌫</button>
      </div>
    </div>
  );
}
