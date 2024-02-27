import { useEffect } from "react";
import { encodePacked, keccak256 } from "viem";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface CommitPhaseProps {
  gameId: bigint;
  cost: bigint;
  number: number;
  secret: string;
  blindedNumber: string;
  setNumber: (number: number) => void;
  setSecret: (secret: string) => void;
  setBlindedNumber: (blindedNumber: string) => void;
  setBlindedNumberCommitted: (blindedNumberCommitted: boolean) => void;
}

export const CommitPhase = ({
  gameId,
  cost,
  number,
  secret,
  blindedNumber,
  setNumber,
  setSecret,
  setBlindedNumber,
  setBlindedNumberCommitted,
}: CommitPhaseProps) => {
  useEffect(() => {
    if (!number || !secret) {
      return;
    }

    setBlindedNumber(keccak256(encodePacked(["uint256", "string"], [BigInt(number), secret])));
  }, [number, secret]);

  const { writeAsync: commitBlindedNumber } = useScaffoldContractWrite({
    contractName: "OneNumber",
    functionName: "setBlindedNumber",
    args: [BigInt(gameId), blindedNumber as "0x{string}"],
    value: cost,
    onBlockConfirmation: async receipt => {
      console.log("receipt", receipt);
      setBlindedNumberCommitted(true);
    },
  });

  return (
    <div className="my-10">
      <div>
        <InputBase
          value={number?.toString()}
          onChange={(value = "0") => {
            const number = parseInt(value);
            if (!Number.isNaN(number) && number > 0) {
              setNumber(number);
            }
          }}
          placeholder={"Number"}
        />
        <InputBase
          value={secret || ""}
          onChange={secret => {
            setSecret(secret);
          }}
          placeholder={"Secret"}
        />

        <button className="btn btn-primary" onClick={async () => await commitBlindedNumber()}>
          Submit Blinded Number
        </button>

        {blindedNumber && blindedNumber}
      </div>
    </div>
  );
};
