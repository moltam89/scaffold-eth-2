import { BigNumber } from "@ethersproject/bignumber";

export type TokenDetails = {
    name: string;
    imgSrc?: string;
  };

export type IntentTimestampAmount = [number, BigNumber];