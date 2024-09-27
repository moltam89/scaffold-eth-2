"use client";

import { useState } from "react";
// import { useSearchParams } from "next/navigation";
import { CommitPhase } from "./phases/CommitPhase";
import { EndGamePhase } from "./phases/EndGamePhase";
import { RevealPhase } from "./phases/RevealPhase";
import { StartPhase } from "./phases/StartPhase";
import type { NextPage } from "next";
import { Phases } from "~~/types/onenumber";

const SubGame: NextPage = () => {
  const [gameId, setGameId] = useState<bigint>(0n);
  const [cost, setCost] = useState<bigint>(0n);
  const [startTime, setStartTime] = useState<number>(0);
  const [blindDuration, setBlindDuration] = useState<number>(0);
  const [revealDuration, setRevealDuration] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [phase, setPhase] = useState<Phases>(Phases.Start);
  const [number, setNumber] = useState<number>(0);
  const [secret, setSecret] = useState<string>("");
  const [blindedNumber, setBlindedNumber] = useState<string>("");

  // const searchParams = useSearchParams();
  // const urlGameId = searchParams.get("gameId");
  // if (urlGameId) {
  //   setGameId(parseInt(urlGameId));
  //   setPhase(Phases.Commit);
  // }

  const nextPhase = (start?: number) => {
    console.log("currentPhase", phase);
    if (phase == Phases.Start) {
      setPhase(Phases.Commit);
      console.log("start", start);
      console.log("startTime", startTime);
      console.log("blindDuration", blindDuration);
      setEndTime(((start || startTime) + blindDuration) * 1000);
      console.log("nextPhase", Phases.Commit);
    }
    if (phase == Phases.Commit) {
      setPhase(Phases.Reveal);
      setEndTime((startTime + blindDuration + revealDuration) * 1000);
      console.log("nextPhase", Phases.Reveal);
    }
    if (phase == Phases.Reveal) {
      setPhase(Phases.EndGame);
      console.log("nextPhase", Phases.EndGame);
    }
    if (phase == Phases.EndGame) {
      setPhase(Phases.Start);
      console.log("nextPhase", Phases.Start);
    }
  };

  return (
    <>
      <div className="px-5">
        <h1 className="text-center">
          <span className="block text-4xl font-bold">One Number to rule them all</span>
        </h1>
      </div>
      <div className="flex items-center flex-col flex-grow pt-10">
        {phase == Phases.Start && (
          <StartPhase
            cost={BigInt(cost)}
            blindDuration={blindDuration}
            revealDuration={revealDuration}
            setCost={setCost}
            setStartTime={setStartTime}
            setBlindDuration={setBlindDuration}
            setRevealDuration={setRevealDuration}
            setGameId={setGameId}
            nextPhase={nextPhase}
          />
        )}
        {phase == Phases.Commit && (
          <CommitPhase
            gameId={gameId}
            cost={BigInt(cost)}
            number={number}
            secret={secret}
            endTime={endTime}
            blindedNumber={blindedNumber}
            setNumber={setNumber}
            setSecret={setSecret}
            setBlindedNumber={setBlindedNumber}
            nextPhase={nextPhase}
          />
        )}
        {phase == Phases.Reveal && (
          <RevealPhase
            gameId={gameId}
            selectedNumber={number}
            secret={secret}
            endTime={endTime}
            nextPhase={nextPhase}
          />
        )}
        {phase == Phases.EndGame && <EndGamePhase selectedNumber={number} />}
      </div>
    </>
  );
};

export default SubGame;
