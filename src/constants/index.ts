export const BELLY_TOKEN_ADDRESS = "0x3dfa90540cCDC77d543E6e61cacD5880F5C62391";
export const BSC_MAINNET_RPC_URL = "https://bsc-dataseed.binance.org/";
export const BELLY_FOUNDER_CONTRACT = "0x6F75DAE0e1a8c8dE94034723684445Be1De61df2";
export const BELLY_FOUNDER_CONTRACT_ABI = [{
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "internalType": "address", "name": "previousOwner", "type": "address"}, {
    "indexed": true,
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
  }],
  "name": "OwnershipTransferred",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "uint256", "name": "_index", "type": "uint256"}],
  "name": "ReleaseMyToken",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "contract IERC20", "name": "rewardToken", "type": "address"}],
  "name": "SetRewardToken",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "address",
    "name": "_lockedAddress",
    "type": "address"
  }, {"indexed": false, "internalType": "uint256", "name": "_amount", "type": "uint256"}, {
    "indexed": false,
    "internalType": "uint256",
    "name": "_releaseDays",
    "type": "uint256"
  }],
  "name": "TransferAndLock",
  "type": "event"
}, {
  "inputs": [],
  "name": "_rewardToken",
  "outputs": [{"internalType": "contract IERC20", "name": "", "type": "address"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_lockedAddress", "type": "address"}],
  "name": "getAvailableAmount",
  "outputs": [{"internalType": "uint256", "name": "_amount", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_lockedAddress", "type": "address"}, {
    "internalType": "uint256",
    "name": "_index",
    "type": "uint256"
  }],
  "name": "getLockedAmountAt",
  "outputs": [{"internalType": "uint256", "name": "_amount", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_lockedAddress", "type": "address"}],
  "name": "getLockedFullAmount",
  "outputs": [{"internalType": "uint256", "name": "_amount", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_lockedAddress", "type": "address"}, {
    "internalType": "uint256",
    "name": "_index",
    "type": "uint256"
  }],
  "name": "getLockedIsReleaseAt",
  "outputs": [{"internalType": "uint256", "name": "_isRelease", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_lockedAddress", "type": "address"}],
  "name": "getLockedListSize",
  "outputs": [{"internalType": "uint256", "name": "_length", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_lockedAddress", "type": "address"}, {
    "internalType": "uint256",
    "name": "_index",
    "type": "uint256"
  }],
  "name": "getLockedTimeAt",
  "outputs": [{"internalType": "uint256", "name": "_time", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_lockedAddress", "type": "address"}],
  "name": "getWithdrewAmount",
  "outputs": [{"internalType": "uint256", "name": "_amount", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "", "type": "address"}, {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "name": "lockListByTime",
  "outputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}, {
    "internalType": "uint256",
    "name": "releaseDate",
    "type": "uint256"
  }, {"internalType": "uint256", "name": "isRelease", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_lockedAddress", "type": "address"}, {
    "internalType": "uint256[]",
    "name": "_amountArr",
    "type": "uint256[]"
  }, {"internalType": "uint256[]", "name": "_releaseDaysArr", "type": "uint256[]"}],
  "name": "multiTransferAndLock",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "owner",
  "outputs": [{"internalType": "address", "name": "", "type": "address"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "releaseAllMyToken",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "_index", "type": "uint256"}],
  "name": "releaseMyToken",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "contract IERC20", "name": "rewardToken", "type": "address"}],
  "name": "setRewardToken",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_lockedAddress", "type": "address"}, {
    "internalType": "uint256",
    "name": "_amount",
    "type": "uint256"
  }, {"internalType": "uint256", "name": "_releaseDays", "type": "uint256"}],
  "name": "transferAndLock",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
  "name": "transferOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "withdraw",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "contract IERC20", "name": "token", "type": "address"}],
  "name": "withdrawErc20",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}]

export const BELLY_TOKEN_CONTRACT_ABI = [{
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "internalType": "address", "name": "owner", "type": "address"}, {
    "indexed": true,
    "internalType": "address",
    "name": "spender",
    "type": "address"
  }, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}],
  "name": "Approval",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "internalType": "address", "name": "previousOwner", "type": "address"}, {
    "indexed": true,
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
  }],
  "name": "OwnershipTransferred",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "internalType": "address", "name": "from", "type": "address"}, {
    "indexed": true,
    "internalType": "address",
    "name": "to",
    "type": "address"
  }, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}],
  "name": "Transfer",
  "type": "event"
}, {
  "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {
    "internalType": "address",
    "name": "spender",
    "type": "address"
  }],
  "name": "allowance",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "approve",
  "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
  "name": "balanceOf",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
  "name": "burn",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "account", "type": "address"}, {
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [],
  "name": "decimals",
  "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {
    "internalType": "uint256",
    "name": "subtractedValue",
    "type": "uint256"
  }],
  "name": "decreaseAllowance",
  "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {
    "internalType": "uint256",
    "name": "addedValue",
    "type": "uint256"
  }],
  "name": "increaseAllowance",
  "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "name",
  "outputs": [{"internalType": "string", "name": "", "type": "string"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "owner",
  "outputs": [{"internalType": "address", "name": "", "type": "address"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "symbol",
  "outputs": [{"internalType": "string", "name": "", "type": "string"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "totalSupply",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "recipient", "type": "address"}, {
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "transfer",
  "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "sender", "type": "address"}, {
    "internalType": "address",
    "name": "recipient",
    "type": "address"
  }, {"internalType": "uint256", "name": "amount", "type": "uint256"}],
  "name": "transferFrom",
  "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
  "name": "transferOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}]