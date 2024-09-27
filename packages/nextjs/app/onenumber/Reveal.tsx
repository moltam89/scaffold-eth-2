import React from "react";
import { CountdownTimer } from "../CountdownTimer";
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

  const startTime = Number(game[3].toString() + "000");
  const blindDuration = Number(game[1].toString() + "000");
  const revealDuration = Number(game[2].toString() + "000");

  return (
    <>
      <CountdownTimer
        endTime={startTime + blindDuration + revealDuration}
        text="Time until next phase:"
        passedTimeAction={() => {
          return;
        }}
      />
      {isRevealedNumberExist ? (
        <>You have revealed your number!</>
      ) : (
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
      )}
    </>
  );
};
