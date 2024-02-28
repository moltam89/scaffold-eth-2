import React from "react";
import { BLIND_DURATION_INDEX, START_INDEX } from "./Game";
import { NumberSecret } from "./NumberSecret";
import { GenericContract } from "~~/utils/scaffold-eth/contract";

interface GameProps {
  gameId: number;
  game: bigint[];
  oneNumberContract: GenericContract;
}

export const Bidding = ({ gameId, game, oneNumberContract }: GameProps) => {
  if (!gameId || !game) {
    return <></>;
  }

  const currentTimeStamp = Math.floor(new Date().getTime() / 1000);
  const isBiddingPhase = currentTimeStamp < game[START_INDEX] + game[BLIND_DURATION_INDEX];

  if (!isBiddingPhase) {
    return <></>;
  }

  return <NumberSecret gameId={gameId} game={game} oneNumberContract={oneNumberContract} isBiddingPhase={true} />;
};
