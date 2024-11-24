import { ethers, network } from "hardhat";

import { SwapRouter02Executor } from "../typechain-types";

import { CosignedV2DutchOrder, OrderType } from "@banr1/uniswapx-sdk";
import { BigNumber } from "@ethersproject/bignumber";
import { defaultAbiCoder } from "@ethersproject/abi";

import { SignedOrderStruct } from "../typechain-types/contracts/SwapRouter02Executor.sol/SwapRouter02Executor";

import { Contract } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { RawOpenDutchIntentV2 } from "./types/banr1/raw-dutch-intent-v2";
import { CHAIN_ID_ARBITRUM, FIRST_FILL_BLOCK_TIMESTAMP, STRART_BLOCK_NUMBER, STRART_BLOCK_TIMESTAMP, SWAP_ROUTER_02_EXECUTOR_ADDRESS_HARDHAT, USDC_ADDRESS, USDT_ADDRESS } from "../constants/constants";

const providerApiKey = process.env.ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

const PERMIT2_ADDRESS = "0x000000000022D473030F116dDEE9F6B43aC78BA3";

const ERC20_ABI =
  '[ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" } ]';


describe("UniswapX_Fill_SwapRouter", function () {
  let swapRouter02Executor: SwapRouter02Executor;
  let usdt: Contract;
  let deployer: HardhatEthersSigner;
  before(async () => {
    [deployer] = await ethers.getSigners();

    usdt = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, deployer);

    await ethers.provider.send("hardhat_reset", [
      {
        forking: {
          jsonRpcUrl: `https://arb-mainnet.alchemyapi.io/v2/${providerApiKey}`,
          blockNumber: STRART_BLOCK_NUMBER,
        },
      },
    ]);
    await network.provider.send("evm_setNextBlockTimestamp", [FIRST_FILL_BLOCK_TIMESTAMP]);
  });

  after(async () => {
    await ethers.provider.send("hardhat_reset", [
      {
        forking: {
          jsonRpcUrl: `https://arb-mainnet.alchemyapi.io/v2/${providerApiKey}`,
          blockNumber: STRART_BLOCK_NUMBER,
        },
      },
    ]);
    await network.provider.send("evm_setNextBlockTimestamp", [STRART_BLOCK_TIMESTAMP]);
  });

  beforeEach(async function () {
    const swapRouter02ExecutorFactory = await ethers.getContractFactory("SwapRouter02Executor");
    swapRouter02Executor = (await swapRouter02ExecutorFactory.deploy(
      "0x1bd1aAdc9E230626C44a139d7E70d842749351eb",
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    )) as SwapRouter02Executor;
    await swapRouter02Executor.waitForDeployment();
  });

  describe("Fill", function () {
    it("Should work", async function () {
      console.log("swapRouter02Executor address:", await swapRouter02Executor.getAddress());

      const usdtBalanceBefore = await usdt.balanceOf(SWAP_ROUTER_02_EXECUTOR_ADDRESS_HARDHAT);
      expect(usdtBalanceBefore).to.equal(0);

      console.log("USDT Balance before:", ethers.formatUnits(usdtBalanceBefore, 6));

      const parsedIntent: RawOpenDutchIntentV2 = {
        type: OrderType.Dutch_V2,
        orderStatus: "open",
        signature:
          "0xea40b047ca77fb2660efaf66c7907e1d6963c4bc052661f0a16b413c730c7d7573549fb5a7e6e094f97c66a47f1273be4e9b2121a20fc8d6460a9d672304583b1c",
        encodedOrder:
          "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001000000000000000000000000004449cd34d1eb1fedcf02a1be3834ffde8e6a6180000000000000000000000000af88d065e77c8cc2239327c5edb3a432268e5831000000000000000000000000000000000000000000000000000000003bafcb1e000000000000000000000000000000000000000000000000000000003bafcb1e00000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000000028000000000000000000000000000000000000000000000000000000000000003800000000000000000000000001bd1aadc9e230626c44a139d7e70d842749351eb00000000000000000000000001f1642ccd7d9b6d350a40e58eb20efa8f536269c6b0afe0a0b23a7fa24b72c69f8c0fe697f4e19c597e52af58c53215ad70fe0000000000000000000000000000000000000000000000000000000000671ba0bf000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000fd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9000000000000000000000000000000000000000000000000000000003bbc44eb000000000000000000000000000000000000000000000000000000003b6fb3cb00000000000000000000000001f1642ccd7d9b6d350a40e58eb20efa8f53626900000000000000000000000000000000000000000000000000000000671ba07c00000000000000000000000000000000000000000000000000000000671ba08c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000003bbc44eb0000000000000000000000000000000000000000000000000000000000000041586b516924b46b7322e2ea74ccfa6c685a0fdc4bacc04081aec6fc4701445662281df99f65e0691533caf7226f33503ae1d1ed34532265256427a66a6202d3fa1c00000000000000000000000000000000000000000000000000000000000000",
        chainId: 42161,
        nonce: Number("89870122964449767953678845079086458213376210543041501666239387981061358157312"),
        orderHash: "0xe127ef2aceec72ac151b270cb0aebf6ccf3046903b3a4acee802faa0c2c26b13",
        swapper: "0x01f1642cCD7D9B6d350a40E58EB20efA8F536269",
        input: {
          token: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
          startAmount: BigNumber.from("1001376542"),
          endAmount: BigNumber.from("1001376542"),
        },
        outputs: [
          {
            token: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
            startAmount: BigNumber.from("1002194155"),
            endAmount: BigNumber.from("997176267"),
            recipient: "0x01f1642cCD7D9B6d350a40E58EB20efA8F536269",
          },
        ],
        cosignerData: {
          decayStartTime: 1729863804,
          decayEndTime: 1729863820,
          exclusiveFiller: "0x0000000000000000000000000000000000000000",
          inputOverride: BigNumber.from("0"),
          outputOverrides: [BigNumber.from("1002194155")],
          exclusivityOverrideBps: BigNumber.from("100"),
        },
        cosignature:
          "0x586b516924b46b7322e2ea74ccfa6c685a0fdc4bacc04081aec6fc4701445662281df99f65e0691533caf7226f33503ae1d1ed34532265256427a66a6202d3fa1c",
        quoteId: "4f00197e-1ef7-4363-8095-094f66c8e118",
        requestId: "4f00197e-1ef7-4363-8095-094f66c8e118",
        createdAt: 1729863804,
      };

      const intent = CosignedV2DutchOrder.parse(parsedIntent.encodedOrder, CHAIN_ID_ARBITRUM, PERMIT2_ADDRESS);
      const signature = parsedIntent.signature;

      const signedIntent: SignedOrderStruct = {
        order: intent.serialize() as any, // Cast to any to match the expected type
        sig: signature as any, // Cast to any to match the expected type
      };

      console.log("signedIntent", signedIntent);

      const tokensToApproveForSwapRouter02 = [USDT_ADDRESS, USDC_ADDRESS];
      const tokensToApproveForReactor = [USDT_ADDRESS, USDC_ADDRESS];
      const swapRouterCallData = [
        "0x5ae401dc00000000000000000000000000000000000000000000000000000000672a815d00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000e404e45aaf000000000000000000000000af88d065e77c8cc2239327c5edb3a432268e5831000000000000000000000000fd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb90000000000000000000000000000000000000000000000000000000000000064000000000000000000000000cf027c4b03dc18a60422ab981b1ea1a27ec2e06f000000000000000000000000000000000000000000000000000000003bafcb1e000000000000000000000000000000000000000000000000000000003b6a3bef000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      ];

      const callBackData = defaultAbiCoder.encode(
        ["address[]", "address[]", "bytes[]"],
        [tokensToApproveForSwapRouter02, tokensToApproveForReactor, swapRouterCallData],
      );
      console.log("callBackData", callBackData);

      const result = await swapRouter02Executor.execute(signedIntent, callBackData);
      console.log("result", result);

      const usdtBalanceAfter = await usdt.balanceOf(SWAP_ROUTER_02_EXECUTOR_ADDRESS_HARDHAT);
      expect(usdtBalanceAfter).to.greaterThan(0);

      console.log("USDT Balance after:", ethers.formatUnits(usdtBalanceAfter, 6));
    });
  });
});
