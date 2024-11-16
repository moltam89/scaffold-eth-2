import React, { useEffect, useState } from "react";
import { IntentTimestampAmount } from "~~/types/types";

interface TimeDisplayProps {
  setCurrentTime: (time: number) => void;
  requiredAmounts: IntentTimestampAmount[];
}

const TimeDisplay = ({ requiredAmounts, setCurrentTime }: TimeDisplayProps) => {
  // Extract timestamps from IntentTimestampValue array
  const keys = requiredAmounts.map(([timestamp]) => timestamp);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update the current time whenever currentIndex changes
  useEffect(() => {
    setCurrentTime(keys[currentIndex]);
  }, [currentIndex, keys, setCurrentTime]);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1 < keys.length ? prev + 1 : prev));
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Previous Button */}
      <button onClick={handlePrevious} className="btn btn-outline btn-primary" disabled={currentIndex === 0}>
        {"<<"}
      </button>

      {/* Time Display */}
      <div className="text-xl font-bold">{new Date(keys[currentIndex] * 1000).toLocaleTimeString("en-GB")}</div>

      {/* Next Button */}
      <button onClick={handleNext} className="btn btn-outline btn-primary" disabled={currentIndex === keys.length - 1}>
        {">>"}
      </button>
    </div>
  );
};

export default TimeDisplay;
