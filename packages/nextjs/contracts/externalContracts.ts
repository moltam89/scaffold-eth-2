import { erc20Abi } from "viem";
import { arbitrum, base, hardhat, mainnet, optimism, polygon } from "viem/chains";
import { UniswapV2FactoryABI, UniswapV2PairABI, UniswapV2Router02ABI } from "~~/app/uniswap/_helpers/UniswapV2ABIs";
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

/**
 * @example
 * const externalContracts = {
 *   1: {
 *     DAI: {
 *       address: "0x...",
 *       abi: [...],
 *     },
 *   },
 * } as const;
 */

const mainnetExternalContracts = {
  UniswapV2Factory: {
    address: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    abi: UniswapV2FactoryABI,
  },
  UniswapV2Router02: {
    address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    abi: UniswapV2Router02ABI,
  },
  DAI: {
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    abi: erc20Abi,
  },
  USDC: {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    abi: erc20Abi,
  },
  DAI_WETH_PAIR: {
    address: "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11",
    abi: UniswapV2PairABI,
  },
  DAI_USDC_PAIR: {
    address: "0xAE461cA67B15dc8dc81CE7615e0320dA1A9aB8D5",
    abi: UniswapV2PairABI,
  },
  USDC_WETH_PAIR: {
    address: "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc",
    abi: UniswapV2PairABI,
  },
} as const;

const externalContracts = {
  [hardhat.id]: mainnetExternalContracts,
  [mainnet.id]: mainnetExternalContracts,
  [arbitrum.id]: {
    UniswapV2Factory: {
      address: "0xf1D7CC64Fb4452F05c498126312eBE29f30Fbcf9",
      abi: UniswapV2FactoryABI,
    },
    UniswapV2Router02: {
      address: "0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24",
      abi: UniswapV2Router02ABI,
    },
    DAI_WETH_PAIR: {
      address: "0x8dca5a5DBA32cA529594d43F86ED4210EaD2Ed83",
      abi: UniswapV2PairABI,
    },
  },
  [base.id]: {
    UniswapV2Factory: {
      address: "0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6",
      abi: UniswapV2FactoryABI,
    },
    UniswapV2Router02: {
      address: "0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24",
      abi: UniswapV2Router02ABI,
    },
    DAI_WETH_PAIR: {
      address: "0xb2839134B8151964f19f6f3c7D59C70ae52852F5",
      abi: UniswapV2PairABI,
    },
  },
  [optimism.id]: {
    UniswapV2Factory: {
      address: "0x0c3c1c532F1e39EdF36BE9Fe0bE1410313E074Bf",
      abi: UniswapV2FactoryABI,
    },
    UniswapV2Router02: {
      address: "0x4A7b5Da61326A6379179b40d00F57E5bbDC962c2",
      abi: UniswapV2Router02ABI,
    },
    DAI_WETH_PAIR: {
      address: "0xaBA4C3652F212e8006E52Fbd5547a12B86390003",
      abi: UniswapV2PairABI,
    },
  },
  [polygon.id]: {
    UniswapV2Factory: {
      address: "0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C",
      abi: UniswapV2FactoryABI,
    },
    UniswapV2Router02: {
      address: "0xedf6066a2b290C185783862C7F4776A2C8077AD1",
      abi: UniswapV2Router02ABI,
    },
    DAI_WETH_PAIR: {
      address: "0x38d7B6A3bcA735633dDD9927a8C6bC60371326Ea",
      abi: UniswapV2PairABI,
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
