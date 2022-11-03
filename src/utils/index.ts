import {ethers} from "ethers";
import * as fs from "fs";
import * as csv from "csv-parser";
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

export const getContract = (
  address: string,
  abi: any,
  provider: ethers.providers.JsonRpcProvider,
) => {
  return new ethers.Contract(address, abi, provider);
};

export const readCsvFile = (path: string, headers = []) => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(path,)
      .pipe(csv(headers))
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      }).on('error', (error) => {
      reject(error);
    });
  })
}

export const writeCsvFile = async (path: string, data: any, header: any[]) => {
  const csvWriter = createCsvWriter({
    path,
    header
  });
  await csvWriter.writeRecords(data)
  console.log('The CSV file was written successfully');
}