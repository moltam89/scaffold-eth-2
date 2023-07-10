interface IManualPayloadExample {
    function getLatestPrice(bytes calldata redstonePayload, bytes32 assetDataFeedId) external view returns (uint256);
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


contract GetManualOraclePrice {
  function getPrice(bytes calldata redstonePayload, bytes32 assetDataFeedId) public view returns (uint256) {
    return IManualPayloadExample(0x3B0AAD4e39F484e346125d64f936F12dB8fbBD04).getLatestPrice(redstonePayload, assetDataFeedId);
  }
}
