import web3 from './web3';

const Encuesthas = require('./compiled/Encuesthas.json');
const address = '0xd5Ae72555c4570F3ff3AB2d5c21426e027Af1Cc6';

export default new web3.eth.Contract(JSON.parse(Encuesthas.interface), address);
