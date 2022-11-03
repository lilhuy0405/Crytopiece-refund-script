import {ethers} from "ethers";
import {BSC_MAINNET_RPC_URL} from "./constants";
import {TaskOne, TaskTwo} from "./tasks";


async function main() {
  const provider = new ethers.providers.JsonRpcProvider(BSC_MAINNET_RPC_URL);
  // const taskOne = new TaskOne(provider);
  // await taskOne.run();
  const taskTwo = new TaskTwo(provider);
  await taskTwo.run();
}

main().then();