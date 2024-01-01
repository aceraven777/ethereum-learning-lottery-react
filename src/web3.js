import Web3 from 'web3';

window.ethereum.request({ method: "eth_requestAccounts" });

const OPTIONS = {
    defaultBlock: 'latest',
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5,
};
const web3 = new Web3(window.ethereum, null, OPTIONS);

export default web3;