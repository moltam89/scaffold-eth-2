"use client";

import { useState } from "react";
// import { createWalletClient, http, parseEther } from "viem";
import { arbitrum } from "viem/chains";
import { useAccount, useBlock } from "wagmi";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { ethersSendETH, logBlockNumberAndTimestamp, setNextBlockTimestamp } from "~~/app/uniswapx/_helpers/helpers";
import { useTransactor } from "~~/hooks/scaffold-eth";
import { useWatchBalance } from "~~/hooks/scaffold-eth/useWatchBalance";

// Number of ETH faucet sends to an address
// const NUM_OF_ETH = "1";
//const FAUCET_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
// const FAUCET_ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // Use different address, so SwapRouter02Executor will be deployed to the same address

// This messes with block timestamps, replace with ethersSendETH
// const localWalletClient = createWalletClient({
//   // chain: localForkArbitrum,
//   chain: localForkArbitrum,
//   transport: http(),
// });

/**
 * FaucetButton button which lets you grab eth.
 */
export const FaucetButton = () => {
  const { address, chain: ConnectedChain } = useAccount();

  const { data: balance } = useWatchBalance({ address });

  const [loading, setLoading] = useState(false);

  const faucetTxn = useTransactor();

  // Preserve the current block timestamp when using the faucet
  const block = useBlock();
  const currentBLockTimestamp = Number(block?.data?.timestamp);

  const sendETH = async () => {
    if (!address) return;
    try {
      setLoading(true);
      setNextBlockTimestamp(currentBLockTimestamp);
      // await faucetTxn({
      //   account: FAUCET_ADDRESS,
      //   to: address,
      //   value: parseEther(NUM_OF_ETH),
      // });

      faucetTxn(await ethersSendETH(address));
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
