"use client";

import { useState } from "react";
import { createWalletClient, http, parseEther } from "viem";
import { arbitrum } from "viem/chains";
import { useAccount, useBlock } from "wagmi";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { useTransactor } from "~~/hooks/scaffold-eth";
import { useWatchBalance } from "~~/hooks/scaffold-eth/useWatchBalance";
import { localForkArbitrum } from "~~/app/uniswapx/_helpers/constants";
import { ethersSendETH, logBlockNumberAndTimestamp, setNextBlockTimestamp } from "~~/app/uniswapx/_helpers/helpers";

// Number of ETH faucet sends to an address
const NUM_OF_ETH = "1";
//const FAUCET_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; 
const FAUCET_ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // Use different address, so SwapRouter02Executor will be deployed to the same address

const localWalletClient = createWalletClient({
  // chain: localForkArbitrum,
  chain: localForkArbitrum,
  transport: http(),
});

/**
 * FaucetButton button which lets you grab eth.
 */
export const FaucetButton = () => {
  const { address, chain: ConnectedChain } = useAccount();

  const { data: balance } = useWatchBalance({ address });
  console.log("⚡️ ~ file: FaucetButton.tsx ~ balance", balance);

  const [loading, setLoading] = useState(false);

  const faucetTxn = useTransactor(localWalletClient);

  // Preserve the current block timestamp when using the faucet
  const block = useBlock();
  const currentBLockTimestamp = Number(block?.data?.timestamp);
  console.log("⚡️ ~ file: FaucetButton.tsx:sendETH ~ block xxx", block, currentBLockTimestamp);

  logBlockNumberAndTimestamp()

  const sendETH = async () => {
    if (!address) return;
    try {
      setLoading(true);
      console.log("⚡️ ~ file: FaucetButton.tsx:sendETH ~ address", address);
      console.log("⚡️ ~ file: FaucetButton.tsx:sendETH ~ block xxx2", block, currentBLockTimestamp);
      logBlockNumberAndTimestamp()
      setNextBlockTimestamp(currentBLockTimestamp);
      // await faucetTxn({
      //   account: FAUCET_ADDRESS,
      //   to: address,
      //   value: parseEther(NUM_OF_ETH),
      // });
      ethersSendETH(address);
      setLoading(false);
    } catch (error) {

      console.error("⚡️ ~ file: FaucetButton.tsx:sendETH ~ error", error);
      setLoading(false);
    }
  };

  // Render only on local chain
  if (ConnectedChain?.id !== arbitrum.id) {
    return null;
  }

  const isBalanceZero = balance && balance.value === 0n;

  return (
    <div
      className={
        !isBalanceZero
          ? "ml-1"
          : "ml-1 tooltip tooltip-bottom tooltip-secondary tooltip-open font-bold before:left-auto before:transform-none before:content-[attr(data-tip)] before:right-0"
      }
      data-tip="Grab funds from faucet"
    >
      <button className="btn btn-secondary btn-sm px-2 rounded-full" onClick={sendETH} disabled={loading}>
        {!loading ? (
          <BanknotesIcon className="h-4 w-4" />
        ) : (
          <span className="loading loading-spinner loading-xs"></span>
        )}
      </button>
    </div>
  );
};
