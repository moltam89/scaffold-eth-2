import React from "react";

interface EndGamePhaseProps {
  selectedNumber: number;
}

export const EndGamePhase = ({ selectedNumber }: EndGamePhaseProps) => {
  return (
    <div className="my-10">
      <h3 className="text-center text-2xl font-bold">End Game Phase</h3>
      <p className="text-center text-xl">You lose or you win</p>
      <p className="text-center text-xl">
        Your Number: <span className="text-2xl font-bold">{selectedNumber}</span>
      </p>
    </div>
  );
};
