import React from "react";
import { NumberSecret } from "./NumberSecret";
import { GenericContract } from "~~/utils/scaffold-eth/contract";

interface GameProps {
  gameId: number;
  game: bigint[];
  oneNumberContract: GenericContract;
  isBlindedNumberExist: boolean;
}

export const Reveal = ({ gameId, game, oneNumberContract, isBlindedNumberExist }: GameProps) => {
  if (!gameId || !game) {
    return <></>;
  }

  if (!isBlindedNumberExist) {
    return <>{"You haven't submitted a number"}</>;
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
    />
  );
};
