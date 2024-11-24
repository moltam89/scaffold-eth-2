export const CHAIN_ID_ARBITRUM = 42161;

// This has to be hardcoded, because swap calldata uses this address
export const SWAP_ROUTER_02_EXECUTOR_ADDRESS_HARDHAT = "0xCf027C4b03DC18A60422AB981b1Ea1A27EC2E06F";

export const USDC_ADDRESS = "0xaf88d065e77c8cc2239327c5edb3a432268e5831";
export const USDT_ADDRESS = "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9";

// https://docs.uniswap.org/contracts/uniswapx/guides/arbitrumfiller#filling-orders
export const V2_DUCTH_ORDER_REACTOR_ADDRESS = "0x1bd1aAdc9E230626C44a139d7E70d842749351eb";

// https://docs.uniswap.org/contracts/v3/reference/deployments/arbitrum-deployments
export const SWAP_ROUTER_02_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";

export const INTENT_INPUT_AMOUNT = 1001376542; // 1,001.376542 USDC

export const STRART_BLOCK_NUMBER = 267523713; // Oct-25-2024 01:43:24 PM +UTC, when the intent was created
export const STRART_BLOCK_TIMESTAMP = 1729863804; // Oct-25-2024 01:43:24 PM +UTC, when the intent was created
export const FIRST_FILL_BLOCK_TIMESTAMP = 1729863806; // Oct-25-2024 01:43:26 PM +UTC, first timestamp when the intent can be filled with V3 pool