// Source: Uniswap, same as SwapRouter02Executor.sol, but instead of imports, interfaces and structs are copied, whitelistedCaller removed
// https://github.com/Uniswap/UniswapX/blob/9ba6ffd048e3d8c561d639af64846471d13ae659/src/sample-executors/SwapRouter02Executor.sol

// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

import { Owned } from "solmate/src/auth/Owned.sol";
import { SafeTransferLib } from "solmate/src/utils/SafeTransferLib.sol";
import { ERC20 } from "solmate/src/tokens/ERC20.sol";
import { WETH } from "solmate/src/tokens/WETH.sol";

// import {IReactorCallback} from "../interfaces/IReactorCallback.sol";
// import {IReactor} from "../interfaces/IReactor.sol";
//import {CurrencyLibrary} from "../lib/CurrencyLibrary.sol";
// import {ResolvedOrder, SignedOrder} from "../base/ReactorStructs.sol";
// import {ISwapRouter02} from "../external/ISwapRouter02.sol";

/// @notice Callback for executing orders through a reactor.
interface IReactorCallback {
	/// @notice Called by the reactor during the execution of an order
	/// @param resolvedOrders Has inputs and outputs
	/// @param callbackData The callbackData specified for an order execution
	/// @dev Must have approved each token and amount in outputs to the msg.sender
	function reactorCallback(
		ResolvedOrder[] memory resolvedOrders,
		bytes memory callbackData
	) external;
}

struct ExactInputSingleParams {
	address tokenIn;
	address tokenOut;
	uint24 fee;
	address recipient;
	uint256 amountIn;
	uint256 amountOutMinimum;
	uint160 sqrtPriceLimitX96;
}

struct ExactInputParams {
	bytes path;
	address recipient;
	uint256 amountIn;
	uint256 amountOutMinimum;
}

interface ISwapRouter02 {
	function exactInput(
		ExactInputParams calldata params
	) external payable returns (uint256 amountOut);

	function exactInputSingle(
		ExactInputSingleParams calldata params
	) external payable returns (uint256 amountOut);

	function multicall(
		uint256 deadline,
		bytes[] calldata data
	) external payable returns (bytes[] memory results);

	function swapExactTokensForTokens(
		uint256 amountIn,
		uint256 amountOutMin,
		address[] calldata path,
		address to
	) external payable returns (uint256 amountOut);

	function unwrapWETH9(uint256 amountMinimum) external payable;

	function WETH9() external view returns (address);
}

/// @notice A fill contract that uses SwapRouter02 to execute trades
contract SwapRouter02Executor is IReactorCallback, Owned {
	using SafeTransferLib for ERC20;
	//using CurrencyLibrary for address;

	// /// @notice thrown if reactorCallback is called with a non-whitelisted filler
	// error CallerNotWhitelisted();
	/// @notice thrown if reactorCallback is called by an address other than the reactor
	error MsgSenderNotReactor();

	ISwapRouter02 private immutable swapRouter02;
	//address private immutable whitelistedCaller;
	IReactor private immutable reactor;
	WETH private immutable weth;

	// modifier onlyWhitelistedCaller() {
	// 	if (msg.sender != whitelistedCaller) {
	// 		revert CallerNotWhitelisted();
	// 	}
	// 	_;
	// }

	modifier onlyReactor() {
		if (msg.sender != address(reactor)) {
			revert MsgSenderNotReactor();
		}
		_;
	}

	constructor(
		//address _whitelistedCaller,
		IReactor _reactor,
		address _owner,
		ISwapRouter02 _swapRouter02
	) Owned(_owner) {
		//whitelistedCaller = _whitelistedCaller;
		reactor = _reactor;
		swapRouter02 = _swapRouter02;
		weth = WETH(payable(_swapRouter02.WETH9()));
	}

	/// @notice assume that we already have all output tokens
	function execute(
		SignedOrder calldata order,
		bytes calldata callbackData
	//) external onlyWhitelistedCaller {
	) external {
		reactor.executeWithCallback(order, callbackData);
	}

	/// @notice assume that we already have all output tokens
	function executeBatch(
		SignedOrder[] calldata orders,
		bytes calldata callbackData
	//) external onlyWhitelistedCaller {
	) external {
		reactor.executeBatchWithCallback(orders, callbackData);
	}

	/// @notice fill UniswapX orders using SwapRouter02
	/// @param callbackData It has the below encoded:
	/// address[] memory tokensToApproveForSwapRouter02: Max approve these tokens to swapRouter02
	/// address[] memory tokensToApproveForReactor: Max approve these tokens to reactor
	/// bytes[] memory multicallData: Pass into swapRouter02.multicall()
	function reactorCallback(
		ResolvedOrder[] calldata,
		bytes calldata callbackData
	) external onlyReactor {
		(
			address[] memory tokensToApproveForSwapRouter02,
			address[] memory tokensToApproveForReactor,
			bytes[] memory multicallData
		) = abi.decode(callbackData, (address[], address[], bytes[]));

		unchecked {
			for (
				uint256 i = 0;
				i < tokensToApproveForSwapRouter02.length;
				i++
			) {
				ERC20(tokensToApproveForSwapRouter02[i]).safeApprove(
					address(swapRouter02),
					type(uint256).max
				);
			}

			for (uint256 i = 0; i < tokensToApproveForReactor.length; i++) {
				ERC20(tokensToApproveForReactor[i]).safeApprove(
					address(reactor),
					type(uint256).max
				);
			}
		}

		swapRouter02.multicall(type(uint256).max, multicallData);

		// transfer any native balance to the reactor
		// it will refund any excess
		if (address(this).balance > 0) {
			//CurrencyLibrary.transferNative(address(reactor), address(this).balance);
			(bool success, ) = address(reactor).call{
				value: address(this).balance
			}("");
			require(success, "NativeTransferFailed");
		}
	}

	/// @notice This function can be used to convert ERC20s to ETH that remains in this contract
	/// @param tokensToApprove Max approve these tokens to swapRouter02
	/// @param multicallData Pass into swapRouter02.multicall()
	function multicall(
		ERC20[] calldata tokensToApprove,
		bytes[] calldata multicallData
	) external onlyOwner {
		for (uint256 i = 0; i < tokensToApprove.length; i++) {
			tokensToApprove[i].safeApprove(
				address(swapRouter02),
				type(uint256).max
			);
		}
		swapRouter02.multicall(type(uint256).max, multicallData);
	}

	/// @notice Unwraps the contract's WETH9 balance and sends it to the recipient as ETH. Can only be called by owner.
	/// @param recipient The address receiving ETH
	function unwrapWETH(address recipient) external onlyOwner {
		uint256 balanceWETH = weth.balanceOf(address(this));

		weth.withdraw(balanceWETH);
		SafeTransferLib.safeTransferETH(recipient, address(this).balance);
	}

	/// @notice Transfer all ETH in this contract to the recipient. Can only be called by owner.
	/// @param recipient The recipient of the ETH
	function withdrawETH(address recipient) external onlyOwner {
		SafeTransferLib.safeTransferETH(recipient, address(this).balance);
	}

	/// @notice Necessary for this contract to receive ETH when calling unwrapWETH()
	receive() external payable {}
}

