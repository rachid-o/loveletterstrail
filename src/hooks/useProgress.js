import { useState, useCallback } from "react";

const STORAGE_KEY = "llt_progress";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function useProgress() {
  const [progress, setProgressState] = useState(() => {
    return (
      loadProgress() || {
        pinVerified: false,
        welcomeSeen: false,
        currentStopIndex: 0,
        screen: "pin", // pin | welcome | navigate | puzzle | stopComplete | final | finalArrived
        wrongAttempts: {},
        finished: false,
      }
    );
  });

  const update = useCallback((patch) => {
    setProgressState((prev) => {
      const next = { ...prev, ...patch };
      saveProgress(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgressState({
      pinVerified: false,
      welcomeSeen: false,
      currentStopIndex: 0,
      screen: "pin",
      wrongAttempts: {},
      finished: false,
    });
  }, []);

  return { progress, update, reset };
}
