import { useState } from "react";
import { STOPS } from "../config/trail";

const HINT_AFTER = 3;

const TYPE_ICON = {
  riddle: "🧩",
  code: "🔢",
  memory: "💛",
};

export default function PuzzleScreen({ stopIndex, wrongAttempts, onSolved, onWrongAttempt }) {
  const stop = STOPS[stopIndex];
  const { puzzle } = stop;
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null); // "wrong" | null

  const attempts = wrongAttempts[stopIndex] ?? 0;
  const showHint = attempts >= HINT_AFTER;

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();
    if (trimmed === puzzle.answer.toLowerCase()) {
      setFeedback(null);
      onSolved();
    } else {
      setFeedback("wrong");
      onWrongAttempt(stopIndex);
      setInput("");
      setTimeout(() => setFeedback(null), 1500);
    }
  }

  return (
    <div className="screen puzzle-screen">
      <div className="stop-badge">
        Stop {stopIndex + 1} / {STOPS.length}
      </div>

      <div className="puzzle-type-icon">{TYPE_ICON[puzzle.type] ?? "❓"}</div>

      <div className="puzzle-box">
        <p className="puzzle-question">{puzzle.question}</p>
      </div>

      {showHint && (
        <div className="hint-box">
          <span className="hint-label">💡 Hint</span>
          <p>{puzzle.hint}</p>
        </div>
      )}

      <form className="answer-form" onSubmit={handleSubmit}>
        <input
          className={`answer-input ${feedback === "wrong" ? "input-wrong" : ""}`}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Jouw antwoord…"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
        <button className="btn-primary" type="submit" disabled={!input.trim()}>
          Controleer →
        </button>
      </form>

      {feedback === "wrong" && (
        <p className="wrong-feedback">
          Helaas, dat is niet goed. Probeer het nog eens!
          {!showHint && attempts + 1 >= HINT_AFTER && (
            <> Nog één poging en dan krijgen jullie een hint.</>
          )}
        </p>
      )}
    </div>
  );
}
