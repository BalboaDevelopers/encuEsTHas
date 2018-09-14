const dotenv = require('dotenv');
const path = require('path');
const util = require('util');
const fs = require('fs');

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

dotenv.config();

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  process.env.PROVIDER_URI
);
const web3 = new Web3(provider);

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const compiledFolder = 'src/compiled';

async function deploy(filePath) {
  const compiledContract = await readFile(filePath, 'utf8');
  const contractJson = JSON.parse(compiledContract);
  
  const interface = contractJson.interface;
  const bytecode = contractJson.bytecode;
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x' + bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  contractJson.address = result.options.address;
  await writeFile(filePath, JSON.stringify(contractJson), 'utf8'); 
  console.log('Contract deployed to', contractJson.address);
}

function migrate(dirname){
  fs.readdir(dirname, (err, files) => {
      files.forEach(file => {
        if(file.split('.')[1] === 'json'){
          filePath = path.join(__dirname, compiledFolder, file);
          deploy(filePath);
        }
      });
  });
}

migrate(path.join(__dirname, compiledFolder));
