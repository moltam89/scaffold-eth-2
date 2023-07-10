const contracts = {
  280: [
    {
      chainId: "280",
      name: "zkSyncTestnet",
      contracts: {
        GetManualOraclePrice: {
          address: "0xec25b2a6AE45AC2D8a1334bf9b81b395513a7E0A",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_manualPayloadExampleAddress",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "redstonePayload",
                  type: "bytes",
                },
              ],
              name: "getEthPrice",
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
                  internalType: "bytes",
                  name: "redstonePayload",
                  type: "bytes",
                },
                {
                  internalType: "bytes32",
                  name: "assetDataFeedId",
                  type: "bytes32",
                },
              ],
              name: "getPrice",
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
                  internalType: "bytes",
                  name: "redstonePayload",
                  type: "bytes",
                },
              ],
              name: "getUSDCPrice",
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
              name: "manualPayloadExampleAddress",
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
          ],
        },
        ManualPayloadExample: {
          address: "0xb1C4529BC1Ea4A05CDcDDBDE891B7d2B25fa8Cbc",
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
              inputs: [
                {
                  internalType: "bytes",
                  name: "redstonePayload",
                  type: "bytes",
                },
              ],
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
              inputs: [
                {
                  internalType: "bytes",
                  name: "redstonePayload",
                  type: "bytes",
                },
                {
                  internalType: "bytes32",
                  name: "assetDataFeedId",
                  type: "bytes32",
                },
              ],
              name: "getLatestPrice",
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
                  internalType: "bytes",
                  name: "redstonePayload",
                  type: "bytes",
                },
              ],
              name: "getLatestUSDCPrice",
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
                  internalType: "bytes32",
                  name: "assetId",
                  type: "bytes32",
                },
              ],
              name: "proxyRequestToBaseContract",
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
        MyPaymaster: {
          address: "0x534a200b8523842c1f5650534825b252d8bd914c",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_erc20",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "allowedToken",
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
              inputs: [
                {
                  internalType: "bytes",
                  name: "_context",
                  type: "bytes",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "txType",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "from",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "to",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "gasLimit",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "gasPerPubdataByteLimit",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "maxFeePerGas",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "maxPriorityFeePerGas",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "paymaster",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "nonce",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "value",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256[4]",
                      name: "reserved",
                      type: "uint256[4]",
                    },
                    {
                      internalType: "bytes",
                      name: "data",
                      type: "bytes",
                    },
                    {
                      internalType: "bytes",
                      name: "signature",
                      type: "bytes",
                    },
                    {
                      internalType: "bytes32[]",
                      name: "factoryDeps",
                      type: "bytes32[]",
                    },
                    {
                      internalType: "bytes",
                      name: "paymasterInput",
                      type: "bytes",
                    },
                    {
                      internalType: "bytes",
                      name: "reservedDynamic",
                      type: "bytes",
                    },
                  ],
                  internalType: "struct Transaction",
                  name: "_transaction",
                  type: "tuple",
                },
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
                {
                  internalType: "enum ExecutionResult",
                  name: "_txResult",
                  type: "uint8",
                },
                {
                  internalType: "uint256",
                  name: "_maxRefundedGas",
                  type: "uint256",
                },
              ],
              name: "postTransaction",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "txType",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "from",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "to",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "gasLimit",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "gasPerPubdataByteLimit",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "maxFeePerGas",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "maxPriorityFeePerGas",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "paymaster",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "nonce",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "value",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256[4]",
                      name: "reserved",
                      type: "uint256[4]",
                    },
                    {
                      internalType: "bytes",
                      name: "data",
                      type: "bytes",
                    },
                    {
                      internalType: "bytes",
                      name: "signature",
                      type: "bytes",
                    },
                    {
                      internalType: "bytes32[]",
                      name: "factoryDeps",
                      type: "bytes32[]",
                    },
                    {
                      internalType: "bytes",
                      name: "paymasterInput",
                      type: "bytes",
                    },
                    {
                      internalType: "bytes",
                      name: "reservedDynamic",
                      type: "bytes",
                    },
                  ],
                  internalType: "struct Transaction",
                  name: "_transaction",
                  type: "tuple",
                },
              ],
              name: "validateAndPayForPaymasterTransaction",
              outputs: [
                {
                  internalType: "bytes4",
                  name: "magic",
                  type: "bytes4",
                },
                {
                  internalType: "bytes",
                  name: "context",
                  type: "bytes",
                },
              ],
              stateMutability: "payable",
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
