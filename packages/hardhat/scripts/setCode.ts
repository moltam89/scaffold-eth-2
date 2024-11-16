// Bypass issue with precompiles not being available on Arbitrum fork
// https://docs.arbitrum.io/build-decentralized-apps/precompiles/reference

import { ethers } from "ethers";

async function setCode() {
  // Connect to the local Hardhat node
  const provider = new ethers.JsonRpcProvider("http://localhost:8545");

  // Example bytecode to return ArbGasInfo
  const bytecode =
    "0x608060405234801561001057600080fd5b50600436106100575760003560e01c806341b247a81461005c5780639e6d7e31146100a0578063ba9c916e146100b0578063f5d6ded7146100d8578063f918379a146100e9575b600080fd5b6103e860c861012c6101906101f46102585b604080519687526020870195909552938501929092526060840152608083015260a082015260c0015b60405180910390f35b6040516101238152602001610097565b61006e6100be3660046100f0565b6103e860c861012c6101906101f461025891939550919395565b60965b604051908152602001610097565b60646100db565b60006020828403121561010257600080fd5b81356001600160a01b038116811461011957600080fd5b939250505056fea2646970667358221220fdba61766f2954de846ebdf23f2bfe3c9526028433120f85e244f3fc6998fbc964736f6c634300081a0033";

  // Use the hardhat_setCode method
  await provider.send("hardhat_setCode", [
    "0x000000000000000000000000000000000000006C", // Address to set bytecode
    bytecode, // Bytecode to set
  ]);

  console.log("Bytecode set successfully!");
}

setCode().catch(error => {
  console.error("Error setting bytecode:", error);
  process.exit(1);
});
