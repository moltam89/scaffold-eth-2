"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { NextPage } from "next";
import { usePublicClient } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

const Results: NextPage = () => {
  const publicClient = usePublicClient();
  const { data: contract } = useDeployedContractInfo("OneNumber");
  console.log("contract", contract);

  const searchParams = useSearchParams();
  const urlGameId = searchParams.get("gameId");
  // use url params or environment variable
  const gameId = BigInt(parseInt(urlGameId || "0") || process.env.NEXT_PUBLIC_GAME_ID || "0");

  const [isComplete, setIsComplete] = useState(false);
  const [gamePrize, setGamePrize] = useState(BigInt(0));

  // useScaffoldEventHistory("OneNumber", "")

  const getGameData = async (gameId: bigint) => {
    const game = await publicClient.readContract({
      address: (contract as any).address as string,
      abi: (contract as any).abi,
      functionName: "games",
      args: [gameId],
    });
    return {
      cost: game[0],
      blindDuration: game[1],
      revealDuration: game[2],
      start: game[3],
      prize: game[4],
    };
  };

  useEffect(() => {
    const fetchGameData = async () => {
      const game = await getGameData(BigInt(gameId));
      console.log("game", game);
      if (game.start === 0) return;
      if (game.start + game.blindDuration + game.revealDuration > Math.floor(new Date().getTime() / 1000)) return;
      setIsComplete(true);
      setGamePrize(game.prize);
    };
    console.log("gameId", gameId);
    console.log("contractAddress", contract?.address);
    if (typeof gameId == "bigint" && contract?.address) {
      console.log("fetching game data");
      fetchGameData();
    }
  }, [gameId, contract]);

  return (
    <>
      <div className="px-5">
        <h1 className="text-center">
          <span className="block text-4xl font-bold">Game {gameId.toString()} Results</span>
        </h1>
      </div>
      <div className="flex items-center flex-col flex-grow pt-10">
        {!isComplete && <h1>This game has not yet completed!</h1>}
        {isComplete && (
          <>
            <table className="table table-compact w-[20%]">
              <thead>
                <tr>
                  <th>Winner</th>
                  <th>Prize</th>
                  <th>Players</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0x1234...</td>
                  <td>{gamePrize.toString()}</td>
                  <td>100</td>
                </tr>
              </tbody>
            </table>
            <table className="table table-compact w-[20%]">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Guesses</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>100</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>100</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>100</td>
                  <td>10</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default Results;
