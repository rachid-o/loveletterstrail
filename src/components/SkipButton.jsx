export default function SkipButton({ onSkip }) {
  return (
    <button
      className="skip-btn"
      onClick={onSkip}
      title="Locatie overslaan (test)"
      aria-label="Locatie overslaan"
    >
      ⏭
    </button>
  );
}
