"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { InputBase } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const [number, setNumber] = useState<number | null>(null);
  const [secret, setSecret] = useState<string>("");

  const [blindedNumber, setBlindedNumber] = useState<string | null>(null);

  useEffect(() => {
    if (!number || !secret) {
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
