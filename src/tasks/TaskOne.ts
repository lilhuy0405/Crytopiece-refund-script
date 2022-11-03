import {readCsvFile, writeCsvFile} from "../utils";
import {ethers} from "ethers";
import {BellyFounderContract, BellyTokenContract} from "../contracts";

export default class TaskOne {
  private readonly csvPath = './datas/Cryptopiece-wallet.csv'
  private readonly headers = ["id", "name", "allocation", "tokenPrice", "token", "wallet", "address", "_"]
  _provider: ethers.providers.JsonRpcProvider;
  _bellyTokenContract: BellyTokenContract
  _bellyFounderContract: BellyFounderContract

  constructor(provider: ethers.providers.JsonRpcProvider) {
    this._provider = provider;
    this._bellyTokenContract = new BellyTokenContract(provider);
    this._bellyFounderContract = new BellyFounderContract(provider);
  }

  async getBalance(address: string): Promise<Number> {
    const balanceBN = await this._bellyTokenContract.getBalance(address);
    return Number(ethers.utils.formatEther(balanceBN));
  }

  async getAvailableAmount(address: string): Promise<Number> {
    const availableAmountBN = await this._bellyFounderContract.getAvailableAmount(address);
    return Number(ethers.utils.formatEther(availableAmountBN));
  }

  /*
  * Task 1 - private sales
  - Kiểm tra số dư hiện tại của các ví có trong file shheet trên
  - Kiểm tra số token còn đang bị lock của các ví có trong sheet trên
  * */
  async run() {
    const data: any = await readCsvFile(this.csvPath, this.headers)
    //skip first row
    data.shift()
    const newData = []
    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      try {
        const balance = await this.getBalance(row.wallet)
        const availableAmount = await this.getAvailableAmount(row.wallet)
        newData.push({
          id: row.id,
          name: row.name,
          allocation: row.allocation,
          tokenPrice: row.tokenPrice,
          wallet: row.wallet,
          balance,
          availableAmount
        })
        console.log("Get balance successfully", row.wallet)
      } catch (err) {
        console.log(`${row.wallet}: get balance and available amount failed `, err)
        newData.push({
          id: row.id,
          name: row.name,
          allocation: row.allocation,
          tokenPrice: row.tokenPrice,
          wallet: row.wallet,
          balance: -1,
          availableAmount: -1
        })
      }
    }
    console.log("writing csv file....")
    try {
      const newHeaders = [
        {id: 'id', title: 'Id'},
        {id: 'name', title: 'Name'},
        {id: 'allocation', title: 'Allocation'},
        {id: 'tokenPrice', title: 'Token Price'},
        {id: 'wallet', title: 'Wallet'},
        {id: 'balance', title: 'Balance'},
        {id: 'availableAmount', title: 'Available Amount'},
      ]
      await writeCsvFile('./out/task1.csv', newData, newHeaders)
      console.log('Done');
    } catch (err) {
      console.log("write csv file failed: ", err);
    }
  }
}

