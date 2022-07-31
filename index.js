const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// 编译abi获得
const abi = JSON.parse('[{"inputs":[{"internalType":"bytes32[]","name":"candidateNames","type":"bytes32[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidateList","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}]');
// 通过abi创建合约
const VotingContract = web3.eth.contract(abi);
// 映射创建合约地址
const contractInstance = VotingContract.at("0xe51b12c894538294300d51783f9fb8e95946f1ad");

const candidates = {"Alice": "candidate-1", "Bob": "candidate-2", "Cary": "candidate-3"};

function voteForCandidate() {
    candidateName = $("#candidate").val();
    if(!candidateName) {
        alert('请输入投票名字')
        return
    }
    console.log('## candidateName ', candidateName)
    try {
        contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
            let div_id = candidates[candidateName];
            $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
        });
        // contractInstance.voteForCandidate(candidateName)
        // let div_id = candidates[candidateName];
        //     $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
    } catch (err) {
        console.log('## error ', err)
    }
}

$(document).ready(function(){
    candidateNames = Object.keys(candidates);
    for( let i = 0; i < candidateNames.length; i++ ){
        let name = candidateNames[i];
        let val = contractInstance.totalVotesFor.call(name).toString();
        $("#" + candidates[name]).html(val);
    }
});