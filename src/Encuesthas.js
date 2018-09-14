import web3 from './web3';

const Encuesthas = require('./compiled/Encuesthas.json');
const address = '0x8d0945dEA260A5180b2F049add3850b98DD1469f';

export default new web3.eth.Contract(JSON.parse(Encuesthas.interface), address);
