"use client";

import { useState } from "react";
import { Intent } from "./_components/Intent";
import { SwapRouter02Executor } from "./_components/SwapRouter02Executor";
import { UniswapV3_USDC_USDT_Pool } from "./_components/UniswapV3_USDC_USDT_Pool";
import { rawIntent } from "./_helpers/testRawIntent";
import { NextPage } from "next";
import { useBlock } from "wagmi";
import { CosignedV2DutchOrder } from "@banr1/uniswapx-sdk";
import { arbitrum } from "viem/chains";
import { PERMIT2_ADDRESS } from "./_helpers/constants";
import { getRequiredAmounts } from "./_helpers/helpers";

const UniswapX: NextPage = () => {
  const [currentTime, setCurrentTime] = useState(0);

  const intent = CosignedV2DutchOrder.parse(rawIntent.encodedOrder, arbitrum.id, PERMIT2_ADDRESS);

  const requiredAmounts = getRequiredAmounts(intent);

  const block = useBlock();
  if (block?.data) {
    console.log("block", block.data.number, block.data.timestamp);
  }

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
              <Intent currentTime={currentTime} setCurrentTime={setCurrentTime} rawIntent={rawIntent} requiredAmounts={requiredAmounts}></Intent>
            </div>

            <div>
              <SwapRouter02Executor currentTime={currentTime} requiredAmounts={requiredAmounts} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UniswapX;
