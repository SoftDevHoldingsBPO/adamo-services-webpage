"use client";

import { useEffect, useState } from "react";

export type CountdownTextProps = {
  text: string | ((timeLeft: string) => React.ReactNode);
  initialSeconds: number;
  completedText: string | (() => React.ReactNode);
  onComplete?: () => void;
  onCompletedClick?: () => void;
};

export default function CountdownText({
  text,
  initialSeconds,
  completedText,
  onComplete,
  onCompletedClick,
}: CountdownTextProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCompletedClick = () => {
    if (onCompletedClick) onCompletedClick();

    setSeconds(initialSeconds);

    setIsCompleted(false);
  };

  useEffect(() => {
    if (seconds <= 0) {
      setIsCompleted(true);

      if (onComplete) onComplete();

      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsCompleted(true);

          if (onComplete) onComplete();

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onComplete]);

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);

    const remainingSeconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const renderText = () => {
    if (typeof text === "function") {
      return text(formatTime(seconds));
    }

    return `${text} ${formatTime(seconds)}`;
  };

  const renderCompletedText = () => {
    if (typeof completedText === "function") {
      return completedText();
    }

    return completedText;
  };

  if (isCompleted) {
    return (
      <button
        onClick={handleCompletedClick}
        className="text-sm text-neutral-700 font-semibold"
      >
        {renderCompletedText()}
      </button>
    );
  }

  return <p className="text-sm text-neutral-500">{renderText()}</p>;
}
