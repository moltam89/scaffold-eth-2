interface IManualPayloadExample {
    function getLatestEthPrice(bytes calldata redstonePayload) external view returns (uint256);
    function getLatestUSDCPrice(bytes calldata redstonePayload) external view returns (uint256);
    function getLatestPrice(bytes calldata redstonePayload, bytes32 assetDataFeedId) external view returns (uint256);
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


contract GetManualOraclePrice {
  address public manualPayloadExampleAddress;

  constructor(address _manualPayloadExampleAddress) {
    manualPayloadExampleAddress = _manualPayloadExampleAddress;
  }

  function getEthPrice(bytes calldata redstonePayload) public view returns (uint256) {
    return IManualPayloadExample(manualPayloadExampleAddress).getLatestEthPrice(redstonePayload);
  }

  function getUSDCPrice(bytes calldata redstonePayload) public view returns (uint256) {
    return IManualPayloadExample(manualPayloadExampleAddress).getLatestUSDCPrice(redstonePayload);
  }

  function getPrice(bytes calldata redstonePayload, bytes32 assetDataFeedId) public view returns (uint256) {
    return IManualPayloadExample(manualPayloadExampleAddress).getLatestPrice(redstonePayload, assetDataFeedId);
  }
}
