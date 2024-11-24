import { CosignedV2DutchOrder } from "@banr1/uniswapx-sdk";
import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "ethers";
import { Hash, formatUnits } from "viem";
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

export const ethersSendETH = async (
  address: string,
  value: bigint = ethers.parseEther("1"),
): Promise<() => Promise<Hash>> => {
  try {
    const wallet = new ethers.Wallet("0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d", provider);
    const txResponse = await wallet.sendTransaction({ to: address, value });
    return async () => txResponse.hash as Hash; // Return a function that resolves the Promise
  } catch (error) {
    console.error("Error sending ETH:", error);
    return async () => "0x0" as Hash; // Return a function that resolves a fallback Promise
  }
};

export const logBlockNumberAndTimestamp = async (): Promise<void> => {
  const block = await provider.getBlock("latest");
  console.log("Current block timestamp xxx:", block?.number, block?.timestamp);
};

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

export const SNAPSHOT_ID_KEY = "snapshotId";
export const storeSnapshotId = async (setSnapshotId: (snapshotId: string) => void): Promise<string> => {
  const snapshotId = await provider.send("evm_snapshot", []);
  setSnapshotId(snapshotId);
  localStorage.setItem(SNAPSHOT_ID_KEY, snapshotId);
  console.log("Snapshot ID:", snapshotId);
  return snapshotId;
};
export const revertToSnapshot = async (snapshotId: string): Promise<void> => {
  try {
    await provider.send("evm_revert", [snapshotId]);
    localStorage.removeItem(SNAPSHOT_ID_KEY);
    console.log("Reverted to snapshot:", snapshotId);
  } catch (error) {
    console.error("Error reverting to snapshot:", error);
  }
};
