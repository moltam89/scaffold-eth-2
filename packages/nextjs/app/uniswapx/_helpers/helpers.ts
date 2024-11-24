import { STRART_BLOCK_NUMBER, STRART_BLOCK_TIMESTAMP } from "./constants";
import { CosignedV2DutchOrder } from "@banr1/uniswapx-sdk";
import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "ethers";
import { formatUnits } from "viem";
import { IntentTimestampAmount } from "~~/types/types";

export const getRequiredAmount = (intent: CosignedV2DutchOrder, timeStamp: number): BigNumber => {
  const resolve = intent.resolve({ timestamp: timeStamp });

  let requiredAmountCurrent = BigNumber.from(0);
  for (const tokenAmount of resolve.outputs) {
    requiredAmountCurrent = requiredAmountCurrent.add(BigNumber.from(tokenAmount.amount.toString()));
  }

  return requiredAmountCurrent;
};

export const getRequiredAmounts = (intent: CosignedV2DutchOrder): IntentTimestampAmount[] => {
  const startTime = intent.info.cosignerData.decayStartTime;
  const endTime = intent.info.cosignerData.decayEndTime;

  const requiredAmounts: IntentTimestampAmount[] = [];

  for (let time = startTime; time <= endTime; time++) {
    requiredAmounts.push([time, getRequiredAmount(intent, time)]);
  }

  return requiredAmounts;
};

export function formatTokenAmount(amount: BigNumber, decimals?: number): string;
export function formatTokenAmount(amount: bigint, decimals?: number): string;

// Single implementation
export function formatTokenAmount(amount: BigNumber | bigint, decimals: number = 6): string {
  const value = BigNumber.isBigNumber(amount) ? amount.toBigInt() : amount;
  return Number(formatUnits(value, decimals)).toFixed(2);
}

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

export const setNextBlockTimestamp = async (timestamp: number): Promise<void> => {
  try {
    await provider.send("evm_setNextBlockTimestamp", [timestamp]);
    console.log(`Next block timestamp set to: ${timestamp}`);
  } catch (error) {
    console.error("Error setting block timestamp:", error);
  }
};

export const mineBlock = async (): Promise<void> => {
  try {
    await provider.send("evm_mine", []);
    const block = await provider.getBlock("latest");
    console.log("Next block mined:", block?.number, block?.timestamp);
  } catch (error) {
    console.error("Error setting block timestamp:", error);
  }
};

export const resetFork = async (): Promise<void> => {
  try {
    await provider.send("hardhat_reset", [
      {
        forking: {
          jsonRpcUrl: "https://arb-mainnet.g.alchemy.com/v2/oKxs-03sij-U_N0iOlrSsZFr29-IqbuF",
          blockNumber: STRART_BLOCK_NUMBER + 2, // +2 to not reset contract deployment and the tx to grab eth from the faucet
        },
      },
    ]);
    console.log("Fork reset");
    setNextBlockTimestamp(STRART_BLOCK_TIMESTAMP);
  } catch (error) {
    console.error("Error resetting fork:", error);
  }
};
