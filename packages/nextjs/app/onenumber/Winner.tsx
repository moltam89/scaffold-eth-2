import React from "react";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

interface WinnerProps {
  gameId: number;
}

export const Winner = ({ gameId }: WinnerProps) => {
  const { data: winnerEvents } = useScaffoldEventHistory({
    contractName: "OneNumber",
    eventName: "Winner",
    fromBlock: 54030525n,
    watch: true,
    filters: { gameId: BigInt(gameId) },
  });
  console.log("winnerEvents", winnerEvents, gameId);

  if (!winnerEvents || winnerEvents.length == 0) {
    return <div>Waiting for the game results...</div>;
  }

  return (
    <div className="flex items-center flex-col">
      <Address address={winnerEvents[0].args.winner} />
      <div>{Number(winnerEvents[0].args.number)}</div>
    </div>
  );
};
