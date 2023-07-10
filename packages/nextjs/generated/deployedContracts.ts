const contracts = {
  280: [
    {
      chainId: "280",
      name: "zkSyncTestnet",
      contracts: {
        GetManualOraclePrice: {
          address: "0x238899D42F3550650dab1c9C4dF860d94b45dA83",
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
          address: "0x6B3776E1E314f0e734b6280d5425429aEd25eB13",
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
      },
    },
  ],
} as const;

export default contracts;
