// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import {run, ethers, upgrades} from 'hardhat';
import "@nomiclabs/hardhat-ethers";
import {Alchemy, Network, Wallet, Utils } from 'alchemy-sdk';
import 'dotenv/config';

const settings = {
    //apiKey: process.env.API_KEY_TESTNET_POLYGON,
	//apiKey: process.env.API_KEY_TESTNET_GOERLI,
	
    //network: Network.MATIC_MUMBAI, // Replace with your network.
	//network: Network.ETH_GOERLI
};

//const alchemy = new Alchemy(settings);

const main = async () => {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  try {
  // We get the contract to deploy
	await run("compile");

	const accounts = await ethers.getSigners();

  	//console.log("Accounts:", accounts.map((a) => a.address));
	const MetaQuantumToken = await ethers.getContractFactory("MQMTokenV1");  
	//const Erc20Token = await ethers.getContractFactory("ERC20Token");
//	const nonce = await alchemy.core.getTransactionCount(await accounts[0].getAddress())
//	console.log("nonce", nonce);
	const metaQuantumtoken = await upgrades.deployProxy(MetaQuantumToken);
	
	//LayerZero Goerli
	//const metaQuantumtoken = await upgrades.deployProxy(MetaQuantumToken,['0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23']);
	
	//const erc20Token = await upgrades.deployProxy(Erc20Token);
	
	await metaQuantumtoken.deployed();
	

	//await erc20Token.deployed();
	// verify the Address
	console.log("MetaQuantum Token deployed to:", metaQuantumtoken.address);

	
	//set lzEndpoint per chainNetwork check here: 
	//(mainnet) https://layerzero.gitbook.io/docs/technical-reference/mainnet/supported-chain-ids
	//(testnet) https://layerzero.gitbook.io/docs/technical-reference/testnet/testnet-addresses

	//LayerZero Goerli
	//lzChainId:10121 lzEndpoint:0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23
	//await metaQuantumtoken.initialize('0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23');
	//console.log("MetaQuantum Token initialized");
  	//LayerZero Mumbai
    //lzChainId:10109 lzEndpoint:0xf69186dfBa60DdB133E91E9A4B5673624293d8F8
	//await metaQuantumtoken.initialize('0xf69186dfBa60DdB133E91E9A4B5673624293d8F8');
	

	
	
	
	//console.log("ERC20 Token deployed to:", erc20Token.address);
	// Verify the balance of the Owner
	console.log("Balance of the Owner: ", (await metaQuantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "must be 100 million!!! in wei");
	console.log("Total Supply: ", (await metaQuantumtoken.totalSupply()).toString(), "must be 100 million!!! in wei");
	// Try to mint one additional Token
	console.log("============= Try to Mint Any Additional Token (Expect Revert) =================");
	 
	// 	const estimatetx = await metaQuantumtoken.burn(1, {gasLimit: 1500000});
	// 	console.log("Gas Estimate: ", estimatetx, (await estimatetx.gasPrice).toString(), (await estimatetx.gasLimit).toString(), estimatetx.status);
	// 	if (estimatetx.gasLimit == null ) {
	// 		estimatetx.gasLimit = await ethers.provider.estimateGas(estimatetx);
	// 	};
	// 	const receipt = await estimatetx.wait();
	// 	console.log("Receipt Error: ", receipt);
	// 	console.log("ChainId: ", (await estimatetx.chainId).toString());
	 } catch (error) {
	 	console.log(error);
	 }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
