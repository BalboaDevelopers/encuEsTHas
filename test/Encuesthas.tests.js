const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../src/compiled/Encuesthas.json');

const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;
let contract;


beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    contract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' });
    contract.setProvider(provider);
});

describe('Encuestha', () => {
    it('Deploys the contract', async () => {
        assert.ok(contract.options.address);
    });

    it('Adds a new candidate', async () => {
        const candidateExpected = web3.utils.toHex('Erick Agrazal');
        const candidateRegistered = await contract.methods
            .addCandidate(candidateExpected)
            .send({ from: accounts[0], gas: '1000000' });
        const { candidateStored } = candidateRegistered.events.AddedCandidate.returnValues;
        assert.equal(web3.utils.hexToUtf8(candidateExpected), web3.utils.hexToUtf8(candidateStored));
    });

    it('Retrieves a candidate', async () => {
        const candidateExpected = web3.utils.toHex('Erick Agrazal');
        const candidateRegisteredPromise = await contract.methods
            .addCandidate(candidateExpected)
            .send({ from: accounts[0], gas: '1000000' });
        const { candidateStored } = candidateRegisteredPromise.events.AddedCandidate.returnValues;
        const candidateRetrieved = await contract.methods
            .getCandidates().call();
        assert.equal(candidateStored, candidateRetrieved[0][0]);
        assert.equal(0, candidateRetrieved[1][0]);
    });

    it('Votes', async () => {
        let candidateExpected = web3.utils.toHex('Erick Agrazal');
        let candidateExpectedVotes = 2;

        // Add candidate
        await contract.methods
            .addCandidate(candidateExpected)
            .send({ from: accounts[0], gas: '1000000' });
        
        // First vote
        await contract.methods
            .addVoteToCandidate(candidateExpected)
            .send({ from: accounts[0] });
        
        // Second vote
        let candidateVotedPromise_2 = await contract.methods
            .addVoteToCandidate(candidateExpected)
            .send({ from: accounts[0] });
        let candidateVotes_2 = candidateVotedPromise_2.events.AddedVote.returnValues.candidateVotes;

        assert.equal(candidateExpectedVotes, candidateVotes_2)
    });
});