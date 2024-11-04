# UniswapX Fill

This branch of `scaffold-eth-2` demonstrates how to fill [UniswapX](https://docs.uniswap.org/contracts/uniswapx/overview) intents.
<br></br>
Resources: **Titania Research**: [How to become a filler ](https://titaniaresear.ch/how-to-become-a-filler)

## Overview

Filling UniswapX intents is a highly competitive area, as fillers compete for profit. Because professional fillers execute transactions quickly using real-time data, live data isn't feasible for a demo project like this. Instead, we use a past fill intent to simulate the process.

We fork the Arbitrum chain at block number 267523722 and use an old intent that was already filled.
 - Original Transaction: [Arbiscan](https://arbiscan.io/tx/0xe54b1a83b816bc2eb0fec9f3c7c1794030dcd5e57778f019b74d6d3133441b75)
- MEV Analysis: [Eigenphi Transaction](https://eigenphi.io/mev/eigentx/0xe54b1a83b816bc2eb0fec9f3c7c1794030dcd5e57778f019b74d6d3133441b75)

In this example, someone used a UniswapV3 pool to fill the intent and earned a small profit.

## Test Details

The [UniswapX_Fill_SwapRouter](https://github.com/moltam89/scaffold-eth-2/blob/e887f28a02f87da67d25ecf2183ef3bb20d6e1fa/packages/hardhat/test/UniswapX_Fill_SwapRouter.ts) test simulates this trancaction.

1. **Reset the chain** to block number **267523722**.
2. **Deploy** the `SwapRouter02Executor` contract, a sample from the UniswapX [repository](https://github.com/Uniswap/UniswapX/blob/main/src/sample-executors/SwapRouter02Executor.sol).
3. **Verify** that the `SwapRouter02Executor` contract has no USDT.
4. **Fill the intent**.
5. **Assert** that the USDT balance of `SwapRouter02Executor` has increased, indicating a profit from filling the intent.

## Quickstart

In packages/hardhat/.env, add your forking URL as follows: `FORKING_URL=https://eth-mainnet.g.alchemy.com/v2/{your_api_key}`

```
yarn chain
```

```
yarn test
```
