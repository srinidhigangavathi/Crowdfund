const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

require('dotenv').config();


const provider = new HDWalletProvider(
    ["92d8a44482e65df3006dd8c6efddbbe8996aefd4ca8a31910169539a22a54295"],
    process.env.link,
    0,
    1
);

const web3 = new Web3(provider);
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attemping to deploy to accounts ', accounts[0]);
    const result = new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: '0x' + compiledFactory.bytecode })
    const deployedContract = await result
        .send({
            from: accounts[0],
            gas: await result.estimateGas(),
        })
        .once("transactionHash", (txhash) => {
            console.log(`Mining deployment transaction ...`);
            console.log(`https://rinkeby.etherscan.io/tx/${txhash}`);
          });

    console.log('Contract deploy to ', deployedContract.options.address);
};

deploy();