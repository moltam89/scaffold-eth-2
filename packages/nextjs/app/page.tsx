"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { InputBase, notification } from "~~/components/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useContractRead } from "wagmi";
import { usePublicClient } from 'wagmi'

import { getAllContracts } from "~~/utils/scaffold-eth/contractsData";

const contractsData = getAllContracts();

const COST_INDEX = 0;
const BLIND_DURATION_INDEX = 1;
const REVEAL_DURATION_INDEX = 2;
const START_INDEX = 3;
const PRIZE_INDEX = 4;

const Home: NextPage = () => {
  const publicClient = usePublicClient();

  const oneNumberContract = contractsData["OneNumber"];

  useEffect(() => {
    const fetchGameData = async () => {
      const numGames = await publicClient.readContract({
        address: oneNumberContract.address,
        abi: oneNumberContract.abi,
        functionName: 'numGames',
      })

      const latestGame = await publicClient.readContract({
        address: oneNumberContract.address,
        abi: oneNumberContract.abi,
        functionName: 'games',
        args: [numGames - 1n],
      })

      console.log("latestGame", latestGame);
    }

    fetchGameData();
  }, []);

  const {
    data: numGames,
  } = useContractRead({
    address: oneNumberContract.address,
    functionName: "numGames",
    abi: oneNumberContract.abi,
    onError: error => {
      notification.error(error.message);
    },
  });

  console.log("numGames", numGames);

  const {
    data: latestGame,
  } = useContractRead({
    address: oneNumberContract.address,
    functionName: "games",
    abi: oneNumberContract.abi,
    args: [numGames - 1n],
    onError: error => {
      notification.error(error.message);
    },
  });

  const currentTimeStamp = Math.floor(new Date().getTime() / 1000);

  const isBiddingPhase = latestGame && (currentTimeStamp < latestGame[START_INDEX] + latestGame[BLIND_DURATION_INDEX]);
  const isRevealPhase = latestGame && (currentTimeStamp > latestGame[START_INDEX] + latestGame[BLIND_DURATION_INDEX]) && 
    (currentTimeStamp < latestGame[START_INDEX] + latestGame[BLIND_DURATION_INDEX] + latestGame[REVEAL_DURATION_INDEX]);

  const [number, setNumber] = useState<number | null>(null);
  const [secret, setSecret] = useState<string>("");

  const [blindedNumber, setBlindedNumber] = useState<string | null>(null);

  useEffect(() => {
    if (!number || !secret) {
      setBlindedNumber(null);

      return;
    }

    setBlindedNumber(ethers.utils.solidityKeccak256(["uint256", "string"], [number, secret]));
  }, [number, secret]);

  const handleChangeNumber = (newValue: string) => {
    const number = parseInt(newValue);

    if (!Number.isNaN(number) && number > 0) {
      setNumber(number);
    } else {
      setNumber(null);
    }
  };

  const handleChangeSecret = (newValue: string) => {
    setSecret(newValue);
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-4xl font-bold">One Number to rule them all</span>
          </h1>
        </div>

        <div>
          {isBiddingPhase && "Time to submit your Number"}
          {isRevealPhase && "Time to reveal your Number"}
        </div>

        <div>
          <InputBase onChange={handleChangeNumber} placeholder={"Number"} value={number ? number.toString() : ""} />
          <InputBase onChange={handleChangeSecret} placeholder={"Secret"} value={secret} />

          {blindedNumber && blindedNumber}
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
