"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Game } from "./onenumber/Game";
import type { NextPage } from "next";
import { usePublicClient } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getAllContracts } from "~~/utils/scaffold-eth/contractsData";

const contractsData = getAllContracts();

const Home: NextPage = () => {
  const publicClient = usePublicClient();

  const oneNumberContract = contractsData["OneNumber"];
  console.log("oneNumberContract", oneNumberContract);

  const [numGames, setNumGames] = useState<number | null>(null);
  const [currentGame, setCurrentGame] = useState<Array<bigint> | null>(null);

  useEffect(() => {
    const fetchGameData = async () => {
      const numGames = Number(
        await publicClient.readContract({
          address: oneNumberContract.address,
          abi: oneNumberContract.abi,
          functionName: "numGames",
        }),
      );

      setNumGames(numGames);

      const latestGame = (await publicClient.readContract({
        address: oneNumberContract.address,
        abi: oneNumberContract.abi,
        functionName: "games",
        args: [numGames - 1],
      })) as bigint[];

      console.log("latestGame", latestGame);

      setCurrentGame(latestGame);
    };

    fetchGameData();
  }, [oneNumberContract.address, oneNumberContract.abi, publicClient]);

  //const {
  //  data: revealedNumberEvents,
  //} = useScaffoldEventHistory({
  //  contractName: "OneNumber",
  //  eventName: "RevealNumber",
  //  fromBlock: 54030525n,
  //  watch: true,
  //  filters: { gameId: numGames ? numGames -1 : 1 },
  //});
  //console.log("revealedNumberEvents", revealedNumberEvents);
  //
  //const {
  //  data: winnerEvents,
  //} = useScaffoldEventHistory({
  //  contractName: "OneNumber",
  //  eventName: "Winner",
  //  fromBlock: 54030525n,
  //  watch: true,
  //  filters: { gameId: numGames ? numGames -1 : 1 },
  //});
  //console.log("winnerEvents", winnerEvents);

  //const currentTimeStamp = Math.floor(new Date().getTime() / 1000);

  //const isRevealPhase =
  //  currentGame &&
  //  currentTimeStamp > currentGame[START_INDEX] + currentGame[BLIND_DURATION_INDEX] &&
  //  currentTimeStamp <
  //    currentGame[START_INDEX] + currentGame[BLIND_DURATION_INDEX] + currentGame[REVEAL_DURATION_INDEX];

  //const isGameEnded =
  //  currentGame &&
  //  currentTimeStamp >
  //    currentGame[START_INDEX] + currentGame[BLIND_DURATION_INDEX] + currentGame[REVEAL_DURATION_INDEX];

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-4xl font-bold">One Number to rule them all</span>
          </h1>
        </div>

        <div>
          {numGames && currentGame && (
            <Game gameId={numGames - 1} game={currentGame} oneNumberContract={oneNumberContract} />
          )}
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contract
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
