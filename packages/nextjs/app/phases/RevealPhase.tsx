import React from "react";

interface RevealPhaseProps {
  selectedNumber: number;
  nextPhase: () => void;
}

export const RevealPhase = ({ selectedNumber }: RevealPhaseProps) => {
  return (
    <div className="my-10">
      <h3 className="text-center text-2xl font-bold">Reveal Phase</h3>
      <p className="text-center text-xl">Now sign the transaction to reveal your number.</p>
      <p className="text-center text-xl">
        Your Number: <span className="text-2xl font-bold">{selectedNumber}</span>
      </p>
    </div>
  );
};
