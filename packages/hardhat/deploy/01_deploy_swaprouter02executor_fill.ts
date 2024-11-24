import { ethers, network } from "hardhat";

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { STRART_BLOCK_TIMESTAMP, SWAP_ROUTER_02_ADDRESS, V2_DUCTH_ORDER_REACTOR_ADDRESS } from "../constants/constants";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployUniswapX_Fill: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */

  const { deploy } = hre.deployments;

  const [deployer] = await ethers.getSigners();

  await network.provider.send("evm_setNextBlockTimestamp", [STRART_BLOCK_TIMESTAMP]);

  await deploy("SwapRouter02Executor", {
    from: deployer.address,
    // Contract constructor arguments
    args: [
      V2_DUCTH_ORDER_REACTOR_ADDRESS,
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", // Default hardhat account
      SWAP_ROUTER_02_ADDRESS,
    ],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: false,
  });

  //await network.provider.send("evm_setNextBlockTimestamp", [STRART_BLOCK_TIMESTAMP]);
};

export default deployUniswapX_Fill;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployUniswapX_Fill.tags = ["SwapRouter02Executor"];
