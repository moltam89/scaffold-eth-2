pragma solidity ^0.8.0;

contract TestArrays {
	address[] public addresses;
	bool[] public booleans;
	uint[] public numbers;

	function addAddress(address address_) external {
		addresses.push(address_);
	}

	function addAddresssArray(address[] calldata addressesArray) external {
		for (uint i = 0; i < addressesArray.length; i++) {
			addresses.push(addressesArray[i]);
		}
	}

	function addBoolean(bool boolean) external {
		booleans.push(boolean);
	}

	function addBooleansArray(bool[] calldata booleansArray) external {
		for (uint i = 0; i < booleansArray.length; i++) {
			booleans.push(booleansArray[i]);
		}
	}

	function addNumber(uint number) external {
		numbers.push(number);
	}

	function addNumbersArray(uint[] calldata numbersArray) external {
		for (uint i = 0; i < numbersArray.length; i++) {
			numbers.push(numbersArray[i]);
		}
	}
}