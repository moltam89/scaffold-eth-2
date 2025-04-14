import {
  TOKENS,
  UNISWAP_V3_USDC_INPUT_AMOUNT,
  UNISWAP_V3_USDC_USDT_POOL_ADDRESS,
  UNISWAP_V3_USDT_OUTPUT_AMOUNT,
  USDC_ADDRESS,
  USDT_ADDRESS,
} from "../_helpers/constants";
import { formatTokenAmount } from "../_helpers/helpers";
import { Info } from "./Info";
import { TokenDisplay } from "./TokenDisplay";

export const UniswapV3_USDC_USDT_Pool = () => {
  return (
    <div className="p-6 bg-base-200 rounded-lg shadow-md">
      <Info dataTip="We use the UniswapV3 USDC-USDT pool for liquidity. At intent creation, the pool offered 1001.38 USDC ➡️ 1001.80 USDT. On Arbitrum, this rate varies with market conditions, but in our local setup, it stays constant." />

      <div className="text-center mb-4">
        <a
          href={`https://arbiscan.io/address/${UNISWAP_V3_USDC_USDT_POOL_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
          className="link link-accent"
        >
          V3 Pool
        </a>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4 text-2xl">
          <TokenDisplay token={TOKENS[USDC_ADDRESS]} />
          <TokenDisplay token={TOKENS[USDT_ADDRESS]} />
        </div>
        <div className="flex items-center gap-4 text-2xl">
          <div className="badge badge-primary">{formatTokenAmount(UNISWAP_V3_USDC_INPUT_AMOUNT)}</div>
          <div> {"->"}</div>
          <div className="badge badge-secondary">{formatTokenAmount(UNISWAP_V3_USDT_OUTPUT_AMOUNT)}</div>
        </div>
      </div>
    </div>
  );
};
