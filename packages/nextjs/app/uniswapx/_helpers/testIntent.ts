import { OrderType } from "@banr1/uniswapx-sdk";
import { BigNumber } from "@ethersproject/bignumber";
import { RawOpenDutchIntentV2 } from "~~/types/banr1/raw-dutch-intent-v2";

export const parsedIntent: RawOpenDutchIntentV2 = {
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