/// @dev generic concrete order that specifies exact tokens which need to be sent and received
struct ResolvedOrder {
	OrderInfo info;
	InputToken input;
	OutputToken[] outputs;
	bytes sig;
	bytes32 hash;
}

/// @dev generic order information
///  should be included as the first field in any concrete order types
struct OrderInfo {
	// The address of the reactor that this order is targeting
	// Note that this must be included in every order so the swapper
	// signature commits to the specific reactor that they trust to fill their order properly
	IReactor reactor;
	// The address of the user which created the order
	// Note that this must be included so that order hashes are unique by swapper
	address swapper;
	// The nonce of the order, allowing for signature replay protection and cancellation
	uint256 nonce;
	// The timestamp after which this order is no longer valid
	uint256 deadline;
	// Custom validation contract
	IValidationCallback additionalValidationContract;
	// Encoded validation params for additionalValidationContract
	bytes additionalValidationData;
}

/// @dev tokens that need to be sent from the swapper in order to satisfy an order
struct InputToken {
	ERC20 token;
	uint256 amount;
	// Needed for dutch decaying inputs
	uint256 maxAmount;
}

/// @dev tokens that need to be received by the recipient in order to satisfy an order
struct OutputToken {
	address token;
	uint256 amount;
	address recipient;
}

/// @dev external struct including a generic encoded order and swapper signature
///  The order bytes will be parsed and mapped to a ResolvedOrder in the concrete reactor contract
struct SignedOrder {
	bytes order;
	bytes sig;
}

/// @notice Interface for order execution reactors
interface IReactor {
	/// @notice Execute a single order
	/// @param order The order definition and valid signature to execute
	function execute(SignedOrder calldata order) external payable;

	/// @notice Execute a single order using the given callback data
	/// @param order The order definition and valid signature to execute
	/// @param callbackData The callbackData to pass to the callback
	function executeWithCallback(
		SignedOrder calldata order,
		bytes calldata callbackData
	) external payable;

	/// @notice Execute the given orders at once
	/// @param orders The order definitions and valid signatures to execute
	function executeBatch(SignedOrder[] calldata orders) external payable;

	/// @notice Execute the given orders at once using a callback with the given callback data
	/// @param orders The order definitions and valid signatures to execute
	/// @param callbackData The callbackData to pass to the callback
	function executeBatchWithCallback(
		SignedOrder[] calldata orders,
		bytes calldata callbackData
	) external payable;
}

/// @notice Callback to validate an order
interface IValidationCallback {
	/// @notice Called by the reactor for custom validation of an order. Will revert if validation fails
	/// @param filler The filler of the order
	/// @param resolvedOrder The resolved order to fill
	function validate(
		address filler,
		ResolvedOrder calldata resolvedOrder
	) external view;
}
