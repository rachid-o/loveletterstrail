import { useCallback } from "react";
import { useProgress } from "./hooks/useProgress";
import PinScreen from "./components/PinScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import NavigationScreen from "./components/NavigationScreen";
import PuzzleScreen from "./components/PuzzleScreen";
import StopCompleteScreen from "./components/StopCompleteScreen";
import FinalScreen from "./components/FinalScreen";
import { STOPS } from "./config/trail";

export default function App() {
  const { progress, update } = useProgress();
  const { screen, currentStopIndex, wrongAttempts, finalArrived } = progress;

  const handlePinSuccess = useCallback(() => {
    update({ pinVerified: true, screen: "welcome" });
  }, [update]);

  const handleStart = useCallback(() => {
    update({ welcomeSeen: true, screen: "navigate" });
  }, [update]);

  const handleArrived = useCallback(() => {
    update({ screen: "puzzle" });
  }, [update]);

  const handleSolved = useCallback(() => {
    update({ screen: "stopComplete" });
  }, [update]);

  const handleWrongAttempt = useCallback((stopIndex) => {
    update({
      wrongAttempts: {
        ...wrongAttempts,
        [stopIndex]: (wrongAttempts[stopIndex] ?? 0) + 1,
      },
    });
  }, [update, wrongAttempts]);

  const handleNextStop = useCallback(() => {
    const nextIndex = currentStopIndex + 1;
    if (nextIndex >= STOPS.length) {
      update({ screen: "final" });
    } else {
      update({ currentStopIndex: nextIndex, screen: "navigate" });
    }
  }, [update, currentStopIndex]);

  const handleFinalArrived = useCallback(() => {
    update({ finalArrived: true });
  }, [update]);

  if (screen === "pin") return <PinScreen onSuccess={handlePinSuccess} />;
  if (screen === "welcome") return <WelcomeScreen onStart={handleStart} />;
  if (screen === "navigate")
    return (
      <NavigationScreen
        stopIndex={currentStopIndex}
        onArrived={handleArrived}
      />
    );
  if (screen === "puzzle")
    return (
      <PuzzleScreen
        stopIndex={currentStopIndex}
        wrongAttempts={wrongAttempts}
        onSolved={handleSolved}
        onWrongAttempt={handleWrongAttempt}
      />
    );
  if (screen === "stopComplete")
    return (
      <StopCompleteScreen
        stopIndex={currentStopIndex}
        onNext={handleNextStop}
      />
    );
  if (screen === "final")
    return (
      <FinalScreen
        arrived={!!finalArrived}
        onArrived={handleFinalArrived}
      />
    );

  return null;
}
