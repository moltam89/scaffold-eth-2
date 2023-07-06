const contracts = {
  280: [
    {
      chainId: "280",
      name: "zkSyncTestnet",
      contracts: {
        MyERC20: {
          address: "0x1a43e6741Ad9cE1FeAD3f9FEeb5C757f81C9131d",
          abi: [
            {
              inputs: [
                {
                  internalType: "string",
                  name: "name_",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "symbol_",
                  type: "string",
                },
                {
                  internalType: "uint8",
                  name: "decimals_",
                  type: "uint8",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "subtractedValue",
                  type: "uint256",
                },
              ],
              name: "decreaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "addedValue",
                  type: "uint256",
                },
              ],
              name: "increaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "mint",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        RapidExample: {
          address: "0x402CdcE5F1f4e85b37264EcAc1F35aCF40E609f5",
          abi: [
            {
              inputs: [],
              name: "CalldataMustHaveValidPayload",
              type: "error",
            },
            {
              inputs: [],
              name: "CalldataOverOrUnderFlow",
              type: "error",
            },
            {
              inputs: [],
              name: "CanNotPickMedianOfEmptyArray",
              type: "error",
            },
            {
              inputs: [],
              name: "DataPackageTimestampMustNotBeZero",
              type: "error",
            },
            {
              inputs: [],
              name: "DataPackageTimestampsMustBeEqual",
              type: "error",
            },
            {
              inputs: [],
              name: "EachSignerMustProvideTheSameValue",
              type: "error",
            },
            {
              inputs: [],
              name: "EmptyCalldataPointersArr",
              type: "error",
            },
            {
              inputs: [],
              name: "GetDataServiceIdNotImplemented",
              type: "error",
            },
            {
              inputs: [],
              name: "IncorrectUnsignedMetadataSize",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "receivedSignersCount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "requiredSignersCount",
                  type: "uint256",
                },
              ],
              name: "InsufficientNumberOfUniqueSigners",
              type: "error",
            },
            {
              inputs: [],
              name: "InvalidCalldataPointer",
              type: "error",
            },
            {
              inputs: [],
              name: "RedstonePayloadMustHaveAtLeastOneDataPackage",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "receivedSigner",
                  type: "address",
                },
              ],
              name: "SignerNotAuthorised",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "receivedTimestampSeconds",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "blockTimestamp",
                  type: "uint256",
                },
              ],
              name: "TimestampFromTooLongFuture",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "receivedTimestampSeconds",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "blockTimestamp",
                  type: "uint256",
                },
              ],
              name: "TimestampIsTooOld",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256[]",
                  name: "values",
                  type: "uint256[]",
                },
              ],
              name: "aggregateValues",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "extractTimestampsAndAssertAllAreEqual",
              outputs: [
                {
                  internalType: "uint256",
                  name: "extractedTimestamp",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "signerAddress",
                  type: "address",
                },
              ],
              name: "getAuthorisedSignerIndex",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getDataServiceId",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getLatestEthPrice",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getUniqueSignersThreshold",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "receivedTimestampMilliseconds",
                  type: "uint256",
                },
              ],
              name: "validateTimestamp",
              outputs: [],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        YourContract: {
          address: "0x4512745BDfF0A021d34c6662d70Ac5620b6f28B8",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "greetingSetter",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "newGreeting",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "premium",
                  type: "bool",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "GreetingChange",
              type: "event",
            },
            {
              inputs: [],
              name: "greeting",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "premium",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_newGreeting",
                  type: "string",
                },
              ],
              name: "setGreeting",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "totalCounter",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "userGreetingCounter",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        RapidExample: {
          address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
          abi: [
            {
              inputs: [],
              name: "CalldataMustHaveValidPayload",
              type: "error",
            },
            {
              inputs: [],
              name: "CalldataOverOrUnderFlow",
              type: "error",
            },
            {
              inputs: [],
              name: "CanNotPickMedianOfEmptyArray",
              type: "error",
            },
            {
              inputs: [],
              name: "DataPackageTimestampMustNotBeZero",
              type: "error",
            },
            {
              inputs: [],
              name: "DataPackageTimestampsMustBeEqual",
              type: "error",
            },
            {
              inputs: [],
              name: "EachSignerMustProvideTheSameValue",
              type: "error",
            },
            {
              inputs: [],
              name: "EmptyCalldataPointersArr",
              type: "error",
            },
            {
              inputs: [],
              name: "GetDataServiceIdNotImplemented",
              type: "error",
            },
            {
              inputs: [],
              name: "IncorrectUnsignedMetadataSize",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "receivedSignersCount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "requiredSignersCount",
                  type: "uint256",
                },
              ],
              name: "InsufficientNumberOfUniqueSigners",
              type: "error",
            },
            {
              inputs: [],
              name: "InvalidCalldataPointer",
              type: "error",
            },
            {
              inputs: [],
              name: "RedstonePayloadMustHaveAtLeastOneDataPackage",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "receivedSigner",
                  type: "address",
                },
              ],
              name: "SignerNotAuthorised",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "receivedTimestampSeconds",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "blockTimestamp",
                  type: "uint256",
                },
              ],
              name: "TimestampFromTooLongFuture",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "receivedTimestampSeconds",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "blockTimestamp",
                  type: "uint256",
                },
              ],
              name: "TimestampIsTooOld",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256[]",
                  name: "values",
                  type: "uint256[]",
                },
              ],
              name: "aggregateValues",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "extractTimestampsAndAssertAllAreEqual",
              outputs: [
                {
                  internalType: "uint256",
                  name: "extractedTimestamp",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "signerAddress",
                  type: "address",
                },
              ],
              name: "getAuthorisedSignerIndex",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getDataServiceId",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getLatestEthPrice",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getUniqueSignersThreshold",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "receivedTimestampMilliseconds",
                  type: "uint256",
                },
              ],
              name: "validateTimestamp",
              outputs: [],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
  11155111: [
    {
      chainId: "11155111",
      name: "sepolia",
      contracts: {
        YourContract: {
          address: "0x2F3307d5336661E49aE982D7385B63e2747078E2",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "greetingSetter",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "newGreeting",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "premium",
                  type: "bool",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "GreetingChange",
              type: "event",
            },
            {
              inputs: [],
              name: "greeting",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "premium",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_newGreeting",
                  type: "string",
                },
              ],
              name: "setGreeting",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "totalCounter",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "userGreetingCounter",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
