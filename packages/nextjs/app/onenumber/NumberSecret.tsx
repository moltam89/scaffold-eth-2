import React, { useEffect, useState } from "react";
import { COST_INDEX } from "./Game";
import { ethers } from "ethers";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { InputBase } from "~~/components/scaffold-eth";
import { GenericContract } from "~~/utils/scaffold-eth/contract";

interface NumberSecretProps {
  gameId: number;
  game: bigint[];
  oneNumberContract: GenericContract;
  isBiddingPhase: boolean;
  setBlindedNumberExists: (type: boolean) => void;
  setRevealedNumberExists: (type: boolean) => void;
}

export const NumberSecret = ({
  gameId,
  game,
  oneNumberContract,
  isBiddingPhase,
  setBlindedNumberExists,
  setRevealedNumberExists,
}: NumberSecretProps) => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();

  const [number, setNumber] = useState<number | null>(null);
  const [secret, setSecret] = useState<string>("");

  const [blindedNumber, setBlindedNumber] = useState<string | null>(null);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

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
      <div>NumberSecret</div>

      <div>{blindedNumber && blindedNumber}</div>

      <div>
        <InputBase onChange={handleChangeNumber} placeholder={"Number"} value={number ? number.toString() : ""} />
      </div>
      <div>
        <InputBase onChange={handleChangeSecret} placeholder={"Secret"} value={secret} />
      </div>

      <div>
        <button
          className="btn btn-primary btn-sm"
          disabled={!blindedNumber}
          onClick={async () => {
            console.log("yo");
            setButtonLoading(true);

            if (isBiddingPhase) {
              const { request } = await publicClient.simulateContract({
                account: address,
                address: oneNumberContract.address,
                abi: oneNumberContract.abi,
                functionName: "setBlindedNumber",
                value: game[COST_INDEX],
                args: [gameId, blindedNumber],
              });

              if (walletClient) {
                await walletClient.writeContract(request);
                setBlindedNumberExists(true);
              }
            } else {
              const { request } = await publicClient.simulateContract({
                account: address,
                address: oneNumberContract.address,
                abi: oneNumberContract.abi,
                functionName: "revealNumber",
                args: [gameId, number, secret],
              });

              if (walletClient) {
                await walletClient.writeContract(request);
                setRevealedNumberExists(true);
              }
            }

            setButtonLoading(false);
          }}
          type="button"
        >
          {buttonLoading && <span className="loading loading-spinner loading-xs"></span>}
          {isBiddingPhase ? "Submit Blinded Number" : "Reveal Number"}
        </button>
      </div>
    </>
  );
};
