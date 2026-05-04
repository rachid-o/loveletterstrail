import { useCallback, useEffect } from "react";
import { useWakeLock } from "./hooks/useWakeLock";
import { useProgress } from "./hooks/useProgress";
import PinScreen from "./components/PinScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import NavigationScreen from "./components/NavigationScreen";
import PuzzleScreen from "./components/PuzzleScreen";
import StopCompleteScreen from "./components/StopCompleteScreen";
import FinalScreen from "./components/FinalScreen";
import RefreshButton from "./components/RefreshButton";
import ResetButton from "./components/ResetButton";
import SkipButton from "./components/SkipButton";
import TipsButton from "./components/TipsButton";
import { STOPS, DEBUG_MODE } from "./config/trail";

export default function App() {
  useWakeLock();
  const { progress, update } = useProgress();
  const { screen, currentStopIndex, finalArrived } = progress;

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

  useEffect(() => {
    const stopScreens = ["navigate", "puzzle", "stopComplete"];
    if (stopScreens.includes(screen) && currentStopIndex >= STOPS.length) {
      update({ screen: "final" });
    }
  }, [screen, currentStopIndex, update]);

  const validStop = currentStopIndex < STOPS.length;

  let content = null;
  if (screen === "pin") content = <PinScreen onSuccess={handlePinSuccess} />;
  else if (screen === "welcome") content = <WelcomeScreen onStart={handleStart} />;
  else if (screen === "navigate" && validStop)
    content = <NavigationScreen stopIndex={currentStopIndex} onArrived={handleArrived} />;
  else if (screen === "puzzle" && validStop)
    content = (
      <PuzzleScreen
        stopIndex={currentStopIndex}
        onSolved={handleSolved}
      />
    );
  else if (screen === "stopComplete" && validStop)
    content = <StopCompleteScreen stopIndex={currentStopIndex} onNext={handleNextStop} />;
  else if (screen === "final")
    content = <FinalScreen arrived={!!finalArrived} onArrived={handleFinalArrived} />;

  const showSkip = DEBUG_MODE && (screen === "navigate" || screen === "final");

  return (
    <>
      <RefreshButton />
      <ResetButton />
      <TipsButton />
      {showSkip && (
        <SkipButton
          onSkip={screen === "navigate" ? handleNextStop : handleFinalArrived}
        />
      )}
      {content}
    </>
  );
}
