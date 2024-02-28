import React from "react";

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
    </div>
  );
};
