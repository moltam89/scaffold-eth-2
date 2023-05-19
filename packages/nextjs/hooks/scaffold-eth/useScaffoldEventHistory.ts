import { useEffect, useState } from "react";
import { ExtractAbiEventNames } from "abitype";
import { ethers } from "ethers";
import { useContract, useProvider } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { ContractAbi, ContractName, UseScaffoldEventHistoryConfig } from "~~/utils/scaffold-eth/contract";

/**
 * @dev reads events from a deployed contract
 * @param config - The config settings
 * @param config.contractName - deployed contract name
 * @param config.eventName - name of the event to listen for
 * @param config.fromBlock - the block number to start reading events from
 * @param config.filters - filters to be applied to the event (parameterName: value)
 * @param config.blockData - if set to true it will return the block data for each event (default: false)
 * @param config.transactionData - if set to true it will return the transaction data for each event (default: false)
 * @param config.receiptData - if set to true it will return the receipt data for each event (default: false)
 */
export const useScaffoldEventHistory = <
  TContractName extends ContractName,
  TEventName extends ExtractAbiEventNames<ContractAbi<TContractName>>,
>({
  contractName,
  eventName,
  fromBlock,
  filters,
  blockData,
  transactionData,
  receiptData,
}: UseScaffoldEventHistoryConfig<TContractName, TEventName>) => {
  const [events, setEvents] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo(contractName);
  const provider = useProvider();

  const contract = useContract({
    address: deployedContractData?.address,
    abi: deployedContractData?.abi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    async function readEvents() {
      try {
        if (!deployedContractData || !contract) {
          throw new Error("Contract not found");
        }

        const encodedFilterTopics = contract.interface.encodeFilterTopics(eventName, filters ?? []);

        const logs = await provider.getLogs({
          address: deployedContractData?.address,
          topics: encodedFilterTopics,
          fromBlock: fromBlock,
        });
        const newEvents = [];
        for (let i = logs.length - 1; i >= 0; i--) {
          let block;
          if (blockData) {
            block = await provider.getBlock(logs[i].blockHash);
          }
          let transaction;
          if (transactionData) {
            transaction = await provider.getTransaction(logs[i].transactionHash);
          }
          let receipt;
          if (receiptData) {
            receipt = await provider.getTransactionReceipt(logs[i].transactionHash);
          }
          const log = {
            log: logs[i],
            args: contract.interface.parseLog(logs[i]).args,
            block: block,
            transaction: transaction,
            receipt: receipt,
          };
          newEvents.push(log);
        }
        setEvents(newEvents);
        setError(undefined);
      } catch (e: any) {
        console.error(e);
        setEvents(undefined);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }
    if (!deployedContractLoading) {
      readEvents();
    }
  }, [
    provider,
    fromBlock,
    contractName,
    eventName,
    deployedContractLoading,
    deployedContractData?.address,
    contract,
    deployedContractData,
    blockData,
    transactionData,
    receiptData,
  ]);

  return {
    data: events,
    isLoading: isLoading,
    error: error,
  };
};
