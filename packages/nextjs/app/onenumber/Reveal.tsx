import React from "react";
import { NumberSecret } from "./NumberSecret";
import { GenericContract } from "~~/utils/scaffold-eth/contract";

interface GameProps {
  gameId: number;
  game: bigint[];
  oneNumberContract: GenericContract;
  isBlindedNumberExist: boolean;
  isRevealedNumberExist: boolean;
  setRevealedNumberExists: (type: boolean) => void;
}

export const Reveal = ({
  gameId,
  game,
  oneNumberContract,
  isBlindedNumberExist,
  isRevealedNumberExist,
  setRevealedNumberExists,
}: GameProps) => {
  if (!gameId || !game) {
    return <></>;
  }

  if (!isBlindedNumberExist) {
    return <>{"You haven't submitted a number"}</>;
  }

  if (!isRevealedNumberExist) {
    return <>{"You have revealed your number"}</>;
  }

  return (
    <NumberSecret
      gameId={gameId}
      game={game}
      oneNumberContract={oneNumberContract}
      isBiddingPhase={false}
      setBlindedNumberExists={bool => {
        console.log(bool);
      }}
      setRevealedNumberExists={setRevealedNumberExists}
    />
  );
};
