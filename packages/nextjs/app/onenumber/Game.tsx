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

  const [revealedNumberExists, setRevealedNumberExists] = useState<boolean>(false);
  const [revealedNumberEventsReady, setRevealedNumberEventsReady] = useState<boolean>(false);
  const [revealedNumberEventsLoading, setRevealedNumberEventsLoading] = useState<boolean>(false);

  const { data: revealedNumberEvents, isLoading: isRevealedNumberEventsLoading } = useScaffoldEventHistory({
    contractName: "OneNumber",
    eventName: "RevealNumber",
    fromBlock: 54030525n,
    watch: true,
    filters: { gameId: BigInt(gameId) },
  });
  useEffect(() => {
    setRevealedNumberEventsLoading(isRevealedNumberEventsLoading);

    if (revealedNumberEventsLoading && !isRevealedNumberEventsLoading) {
      setRevealedNumberEventsReady(true);
    }
  }, [isRevealedNumberEventsLoading, revealedNumberEventsLoading]);
  useEffect(() => {
    if (!revealedNumberEventsReady) {
      return;
    }

    let isRevealedNumberExist = false;
    if (revealedNumberEvents && revealedNumberEvents.length > 0) {
      isRevealedNumberExist = revealedNumberEvents.find(event => event.args.player === address) ? true : false;
    }

    setRevealedNumberExists(isRevealedNumberExist);
  }, [revealedNumberEventsReady, address, revealedNumberEvents]);

  console.log("revealedNumberEvents", revealedNumberEvents);

  if (!gameId || !game || !blindedNumberEventsReady || !revealedNumberEventsReady) {
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
          setBlindedNumberExists={setBlindedNumberExists}
        />
      )}
      {isRevealPhase && (
        <Reveal
          gameId={gameId}
          game={game}
          oneNumberContract={oneNumberContract}
          isBlindedNumberExist={blindedNumberExists}
          isRevealedNumberExist={revealedNumberExists}
          setRevealedNumberExists={setRevealedNumberExists}
        />
      )}
    </div>
  );
};
