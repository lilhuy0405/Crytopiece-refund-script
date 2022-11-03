import {BigNumber, ethers} from "ethers";
import {getContract} from "../utils";
import {BELLY_FOUNDER_CONTRACT, BELLY_FOUNDER_CONTRACT_ABI} from "../constants";

export default class BellyFounderContract {
  private readonly _provider: ethers.providers.JsonRpcProvider;
  private readonly _contract: ethers.Contract;

  constructor(provider: ethers.providers.JsonRpcProvider) {
    this._provider = provider;
    this._contract = getContract(
      BELLY_FOUNDER_CONTRACT,
      BELLY_FOUNDER_CONTRACT_ABI,
      provider,
    );
  }

  async getAvailableAmount(address: string): Promise<BigNumber> {
    return await this._contract.getAvailableAmount(address);
  }
}