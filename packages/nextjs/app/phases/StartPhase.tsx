import { useState } from "react";
import { usePublicClient } from "wagmi";
import { InputBase } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

interface StartPhaseProps {
  cost: bigint;
  blindDuration: number;
  revealDuration: number;
  setGameId: (gameId: bigint) => void;
  setCost: (cost: bigint) => void;
  setBlindDuration: (blindDuration: number) => void;
  setRevealDuration: (revealDuration: number) => void;
  nextPhase: () => void;
}

export const StartPhase = ({
  cost,
  blindDuration,
  revealDuration,
  setGameId,
  setCost,
  setBlindDuration,
  setRevealDuration,
  nextPhase,
}: StartPhaseProps) => {
  const [checkingGameId, setCheckingGameId] = useState(false);
  const [tempGameId, setTempGameId] = useState<number>();
  const { data: contract } = useDeployedContractInfo("OneNumber");
  const contractAddress = contract?.address;
  const publicClient = usePublicClient({ chainId: getTargetNetworks()[0].id });

  const { writeAsync: startNewGame } = useScaffoldContractWrite({
    contractName: "OneNumber",
    functionName: "newGame",
    args: [cost, blindDuration, revealDuration],
    onBlockConfirmation: async receipt => {
      console.log("receipt", receipt);
      const gameId = BigInt(receipt.logs[0].data);
      setGameId(gameId);
      if (!gameId) return;
      const gameData = await getGameData(BigInt(gameId));
      const { cost: gameCost, blindDuration: gameBlindDuration, revealDuration: gameRevealDuration } = gameData;
      setCost(gameCost);
      setBlindDuration(gameBlindDuration);
      setRevealDuration(gameRevealDuration);
      nextPhase();
    },
  });

  const createNewGame = async () => {
    const tx = await startNewGame();
    console.log("tx", tx);
  };

  const getGameData = async (gameId: bigint) => {
    const game = await publicClient.readContract({
      address: contractAddress as string,
      abi: (contract as any).abi,
      functionName: "games",
      args: [gameId],
    });
    return {
      cost: game[0],
      blindDuration: game[1],
      revealDuration: game[2],
      start: game[3],
      prize: game[4],
    };
  };

  const checkGameId = async () => {
    setCheckingGameId(true);
    const game = await getGameData(BigInt(tempGameId || 0));
    const { cost: gameCost, blindDuration: gameBlindDuration, revealDuration: gameRevealDuration, start } = game;
    // Check if game exists
    if (!start) {
      // Game does not exist
      console.log("Game does not exist");
      setCheckingGameId(false);
      return;
    }
    if ((start + gameBlindDuration) * 1000 < Date.now()) {
      // Game has already passed the blind phase
      console.log("Game has already passed the blind phase");
      setCheckingGameId(false);
      return;
    }
    console.log("Game is good to go", tempGameId);
    setGameId(BigInt(tempGameId || 0));
    setCost(gameCost);
    setBlindDuration(gameBlindDuration);
    setRevealDuration(gameRevealDuration);
    setCheckingGameId(false);
    nextPhase();
  };

  return (
    <div className="my-10">
      <div>
        <h2 className="text-xl">Join a game</h2>
        <InputBase
          value={tempGameId?.toString()}
          onChange={(value = "") => {
            const id = parseInt(value);
            if (!Number.isNaN(id)) {
              setTempGameId(parseInt(value));
            }
          }}
          disabled={checkingGameId}
          placeholder={"Game Id"}
        />
        <button className="btn btn-primary" disabled={checkingGameId} onClick={checkGameId}>
          Join Game
        </button>
        <h2 className="">Or</h2>
        <h2 className="text-xl">Start a new game</h2>
        <label>
          Cost
          <InputBase
            value={cost?.toString()}
            onChange={(value = "") => {
              const cost = BigInt(value);
              if (!Number.isNaN(cost) && cost > 0) {
                setCost(cost);
              }
            }}
            placeholder={"Cost"}
          />
        </label>
        <label>
          Blind Duration
          <InputBase
            value={blindDuration?.toString()}
            onChange={(value = "") => {
              const blindDuration = parseInt(value);
              if (!Number.isNaN(blindDuration) && blindDuration > 0) {
                setBlindDuration(blindDuration);
              }
            }}
            placeholder={"Blind Duration"}
          />
        </label>
        <label>
          Reveal Duration
          <InputBase
            value={revealDuration?.toString()}
            onChange={(value = "") => {
              const revealDuration = parseInt(value);
              if (!Number.isNaN(revealDuration) && revealDuration > 0) {
                setRevealDuration(revealDuration);
              }
            }}
            placeholder={"Blind Duration"}
          />
        </label>
        <button className="btn btn-primary" onClick={() => createNewGame()}>
          Start New Game
        </button>
      </div>
    </div>
  );
};
