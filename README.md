## 效果
![image](https://github.com/AwJayChou/voting-dapp/blob/main/images/show.png?raw=true)


1. 环境准备

sudo apt-get update
curl -sL https://deb.nodesource.com/setup_7.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install nodejs
node --version
v7.4.0
npm --version
4.0.5

mkdir -p ethereum/voting_dapp
cd ethereum/voting_dapp
npm install ganache-cli web3@0.20.1 solc
node_modules/.bin/ganache-cli
启动私链
npx ganache-cli

node server.js
访问 http://127.0.0.1:8080/index.html#

2. 编译

>node
In the node console
> Web3 = require('web3')
> web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
> web3.eth.accounts
['0x5c252a0c0475f9711b56ab160a1999729eccce97'
'0x353d310bed379b2d1df3b727645e200997016ba3'
'0xa3ddc09b5e49d654a43e161cae3f865261cabd23'
'0xa8a188c6d97ec8cf905cc1dd1cd318e887249ec5'
'0xc0aa5f8b79db71335dacc7cd116f357d7ecd2798'
'0xda695959ff85f0581ca924e549567390a0034058'
'0xd4ee63452555a87048dcfe2a039208d113323790'
'0xc60c8a7b752d38e35e0359e25a2e0f6692b10d14'
'0xba7ec95286334e8634e89760fab8d2ec1226bf42'
'0x208e02303fe29be3698732e92ca32b88d80a2d36']


> code = fs.readFileSync('Voting.sol').toString()
> solc = require('solc')
> compiledCode = solc.compile(code)

3. 部署

Execute this in your node console:
> abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
> VotingContract = web3.eth.contract(abiDefinition)
> byteCode = compiledCode.contracts[':Voting'].bytecode
> deployedContract = VotingContract.new(['Alice','Bob','Cary'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
> deployedContract.address
'0x0396d2b97871144f75ba9a9c8ae12bf6c019f610' <- Your address will be different
> contractInstance = VotingContract.at(deployedContract.address)

4. 控制台交互

In your node console:
> contractInstance.totalVotesFor.call('Rama')
{ [String: '0'] s: 1, e: 0, c: [ 0 ] }
> contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})
'0xdedc7ae544c3dde74ab5a0b07422c5a51b5240603d31074f5b75c0ebc786bf53'
> contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})
'0x02c054d238038d68b65d55770fabfca592a5cf6590229ab91bbe7cd72da46de9'
> contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})
'0x3da069a09577514f2baaa11bc3015a16edf26aad28dffbcd126bde2e71f2b76f'
> contractInstance.totalVotesFor.call('Rama').toLocaleString()
'3'