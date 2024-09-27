import React from "react";
import { CountdownTimer } from "../CountdownTimer";
import { NumberSecret } from "./NumberSecret";
import { GenericContract } from "~~/utils/scaffold-eth/contract";

interface GameProps {
  gameId: number;
  game: bigint[];
  oneNumberContract: GenericContract;
  isBlindedNumberExist: boolean;
  setBlindedNumberExists: (type: boolean) => void;
}

export const Bidding = ({
  gameId,
  game,
  oneNumberContract,
  isBlindedNumberExist,
  setBlindedNumberExists,
}: GameProps) => {
  if (!gameId || !game) {
    return <></>;
  }

  const startTime = Number(game[3].toString() + "000");
  const blindDuration = Number(game[1].toString() + "000");

  return (
    <>
      <CountdownTimer
        endTime={startTime + blindDuration}
        text="Time until next phase:"
        passedTimeAction={() => {
          return;
        }}
      />
      {isBlindedNumberExist ? (
        <>You have submitted your number!</>
      ) : (
        <NumberSecret
          gameId={gameId}
          game={game}
          oneNumberContract={oneNumberContract}
          isBiddingPhase={true}
          setBlindedNumberExists={setBlindedNumberExists}
          setRevealedNumberExists={bool => {
            console.log(bool);
          }}
        />
      )}
    </>
  );
};
