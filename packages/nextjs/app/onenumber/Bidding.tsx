import React from "react";
import { BLIND_DURATION_INDEX, START_INDEX } from "./Game";

interface GameProps {
  gameId: number;
  game: Array<bigint> | null;
}

export const Bidding = ({ gameId, game }: GameProps) => {
  if (!gameId || !game) {
    return <></>;
  }

  const currentTimeStamp = Math.floor(new Date().getTime() / 1000);
  const isBiddingPhase = currentTimeStamp < game[START_INDEX] + game[BLIND_DURATION_INDEX];

  if (!isBiddingPhase) {
    return <></>;
  }

  return <div className="flex items-center flex-col">Bidding</div>;
};
