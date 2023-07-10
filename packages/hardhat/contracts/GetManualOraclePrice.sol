interface IManualPayloadExample {
    function getLatestEthPrice(bytes calldata redstonePayload) external view returns (uint256);
    function getLatestUSDCPrice(bytes calldata redstonePayload) external view returns (uint256);
    function getLatestPrice(bytes calldata redstonePayload, bytes32 assetDataFeedId) external view returns (uint256);
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


contract GetManualOraclePrice {
  function getEthPrice(bytes calldata redstonePayload) public view returns (uint256) {
    return IManualPayloadExample(0xCB01e966413706e87B1E7181a60A5e6ae88E877B).getLatestEthPrice(redstonePayload);
  }

  function getUSDCPrice(bytes calldata redstonePayload) public view returns (uint256) {
    return IManualPayloadExample(0xCB01e966413706e87B1E7181a60A5e6ae88E877B).getLatestUSDCPrice(redstonePayload);
  }

  function getPrice(bytes calldata redstonePayload, bytes32 assetDataFeedId) public view returns (uint256) {
    return IManualPayloadExample(0xCB01e966413706e87B1E7181a60A5e6ae88E877B).getLatestPrice(redstonePayload, assetDataFeedId);
  }
}
