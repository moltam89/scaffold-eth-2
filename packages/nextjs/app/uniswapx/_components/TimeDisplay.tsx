"use client";

import React, { useMemo } from "react";
import { IntentTimestampAmount } from "~~/types/types";

interface TimeDisplayProps {
  currentTime: number;
  setCurrentTime: (time: number) => void;
  fillTime: number;
  requiredAmounts: IntentTimestampAmount[];
}

const TimeDisplay = ({ currentTime, setCurrentTime, requiredAmounts, fillTime }: TimeDisplayProps) => {
  // Extract timestamps from IntentTimestampValue array
  const keys = useMemo(() => requiredAmounts.map(([timestamp]) => timestamp), [requiredAmounts]);

  // Find the current index dynamically
  const currentIndex = keys.indexOf(currentTime);

  const handleNext = () => {
    if (currentIndex < keys.length - 1) {
      setCurrentTime(keys[currentIndex + 1]); // Move to the next timestamp
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentTime(keys[currentIndex - 1]); // Move to the previous timestamp
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        className="btn btn-outline btn-primary"
        disabled={currentIndex === 0 || fillTime != 0}
      >
        {"<<"}
      </button>

      {/* Time Display */}
      <div className="text-xl font-bold">{new Date(currentTime * 1000).toLocaleTimeString("en-GB")}</div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="btn btn-outline btn-primary"
        disabled={currentIndex === keys.length - 1 || fillTime != 0}
      >
        {">>"}
      </button>
    </div>
  );
};

export default TimeDisplay;
