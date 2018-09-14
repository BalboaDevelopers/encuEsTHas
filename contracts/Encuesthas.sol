pragma solidity 0.4.25;


contract Ownable {
    address public owner;

    constructor () public{
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Sender no autorizado."); 
        _;
    }
}


contract Encuesthas is Ownable {
    uint8 counter = 0;
    bytes32[10] candidatesNames;
    uint8[10] candidatesVoteCounts;
    mapping(bytes32 => bool) candidates;
    mapping(address => bool) voters;
    mapping(bytes32 => uint8) candidatesCount;

    event AddedVote(bytes32 candidateName, uint8 candidateVotes);
    event AddedCandidate(bytes32 candidateStored);
    event RetrievedCandidate(bytes32[10] candidateRetrieved);

    constructor() public {}

    modifier onlyNewCandidate(bytes32 _candidate){
        require(candidates[_candidate] != true, "Candidato solo puede ser añadido una sola vez.");
        _;
    }

    function addCandidate(bytes32 _candidate) external onlyNewCandidate(_candidate)  {
        candidates[_candidate] = true;
        candidatesCount[_candidate] = 0;

        candidatesNames[counter] = _candidate;
        candidatesVoteCounts[counter] = 0;

        counter = counter + 1;
        emit AddedCandidate(_candidate);
    }

    function addVoteToCandidate(bytes32 _candidate) external {
        uint8 _candidateCount = candidatesCount[_candidate] + 1;
        candidatesCount[_candidate] = _candidateCount;
        candidatesVoteCounts[counter] = _candidateCount;
        voters[msg.sender] = true;
        emit AddedVote(_candidate, _candidateCount);
    }

    function getCandidates() external view returns(bytes32[10], uint8[10]) {
        return (candidatesNames, candidatesVoteCounts);
    }

    function() public payable {}
}