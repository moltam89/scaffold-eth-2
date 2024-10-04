import { hardhat, mainnet, optimism } from "viem/chains";
import { WETH9 } from "./WETH9";
import { Address } from "viem";
import { Token } from "@uniswap/sdk-core";

const MAINNET_ADDRESSES = {
  [WETH9[mainnet.id].address]: { name: "ETH", decimals: 18 },
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": { name: "USDC", decimals: 6 },
  "0x6B175474E89094C44Da98b954EedeAC495271d0F": { name: "DAI", decimals: 18 },
}

export const TOKEN_ADDRESSES: { [chainId: number]: { [address: string]: { name: string; decimals: number } } } = {
    [hardhat.id]: MAINNET_ADDRESSES, // hardhat fork mainnet
    [mainnet.id]: MAINNET_ADDRESSES,
    [optimism.id]: {
      [WETH9[optimism.id].address]: { name: "ETH", decimals: 18 },
      "0x7F5c764cBc14f9669B88837ca1490cCa17c31607": { name: "USDC", decimals: 6 },
      "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1": { name: "DAI", decimals: 18 },
    },
  };

  export function getToken(chainId: number, tokenAddress: Address): Token {
    const tokenData = TOKEN_ADDRESSES[chainId][tokenAddress];
  
    return new Token(chainId, tokenAddress, tokenData.decimals, tokenData.name);
  }

  export function isTokenWETH(token: Token): boolean {
    return token.address === WETH9[token.chainId].address;
  }