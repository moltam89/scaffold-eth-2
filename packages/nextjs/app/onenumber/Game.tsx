import React from "react";
import { Bidding } from "./Bidding";
import { GenericContract } from "~~/utils/scaffold-eth/contract";

export const COST_INDEX = 0;
export const BLIND_DURATION_INDEX = 1;
export const REVEAL_DURATION_INDEX = 2;
export const START_INDEX = 3;
export const PRIZE_INDEX = 4;

interface GameProps {
  gameId: number;
  game: bigint[];
  oneNumberContract: GenericContract;
}

export const Game = ({ gameId, game, oneNumberContract }: GameProps) => {
  if (!gameId || !game) {
    return <></>;
  }

  return (
    <div className="flex items-center flex-col">
      <Bidding gameId={gameId} game={game} oneNumberContract={oneNumberContract} />
    </div>
  );
};
