interface IManualPayloadExample {
    function getLatestPrice(bytes calldata redstonePayload, bytes32 assetDataFeedId) external view returns (uint256);
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


contract GetManualOraclePrice {
  address public manualPayloadExampleAddress;

  constructor(address _manualPayloadExampleAddress) {
    manualPayloadExampleAddress = _manualPayloadExampleAddress;
  }

  function getPrice(bytes calldata redstonePayload, bytes32 assetDataFeedId) public view returns (uint256) {
    return IManualPayloadExample(manualPayloadExampleAddress).getLatestPrice(redstonePayload, assetDataFeedId);
  }
}
