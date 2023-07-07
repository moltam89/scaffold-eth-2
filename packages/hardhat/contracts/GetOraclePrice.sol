interface IRapidExample {
    function getLatestEthPrice() external view returns (uint256);
    function getLatestUSDCPrice() external view returns (uint256);
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


contract GetOraclePrice {
  /**
   * Returns the latest price of ETH
   */
  function getLatestEthPrice() public view returns (uint256) {
    return IRapidExample(0x717CE2Df7fc98792852fb6d45Cd4Cb165a5D159e).getLatestEthPrice();
  }

  /**
   * Returns the latest price of USDC
   */
  function getLatestUSDCPrice() public view returns (uint256) {
    return IRapidExample(0x717CE2Df7fc98792852fb6d45Cd4Cb165a5D159e).getLatestUSDCPrice();
  }
}
