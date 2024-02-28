import React, { useEffect, useState } from "react";
import { Bidding } from "./Bidding";
import { Reveal } from "./Reveal";
import { useAccount } from "wagmi";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
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
  const { address } = useAccount();

  const [currentTimeStamp, setCurrentTimeStamp] = useState<number>(Math.floor(new Date().getTime() / 1000));
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTimeStamp(Math.floor(new Date().getTime() / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const [blindedNumberExists, setBlindedNumberExists] = useState<boolean>(false);
  const [blindedNumberEventsReady, setBlindedNumberEventsReady] = useState<boolean>(false);
  const [blindedNumberEventsLoading, setBlindedNumberEventsLoading] = useState<boolean>(false);

  const { data: blindedNumberEvents, isLoading: isBlindedNumberEventsLoading } = useScaffoldEventHistory({
    contractName: "OneNumber",
    eventName: "BlindedNumber",
    fromBlock: 54030525n,
    watch: true,
    filters: { gameId: BigInt(gameId) },
  });

  useEffect(() => {
    setBlindedNumberEventsLoading(isBlindedNumberEventsLoading);

    if (blindedNumberEventsLoading && !isBlindedNumberEventsLoading) {
      setBlindedNumberEventsReady(true);
    }
  }, [isBlindedNumberEventsLoading, blindedNumberEventsLoading]);

  useEffect(() => {
    if (!blindedNumberEventsReady) {
      return;
    }

    let isBlindedNumberExist = false;
    if (blindedNumberEvents && blindedNumberEvents.length > 0) {
      isBlindedNumberExist = blindedNumberEvents.find(event => event.args.player === address) ? true : false;
    }

    setBlindedNumberExists(isBlindedNumberExist);
  }, [blindedNumberEventsReady, address, blindedNumberEvents]);

  if (!gameId || !game || !blindedNumberEventsReady) {
    return <></>;
  }

  const isBiddingPhase = currentTimeStamp < game[START_INDEX] + game[BLIND_DURATION_INDEX];
  const isRevealPhase =
    currentTimeStamp >= game[START_INDEX] + game[BLIND_DURATION_INDEX] &&
    currentTimeStamp <= game[START_INDEX] + game[BLIND_DURATION_INDEX] + game[REVEAL_DURATION_INDEX];

  console.log(currentTimeStamp, isBiddingPhase, isRevealPhase);

  return (
    <div className="flex items-center flex-col">
      {isBiddingPhase && (
        <Bidding
          gameId={gameId}
          game={game}
          oneNumberContract={oneNumberContract}
          isBlindedNumberExist={blindedNumberExists}
        />
      )}
      {isRevealPhase && (
        <Reveal
          gameId={gameId}
          game={game}
          oneNumberContract={oneNumberContract}
          isBlindedNumberExist={blindedNumberExists}
        />
      )}
    </div>
  );
};
