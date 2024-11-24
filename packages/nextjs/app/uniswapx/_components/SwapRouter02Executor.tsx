"use client";

import { useState } from "react";
import {
  SWAP_ROUTER_02_EXECUTOR_ADDRESS_HARDHAT,
  TOKENS,
  UNISWAP_V3_USDT_OUTPUT_AMOUNT,
  USDC_ADDRESS,
  USDT_ADDRESS,
  callbackData,
  signedIntent,
} from "../_helpers/constants";
import {
  SNAPSHOT_ID_KEY,
  formatTokenAmount,
  mineBlock,
  revertToSnapshot,
  setNextBlockTimestamp,
  storeSnapshotId,
} from "../_helpers/helpers";
import { Info } from "./Info";
import { TokenDisplay } from "./TokenDisplay";
import { erc20Abi } from "viem";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { IntentTimestampAmount } from "~~/types/types";

interface SwapRouter02Executor {
  currentTime: number;
  setCurrentTime: (time: number) => void;
  requiredAmounts: IntentTimestampAmount[];
  contractBalanceUSDT: bigint;
  refetchContractBalanceUSDT: () => void;
}

export const SwapRouter02Executor = ({
  currentTime,
  setCurrentTime,
  requiredAmounts,
  contractBalanceUSDT,
  refetchContractBalanceUSDT,
}: SwapRouter02Executor) => {
  const requiredAmountCurrent = requiredAmounts.find(amount => amount[0] === currentTime)?.[1] || 0n;
  const profit = Number(formatTokenAmount(UNISWAP_V3_USDT_OUTPUT_AMOUNT.sub(requiredAmountCurrent)));

  const { address: connectedAddress } = useAccount();
  const balanceResult = useBalance({
    address: connectedAddress,
  });
  const balance = balanceResult?.data?.value;
  const balanceIsNotZero = !!balance && balance !== 0n;

  const { data: owner } = useScaffoldReadContract({
    contractName: "SwapRouter02Executor",
    functionName: "owner",
    args: undefined,
  });

  const { data: contractBalanceUSDC = 0n, refetch: refetchContractBalanceUSDC } = useReadContract({
    abi: erc20Abi,
    address: USDC_ADDRESS,
    args: [SWAP_ROUTER_02_EXECUTOR_ADDRESS_HARDHAT],
    functionName: "balanceOf",
  });

  const { writeContractAsync: writeSwapRouter02ExecutorAsync } = useScaffoldWriteContract("SwapRouter02Executor");

  const [snapshotId, setSnapshotId] = useState(localStorage.getItem(SNAPSHOT_ID_KEY));

  return (
    <div className="p-6 bg-base-200 rounded-lg shadow-md">
      <Info dataTip="This contract is a slightly modified version of the SwapRouter02Executor from the UniswapX repo. It interacts with the V2DutchOrderReactor contract to transfer the input amount (1001.38 USDC) and then calls the UniswapV3 pool to execute the swap. If the UniswapV3 pool provides more USDT than the actual required amount, the surplus remains in this contract as profit." />

      <div className="text-center mb-4 text-2xl font-bold">SwapRouter02Executor</div>

      <div className="text-center mb-4">
        <a
          href={
            "https://github.com/Uniswap/UniswapX/blob/9ba6ffd048e3d8c561d639af64846471d13ae659/src/sample-executors/SwapRouter02Executor.sol"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="link link-accent"
        >
          UniswapX repo
        </a>
      </div>

      {owner && (
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-4 text-2xl">
            <div className="flex items-center justify-between w-full">
              <TokenDisplay token={TOKENS[USDC_ADDRESS]} />
              <span className="text-xl pl-4">{formatTokenAmount(contractBalanceUSDC)}</span>
            </div>
            <div className="flex items-center justify-between w-full">
              <TokenDisplay token={TOKENS[USDT_ADDRESS]} />
              <span className="text-xl pl-4">{formatTokenAmount(contractBalanceUSDT)}</span>
            </div>

            <div className={`profit ${profit < 0 ? "text-red-500" : "text-green-500"}`}>Profit: {profit}</div>

            <div
              className={!balanceIsNotZero || profit < 0 ? "tooltip tooltip-info tooltip-bottom" : ""}
              data-tip={
                !balanceIsNotZero
                  ? "Grab funds from faucet"
                  : "Tx will fail because the Uniswap V3 pool doesn't provide the required output amount."
              }
            >
              <button
                className="btn btn-primary text-lg px-12 mt-2"
                disabled={!balanceIsNotZero || contractBalanceUSDT !== 0n}
                onClick={async () => {
                  storeSnapshotId(setSnapshotId);
                  await setNextBlockTimestamp(currentTime);
                  await mineBlock();
                  const result = await writeSwapRouter02ExecutorAsync({
                    functionName: "execute",
                    args: [signedIntent, callbackData],
                  });
                  console.log("result", result);
                  refetchContractBalanceUSDC();
                  refetchContractBalanceUSDT();
                }}
              >
                Fill Intent
              </button>
            </div>

            {contractBalanceUSDT > 0n && (
              <div>
                <button
                  className="btn btn-primary text-lg px-12 mt-2"
                  onClick={async () => {
                    console.log("resetting fork");
                    // await resetFork();
                    if (snapshotId) {
                      await revertToSnapshot(snapshotId);
                    } else {
                      console.error("No snapshotId to revert to");
                    }
                    setCurrentTime(requiredAmounts[0][0]);
                    refetchContractBalanceUSDC();
                    refetchContractBalanceUSDT();
                  }}
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {!owner && <div className="text-center mt-4">Contract missing, run &apos;yarn deploy&apos;</div>}
    </div>
  );
};
