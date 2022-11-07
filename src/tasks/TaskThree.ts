import {readCsvFile, writeCsvFile} from "../utils";
import {TaskThreeOutput} from "../interfaces/TaskThreeOutput";
import {ethers} from "ethers";
import {BellyTokenContract} from "../contracts";


class TaskThree {
  private readonly csvPath: string = './datas/all-bep20-txn.csv';
  private readonly headers = [
    "txnHash",
    "timestamp",
    "datetime",
    "from",
    "to",
    "tokenValue",
    "UsdValueDayOfTxn",
    "contractAddress",
    "tokenName",
    "tokenSymbol",
  ]
  _provider: ethers.providers.JsonRpcProvider;
  _bellyTokenContract: BellyTokenContract

  constructor(provider: ethers.providers.JsonRpcProvider) {
    this._provider = provider;
    this._bellyTokenContract = new BellyTokenContract(provider);

  }

  async getBalance(address: string): Promise<Number> {
    const balanceBN = await this._bellyTokenContract.getBalance(address);
    return Number(ethers.utils.formatEther(balanceBN));
  }

  /*
  * Kiểm tra số dư hiện tại của các ví mua ido từ contract này của  Lauchzone lock contract 0xa22162FD6f7AF65CCdE41eeDc5b9521B24C14FA9 <br/>
  * Kiểm tra số dư còn đang bị lock của các ví mua ido từ contract này của  Lauchzone lock contract 0xa22162FD6f7AF65CCdE41eeDc5b9521B24C14FA9 <br/>
  * Solution: lấy tất cả bep20 Transfer transaction của contract này: https://bscscan.com/tokentxns?a=0xa22162fd6f7af65ccde41eedc5b9521b24c14fa9 <br/>
  * Export csv => tính tổng BUSD + LZ user đã transfer vào contract này <br/>
  * Dựa theo giá dc list trên https://lz.finance/pad/v1/56/CryptoPiece để tính tổng số Belly sẽ nhận được <br/>
  * Sau đó từ file csv tính tổng só belly đã dc chuyển  cho từng ví <br/>
  * So sánh 2 số này để biêt số token đang bị lock
  */
  async run() {
    const data: any = await readCsvFile(this.csvPath, this.headers);
    //skip header
    data.shift();

    const bellyUSDPrice = 0.005;
    const bellyLZPrice = 0.001215;
    const result: TaskThreeOutput[] = [];
    //address => amount;
    const listBuy = new Map<string, number>();
    const listRefund = new Map<string, number>();
    console.log("Reading data to find list buy and list refund")
    data.forEach((item: any) => {
      const tokenSymbol = item.tokenSymbol;
      if (tokenSymbol === 'LZ' || tokenSymbol === 'BUSD') {
        const buyer = item.from;
        const buyAmount = parseFloat(item.tokenValue);
        const buyTokenPrice = tokenSymbol === 'BUSD' ? bellyUSDPrice : bellyLZPrice;
        const totalRewardBelly = buyAmount / buyTokenPrice;
        //add to list buy map
        if (listBuy.has(buyer)) {
          const currentAmount = listBuy.get(buyer);
          const newAmount = currentAmount + totalRewardBelly;
          listBuy.set(buyer, newAmount);
        } else {
          listBuy.set(buyer, totalRewardBelly);
        }
      } else if (tokenSymbol === 'Belly') {
        const buyer = item.to;
        const buyAmount = parseFloat(item.tokenValue);
        //add to list refund map
        if (listRefund.has(buyer)) {
          const currentAmount = listRefund.get(buyer);
          const newAmount = currentAmount + buyAmount;
          listRefund.set(buyer, newAmount);
        } else {
          listRefund.set(buyer, buyAmount);
        }
      }
    });

    console.log(`Found ${listBuy.size} buyer and ${listRefund.size} refunders`)

    //compare 2 map
    listBuy.forEach((totalBoughtBelly, address) => {

      const currentReceivedBelly = listRefund.get(address) || 0;
      const resultItem: TaskThreeOutput = {
        totalBoughtBelly,
        currentReceivedBelly,
        lockedBelly: totalBoughtBelly - currentReceivedBelly,
        currentBellyBalance: -1,
        address
      }
      result.push(resultItem);
    });
    console.log("Calculating current balance of each address...")
    //get current belly balance
    const newResult = await Promise.all(result.map(async (item) => {
      try {
        console.log(`Getting balance of ${item.address}`)
        const currentBellyBalance = await this.getBalance(item.address);
        console.log(`Balance of ${item.address} is ${currentBellyBalance}`)
        return {
          ...item,
          currentBellyBalance
        }
      } catch (err) {
        console.log(`Error when getting balance of ${item.address}`, err);
        return item;
      }
    }));
    console.log(`Calculated ${newResult.length} addresses`);
    console.log("Writing to file...")
    try {
      const newHeaders = [
        {id: 'address', title: 'Wallet Address'},
        {id: 'totalBoughtBelly', title: 'Total BELLY bought'},
        {id: 'currentReceivedBelly', title: 'Received BELLY'},
        {id: 'lockedBelly', title: 'Locked BELLY'},
        {id: 'currentBellyBalance', title: 'Current BELLY balance'},
      ]
      await writeCsvFile('./out/task3.csv', newResult, newHeaders)
      console.log('Done');
    } catch (err) {
      console.log("write csv file failed: ", err);
    }
  }

  async updateBalance() {
    const path = './out/task3.csv';
    const headers = [
      "address",
      "totalBoughtBelly",
      "currentReceivedBelly",
      "lockedBelly",
      "currentBellyBalance",
    ]

    const data: any = await readCsvFile(path, headers);
    //skip header
    data.shift();
    console.log(`Found ${data.length} addresses`)
    const failed = data.filter(item => +item.currentBellyBalance === -1);
    const success = data.filter(item => +item.currentBellyBalance !== -1);
    if(failed.length === 0) {
      console.log("All addresses have been updated");
      return;
    }
    console.log(`Found ${failed.length} failed addresses and ${success.length} success addresses`)
    const updated = await Promise.all(failed.map(async (item) => {
      try {
        const balance = await this.getBalance(item.address);
        console.log(`Balance of ${item.address} is ${balance}`)
        return {...item, currentBellyBalance: balance};
      } catch (err) {
        console.log(`Error when getting balance of ${item.address}`, err);
        return item;
      }

    }))

    //merged 2 array
    const result = [...success, ...updated];
    console.log(result.length);
    console.log("Writing to file...")
    try {
      const newHeaders = [
        {id: 'address', title: 'Wallet Address'},
        {id: 'totalBoughtBelly', title: 'Total BELLY bought'},
        {id: 'currentReceivedBelly', title: 'Received BELLY'},
        {id: 'lockedBelly', title: 'Locked BELLY'},
        {id: 'currentBellyBalance', title: 'Current BELLY balance'},
      ]
      await writeCsvFile('./out/task3.csv', result, newHeaders)
      console.log('Done');
    } catch (err) {
      console.log("write csv file failed: ", err);
    }
  }
}

export default TaskThree;