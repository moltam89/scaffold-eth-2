import { useState } from "react";
import { useInterval } from "usehooks-ts";

interface CountdownTimerProps {
  endTime: number;
  text?: string;
  passedTimeAction: () => void;
}

export const CountdownTimer = ({ endTime, text = "Time left:", passedTimeAction }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  useInterval(() => {
    const now = new Date().getTime();
    const distance = endTime - now;
    if (distance < 0) {
      console.log(passedTimeAction);
      passedTimeAction();
    }
    setTimeLeft(Math.floor(distance / 1000));
  }, 100);

  return (
    <div className="my-10">
      {text} {timeLeft}
    </div>
  );
};
