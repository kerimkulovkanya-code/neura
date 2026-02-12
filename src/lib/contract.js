// 🔥 REPLACE WITH YOUR REAL DEPLOYED CONTRACT ADDRESS ON SEPOLIA
export const contractAddress = "0x041aE82483dC5350a2C2594792a35EA05B7a1c37";

export const contractABI = [
  {
    "inputs": [{"internalType": "address","name": "user","type": "address"}],
    "name": "reward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address","name": "account","type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];