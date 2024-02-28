import React from "react";
import { Bidding } from "./Bidding";

interface GameProps {
  gameId: number;
  game: Array<bigint> | null;
}

export const Game = ({ gameId, game }: GameProps) => {
  if (!gameId || !game) {
    return <></>;
  }

  return (
    <div className="flex items-center flex-col">
      yo {gameId} {Number(game[0])}
      <Bidding gameId={gameId} game={game} />
    </div>
  );
};

export const COST_INDEX = 0;
export const BLIND_DURATION_INDEX = 1;
export const REVEAL_DURATION_INDEX = 2;
export const START_INDEX = 3;
export const PRIZE_INDEX = 4;
