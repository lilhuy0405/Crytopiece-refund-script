import {ethers} from "ethers";
import {BellyFounderContract, BellyTokenContract} from "../contracts";
import {readCsvFile, writeCsvFile} from "../utils";

export default class TaskTwo {
  private readonly csvPath = './datas/Belly-Astronaut-IDO.csv'
  private readonly headers = ["walletAddress", "firstRewardAmount"]
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
  * Task 2
  - Kiểm tra số dư hiện tại của các ví trong sheet sau  Astronaut https://docs.google.com/spreadsheets/d/1FfuAXPOQW-R8gkVvYqxMSnjGuTghJWyKmeovLifZm4w/edit#gid=0
  - Kiểm tra số dư còn đang bị lock của các ví có trong sheet của các ví trong sheet sau  Astronaut https://docs.google.com/spreadsheets/d/1FfuAXPOQW-R8gkVvYqxMSnjGuTghJWyKmeovLifZm4w/edit#gid=0
  => Asotronout còn nợ user 35% số token của ng dùng
  => first reward trả về 10% số token của ng dùng
  => số còn lại nơ = firstReward / 10 * 35;
  * 0x2d73CB14F5aE5aD453f46c9FeDeFB5E38b4Ecf48
  * 0x13ee67711DAC3967D693C4CF1134903400e7eDeE
  * * */
  async run() {
    const data: any = await readCsvFile(this.csvPath, this.headers)

    //skip first row
    data.shift()
    const output = []
    for (const row of data) {
      try {
        const balance = await this.getBalance(row.walletAddress)
        const availableAmount = Number(row.firstRewardAmount) / 10 * 35
        output.push({...row, balance, availableAmount})
        console.log("Get balance successfully", row.walletAddress)
      } catch (err) {
        console.log(`${row.walletAddress}: get balance and available amount failed `, err)
        output.push({...row, balance: -1, availableAmount: -1})
      }
    }
    console.log("writing csv file....")
    try {
      const newHeaders = [
        {id: 'walletAddress', title: 'Wallet Address'},
        {id: 'firstRewardAmount', title: 'Balance $BELLY'},
        {id: 'balance', title: 'Balance'},
        {id: 'availableAmount', title: 'Available Amount'},
      ]
      await writeCsvFile('./out/task2.csv', output, newHeaders)
      console.log('Done');
    } catch (err) {
      console.log("write csv file failed: ", err);
    }
  }
}