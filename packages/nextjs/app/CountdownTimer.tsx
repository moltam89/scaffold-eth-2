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
      passedTimeAction();
    }
    if (distance > 0) {
      setTimeLeft(Math.floor(distance / 1000));
    }
  }, 100);

  const formatTimeLeft = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}h ${minutes < 10 ? "0" : ""}${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;
  };

  //   return (
  //     <div className="my-10">
  //       {text} {formatTimeLeft(timeLeft)}
  //     </div>
  //   );
  // };
  //   const minutes = Math.floor(time / 60);
  //   const seconds = time % 60;
  //   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  // };

  return (
    <div className="my-10">
      {text} {formatTimeLeft(timeLeft)}
    </div>
  );
};
