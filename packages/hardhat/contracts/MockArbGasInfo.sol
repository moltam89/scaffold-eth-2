// https://docs.arbitrum.io/build-decentralized-apps/precompiles/reference#arbgasinfo
// This is a hack to mock the precompiled ArbGasInfo (0x000000000000000000000000000000000000006c)
// This is needed to get swap calldata via smart-order-router
// This contract's bytecode can be injected to the precompiled address

// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

// ArbGasInfo interface definition
interface ArbGasInfo {
	function getPricesInWeiWithAggregator(
		address aggregator
	)
		external
		view
		returns (uint256, uint256, uint256, uint256, uint256, uint256);

	function getPricesInWei()
		external
		view
		returns (uint256, uint256, uint256, uint256, uint256, uint256);

	function getMinimumGasPrice() external view returns (uint256);

	function getL1BaseFeeEstimate() external view returns (uint256);

	function getL1RewardRecipient() external view returns (address);
}

// Mock contract implementing ArbGasInfo with default values
contract MockArbGasInfo is ArbGasInfo {
	function getPricesInWeiWithAggregator(
		address
	)
		external
		pure
		override
		returns (uint256, uint256, uint256, uint256, uint256, uint256)
	{
		return (1000, 200, 300, 400, 500, 600); // Mocked values
	}

	function getPricesInWei()
		external
		pure
		override
		returns (uint256, uint256, uint256, uint256, uint256, uint256)
	{
		return (1000, 200, 300, 400, 500, 600); // Mocked values
	}

	function getMinimumGasPrice() external pure override returns (uint256) {
		return 100; // Mocked minimum gas price
	}

	function getL1BaseFeeEstimate() external pure override returns (uint256) {
		return 150; // Mocked L1 base fee
	}

	function getL1RewardRecipient() external pure override returns (address) {
		return address(0x123); // Mocked reward recipient address
	}
}
