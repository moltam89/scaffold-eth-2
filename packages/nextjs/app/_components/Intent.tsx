"use client";

import React from "react";
import { TOKENS } from "../_helpers/constants";
import { formatTokenAmount } from "../_helpers/helpers";
import { Info } from "./Info";
import { RequiredAmountsDisplay } from "./RequiredAmounts";
import TimeDisplay from "./TimeDisplay";
import { TokenDisplay } from "./TokenDisplay";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { LockOpenIcon } from "@heroicons/react/24/outline";
import { RawOpenDutchIntentV2 } from "~~/types/banr1/raw-dutch-intent-v2";
import { IntentTimestampAmount } from "~~/types/types";

interface RawIntentProps {
  currentTime: number;
  setCurrentTime: (time: number) => void;
  fillTime: number;
  rawIntent: RawOpenDutchIntentV2;
  requiredAmounts: IntentTimestampAmount[];
}

export const Intent = ({ currentTime, setCurrentTime, fillTime, rawIntent, requiredAmounts }: RawIntentProps) => {
  const [, startAmount] = requiredAmounts[0];
  const [, endAmount] = requiredAmounts[requiredAmounts.length - 1];

  const fillIntentTimestampAmount = requiredAmounts.find(([key]) => {
    return key === fillTime;
  });
  const fillAmount = fillIntentTimestampAmount ? fillIntentTimestampAmount[1] : 0n;
  const isFilled = fillAmount !== 0n;

  return (
    <>
      <div className="flex justify-center items-center mb-4">
        <TimeDisplay
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          fillTime={fillTime}
          requiredAmounts={requiredAmounts}
        />
      </div>

      <div className="p-6 bg-base-200 rounded-lg shadow-md">
        <Info
          dataTip={
            "Swap 1001.38 USDC to USDT. Starting price is 1002.19 USDT, decreasing over 16 seconds. Locally, you can skip time to maximize profit, but live orders fill quickly. Check the original transaction for timing."
          }
        />

        <div className="text-center mb-4">
          <a
            href={"https://arbiscan.io/tx/0xe54b1a83b816bc2eb0fec9f3c7c1794030dcd5e57778f019b74d6d3133441b75"}
            target="_blank"
            rel="noopener noreferrer"
            className="link link-accent"
          >
            UniswapX intent fill tx
          </a>
        </div>

        <div className="mb-4 flex items-center justify-center">
          <div className="flex items-center space-x-4 text-2xl">
            <TokenDisplay token={TOKENS[rawIntent.input.token]} />
            <span className="text-sm font-extrabold">{formatTokenAmount(rawIntent.input.startAmount)}</span>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-center">
          <div className="flex items-center space-x-4 text-2xl">
            <TokenDisplay token={TOKENS[rawIntent.outputs[0].token]} />
            <span className="text-sm font-extrabold">
              {isFilled
                ? formatTokenAmount(fillAmount)
                : `${formatTokenAmount(startAmount)} - ${formatTokenAmount(endAmount)}`}
            </span>
          </div>
        </div>

        <div
          className={`flex items-center justify-center p-4 rounded-lg ${fillAmount !== 0n ? "bg-gray-200" : "bg-green-200"}`}
        >
          <div className="flex items-center space-x-2">
            {fillAmount !== 0n ? (
              <LockClosedIcon className="h-6 w-6 text-gray-600" />
            ) : (
              <LockOpenIcon className="h-6 w-6 text-green-600" />
            )}
            <span className={`font-bold ${fillAmount !== 0n ? "text-gray-600" : "text-green-600"}`}>
              {fillAmount !== 0n ? "Filled" : "Open"}
            </span>
          </div>
        </div>

        <div>
          <RequiredAmountsDisplay currentTime={currentTime} requiredAmounts={requiredAmounts} />
        </div>
      </div>
    </>
  );
};
