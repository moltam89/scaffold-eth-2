"use client";

import { useEffect, useState } from "react";
import { Intent } from "./_components/Intent";
import { SwapRouter02Executor } from "./_components/SwapRouter02Executor";
import { UniswapV3_USDC_USDT_Pool } from "./_components/UniswapV3_USDC_USDT_Pool";
import { PERMIT2_ADDRESS, SWAP_ROUTER_02_EXECUTOR_ADDRESS_HARDHAT, USDT_ADDRESS } from "./_helpers/constants";
import { getRequiredAmounts } from "./_helpers/helpers";
import { rawIntent } from "./_helpers/testRawIntent";
import { CosignedV2DutchOrder } from "@banr1/uniswapx-sdk";
import { NextPage } from "next";
import { erc20Abi } from "viem";
import { arbitrum } from "viem/chains";
import { useBlock, useReadContract } from "wagmi";

const UniswapX: NextPage = () => {
  const intent = CosignedV2DutchOrder.parse(rawIntent.encodedOrder, arbitrum.id, PERMIT2_ADDRESS);
  const requiredAmounts = getRequiredAmounts(intent);

  const [currentTime, setCurrentTime] = useState(requiredAmounts[0][0]);
  const [fillTime, setFillTime] = useState(0);

  const { data: contractBalanceUSDT = 0n, refetch: refetchContractBalanceUSDT } = useReadContract({
    abi: erc20Abi,
    address: USDT_ADDRESS,
    args: [SWAP_ROUTER_02_EXECUTOR_ADDRESS_HARDHAT],
    functionName: "balanceOf",
  });

  const { data: block, refetch: refetchBlock } = useBlock();
  // Refetch block when contractBalanceUSDT changes (after filling intent)
  useEffect(() => {
    if (contractBalanceUSDT) {
      refetchBlock();
    }
  }, [contractBalanceUSDT, refetchBlock]);

  useEffect(() => {
    if (block && contractBalanceUSDT) {
      setCurrentTime(Number(block.timestamp));
      setFillTime(Number(block.timestamp));
    } else {
      setFillTime(0);
    }
  }, [block, contractBalanceUSDT]);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 text-center max-w-4xl">
          <h1 className="text-4xl font-bold">UniswapX</h1>
          <div>
            <p>
              This extension shows you how to fill{" "}
              <a
                target="_blank"
                href="https://docs.uniswap.org/contracts/uniswapx/overview"
                className="underline font-bold text-nowrap"
              >
                UniswapX
              </a>{" "}
              intents
            </p>
          </div>

          <div className="divider my-0" />
        </div>

        <div className="flex flex-col justify-center items-center bg-base-300 w-full mt-8 px-8 pt-6 pb-12">
          <div className="flex justify-around bg-base-100 px-10 py-10 text-center items-center w-full rounded-3xl mt-10">
            <div>
              <UniswapV3_USDC_USDT_Pool />
            </div>

            <div>
              <Intent
                currentTime={currentTime}
                setCurrentTime={setCurrentTime}
                fillTime={fillTime}
                rawIntent={rawIntent}
                requiredAmounts={requiredAmounts}
              ></Intent>
            </div>

            <div>
              <SwapRouter02Executor
                currentTime={currentTime}
                setCurrentTime={setCurrentTime}
                requiredAmounts={requiredAmounts}
                contractBalanceUSDT={contractBalanceUSDT}
                refetchContractBalanceUSDT={refetchContractBalanceUSDT}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UniswapX;
