import React, { useState } from "react";
import { CountdownTimer } from "~~/app/CountdownTimer";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface RevealPhaseProps {
  gameId: bigint;
  selectedNumber: number;
  secret: string;
  endTime: number;
  nextPhase: () => void;
}

export const RevealPhase = ({ gameId, selectedNumber, secret, endTime, nextPhase }: RevealPhaseProps) => {
  const [numberRevealed, setNumberRevealed] = useState<boolean>(false);

  const { writeAsync: revealNumber } = useScaffoldContractWrite({
    contractName: "OneNumber",
    functionName: "revealNumber",
    args: [gameId, BigInt(selectedNumber), secret as `0x${string}`],
    onBlockConfirmation: async receipt => {
      console.log("receipt", receipt);
      setNumberRevealed(true);
    },
  });

  const timeUpCheckActionCompleted = () => {
    if (numberRevealed) {
      nextPhase();
    }
  };
  return (
    <div className="my-10">
      <CountdownTimer endTime={endTime} passedTimeAction={timeUpCheckActionCompleted} />
      <h3 className="text-center text-2xl font-bold">Reveal Phase</h3>
      <p className="text-center text-xl">Now sign the transaction to reveal your number.</p>
      <p className="text-center text-xl">
        Your Number: <span className="text-2xl font-bold">{selectedNumber}</span>
      </p>
      <button className="btn btn-primary" onClick={async () => await revealNumber()}>
        Reveal your number
      </button>
    </div>
  );
};
