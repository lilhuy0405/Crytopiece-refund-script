import {ethers, utils} from "ethers";
import {BSC_MAINNET_RPC_URL} from "./constants";
import {TaskOne, TaskThree, TaskTwo} from "./tasks";


async function main() {
  const url = "https://bsc-dataseed2.defibit.io"
  const provider = new ethers.providers.JsonRpcProvider(BSC_MAINNET_RPC_URL);
  const taskThree = new TaskThree(provider);
  // await taskThree.run();
}

main().then();