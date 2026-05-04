import { useState } from "react";
import { STOPS } from "../config/trail";

const TYPE_ICON = {
  riddle: "🧩",
  code: "🔢",
  memory: "💛",
};

export default function PuzzleScreen({ stopIndex, onSolved }) {
  const stop = STOPS[stopIndex];
  const { puzzle } = stop;
  const hints = puzzle.hints ?? (puzzle.hint ? [puzzle.hint] : []);

  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null); // "wrong" | null
  const [hintsShown, setHintsShown] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();
    if (trimmed === puzzle.answer.toLowerCase()) {
      setFeedback(null);
      onSolved();
    } else {
      setFeedback("wrong");
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

      <div className="hints-area">
        {hints.slice(0, hintsShown).map((text, i) => (
          <div className="hint-box" key={i}>
            <span className="hint-label">💡 Hint {hints.length > 1 ? i + 1 : ""}</span>
            <p>{text}</p>
          </div>
        ))}

        {hintsShown < hints.length && (
          <button
            className="btn-hint"
            onClick={() => setHintsShown((n) => n + 1)}
          >
            {hintsShown === 0 ? "💡 Hint tonen" : "💡 Nog een hint"}
          </button>
        )}
      </div>

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
        <p className="wrong-feedback">Helaas, dat is niet goed. Probeer het nog eens!</p>
      )}
    </div>
  );
}
