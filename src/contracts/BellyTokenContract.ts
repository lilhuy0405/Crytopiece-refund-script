import {getContract} from "../utils";
import {BigNumber, ethers} from "ethers";
import {BELLY_TOKEN_ADDRESS, BELLY_TOKEN_CONTRACT_ABI} from "../constants";

export default class BellyTokenContract {
  private readonly _provider: ethers.providers.JsonRpcProvider;
  private readonly _contract: ethers.Contract;

  constructor(provider: ethers.providers.JsonRpcProvider) {
    this._provider = provider;
    this._contract = getContract(
      BELLY_TOKEN_ADDRESS,
      BELLY_TOKEN_CONTRACT_ABI,
      provider,
    );
  }

  async getBalance(address: string): Promise<BigNumber> {
    return await this._contract.balanceOf(address);
  }
}