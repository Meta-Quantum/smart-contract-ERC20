import { ethers, upgrades } from 'hardhat';
import { BigNumber, Signer } from "ethers";
import  { expect, assert } from "chai";
import { getPermitDigest, getDomainSeparator, sign } from '../utils/signatures';
import { skipBlocks } from '../utils/helpers';
import moment from 'moment';
import 'dotenv/config';

describe("ERC20 Full Test", async () => {

	let accounts: Signer[]

	beforeEach(async () => {
		accounts = await ethers.getSigners();
		console.log("Get TimeStamp:", Math.floor((await ethers.provider.getBlock("latest")).timestamp));
	});

	//   ** Function Total Supply, Balance of, Name, Symbol, Decimals */
	//   ** 1. Test Initial Value of Smart Contract : How it is working - Test Case */
	//   ** t1. Getting Total Supply Value and verify is the same  Max Total Supply*/
	//   ** t2. Getting Balance of Owner Accounts Value and verify is the same  Max Total Supply */
	//   ** t3. Getting Name Value*/
	//   ** t4. Getting Symbol Value*/
	//   ** t5. Getting Decimals Value*/


	it("1. Should return the Total Supply, Balance of the Owner, Name, Symbol and Decimals", async () => {
		const MetaQuantumToken = await ethers.getContractFactory("MQMTokenV1");
		const metaquantumtoken = await upgrades.deployProxy(MetaQuantumToken);

		await metaquantumtoken.deployed();
		// verify the Address
		console.log("MQM Token deployed to:", metaquantumtoken.address);
		
		// Verify the balance of the Owner
		console.log("Balance of the Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "must be 100 million!!! in wei");
		expect((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString()).to.be.equal('100000000000000000000000000');
		console.log("Total Supply: ", (await metaquantumtoken.totalSupply()).toString(), "must be 100 million!!! in wei");
		expect(((await metaquantumtoken.totalSupply()).toString())).to.be.equal('100000000000000000000000000');
		describe(' Basic Value', async () => {
			it("1.1.- Verify the Name of the Token", async () => {
				console.log("Name of The Token: ", (await metaquantumtoken.name()).toString(), "=====> must be MQM App");
				expect(((await metaquantumtoken.name()).toString())).to.be.equal('MetaQuantum');
			});
			it("1.2.- Verify the Tiker of the Token", async () => {
				console.log("Name of The Token: ", (await metaquantumtoken.symbol()).toString(), "====> must be MQM");
				expect(((await metaquantumtoken.symbol()).toString())).to.be.equal('MQM');
			});
			it("1.3.- Verify the Decimals of the Token", async () => {
				console.log("Name of The Token: ", (await metaquantumtoken.decimals()), "=====> must be 18");
				expect((await metaquantumtoken.decimals())).to.be.equal(18);
			});
		});
	});

	//   ** Function owner(), transferOwnership(), renounceOwnership() */
	//   ** 2. Test OwnerShip Functions of Smart Contract : How it is working - Test Case */
	//   ** t1. Getting Current Owner */
	//   ** t2. Setting Transfer OwnerShip */
	//   ** t3. Setting Renounce OwnerShip */
	//   ** t4. Verify Smart Contract Don't Have any Owner */

	it("2. Should be Setting and Getting the OwnerShip of the Smart Contract", async () => {
		const MetaQuantumToken = await ethers.getContractFactory("MQMTokenV1");
		const metaquantumtoken = await upgrades.deployProxy(MetaQuantumToken)
		

		await metaquantumtoken.deployed();
		// verify the Address
		console.log("MQM Token deployed to:", metaquantumtoken.address);
		 
		// Verify the balance of the Owner
		console.log("Balance of the Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "must be 100 million!!! in wei");
		expect((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString()).to.be.equal('100000000000000000000000000');
		console.log("Total Supply: ", (await metaquantumtoken.totalSupply()).toString(), "must be 100 million!!! in wei");
		expect(((await metaquantumtoken.totalSupply()).toString())).to.be.equal('100000000000000000000000000');

		describe('Verify All Main Method involve in OwnerShip', async () => {
			it('2.1.- Getting the Owner of the Contract:', async () => {
				console.log("Owner of th Smart Contract:", (await metaquantumtoken.owner()).toString());
				expect(await metaquantumtoken.owner()).to.equal(await accounts[0].getAddress());
			});
			it('2.2.- Transfer OwnerShip from Accounts[0] to Accounts[1]', async () => {
				await metaquantumtoken.transferOwnership(await accounts[1].getAddress());
				console.log("New OwnerShip of th Smart Contract:", (await metaquantumtoken.owner()).toString());
			});
			it('2.3.- Renounce OwnerShip of the Smart Contract', async () => {
				await metaquantumtoken.connect(accounts[1]).renounceOwnership();
				console.log("Renounce Ownership of the Smart Contract:", (await metaquantumtoken.owner()).toString());
				expect(await metaquantumtoken.owner()).to.equal('0x0000000000000000000000000000000000000000');
			});
		});
	});

	//   ** Function / Methods Balanceof, Transfer, TransferFrom, Approve, IncreaseAllowance, DecreaseAllowance */
	//   ** 3. Test Basic Method of Smart Contract : How it is working - Test Case */
	//   ** t1. Getting Total Supply Value and verify is the same  Max Total Supply*/
	//   ** t2. Getting Balance ofANY Accounts Value and verify is the same EXPECT VALUE */
	//   ** t3. Testing Workflow Transfer*/
	//   ** t4. Testing Workflow TransferFrom*/
	//   ** t5. Testing Workflow Increase and Decrease Allowance */


	it("3. Should the right value for Balance Of, Transfer, Transfer From, and Approve, etc", async () => {
		const MetaQuantumToken = await ethers.getContractFactory("MQMTokenV1");
		const metaquantumtoken = await upgrades.deployProxy(MetaQuantumToken)

		await metaquantumtoken.deployed();
		// verify the Address
		console.log("MQM Token deployed to:", metaquantumtoken.address);
		 
		// Verify the balance of the Owner
		console.log("Balance of the Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "must be 100 million!!! in wei");
		expect((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString()).to.be.equal('100000000000000000000000000');
		console.log("Total Supply: ", (await metaquantumtoken.totalSupply()).toString(), "must be 100 million!!! in wei");
		expect(((await metaquantumtoken.totalSupply()).toString())).to.be.equal('100000000000000000000000000');

		describe('Verify Balance Of / Transfer', async () => {
			it("3.1.- Execute a Transfer, and Verify the changes in Owner Account, and Receipt Account", async () => {
				await metaquantumtoken.transfer(await accounts[1].getAddress(), '888889000000000000000000');
				console.log("Balance After of Account Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 91111110000000000000000000");
				expect(((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('99111111000000000000000000');
				console.log("Balance After of Receipt: ", (await metaquantumtoken.balanceOf(await accounts[1].getAddress())).toString(), "=====> must be 888889000000000000000000");
				expect(((await metaquantumtoken.balanceOf(await accounts[1].getAddress())).toString())).to.be.equal('888889000000000000000000');
			});
			it("3.2.- Try Transfer a Value more than available in the Accounts, and Receive Revert", async () => {
				console.log("Balance After of Receipt: ", (await metaquantumtoken.balanceOf(await accounts[1].getAddress())).toString(), "=====> must be 888889000000000000000000");
				expect(((await metaquantumtoken.balanceOf(await accounts[1].getAddress())).toString())).to.be.equal('888889000000000000000000');
				console.log("We Expect Revert the Transaction:");
				await expect((metaquantumtoken.connect(accounts[1]).transfer(await accounts[0].getAddress(), '3888889000000000000000000'))).to.be.revertedWith("ERC20: transfer amount exceeds balance");
			});
			it("3.3.- Send again the owner the Tokens", async () => {
				await metaquantumtoken.connect(accounts[1]).transfer(await accounts[0].getAddress(), '888889000000000000000000');
				console.log("Balance After of Account Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 100000000000000000000000000");
				expect(((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('100000000000000000000000000');
				console.log("Balance After of Receipt: ", (await metaquantumtoken.balanceOf(await accounts[1].getAddress())).toString(), "=====> must be 0");
				expect(((await metaquantumtoken.balanceOf(await accounts[1].getAddress())).toString())).to.be.equal('0');
			});
		});

		describe('Verify Balance Of / IncreaseAllowance / TransferFrom', async () => {
			it("3.4.- Execute a IncreaseAllowance / TransferFrom workflow and Verify the changes in Owner Account, and Receipt Account", async () => {
				await metaquantumtoken.increaseAllowance(await accounts[1].getAddress(), '888889000000000000000000');
				console.log("Verify Allowance Accounts[0] to Accounts[1]:", (await metaquantumtoken.allowance(await accounts[0].getAddress(), await accounts[1].getAddress())).toString());
				expect((await metaquantumtoken.allowance(await accounts[0].getAddress(), await accounts[1].getAddress())).toString()).to.be.equal('888889000000000000000000');
				await metaquantumtoken.connect(accounts[1]).transferFrom(await accounts[0].getAddress(), await accounts[1].getAddress(), '888889000000000000000000');
				console.log("Balance After of Account Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 99111111000000000000000000");
				expect(((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('99111111000000000000000000');
				console.log("Balance After of Receipt: ", (await metaquantumtoken.balanceOf(await accounts[1].getAddress())).toString(), "=====> must be 888889000000000000000000");
				expect(((await metaquantumtoken.balanceOf(await accounts[1].getAddress())).toString())).to.be.equal('888889000000000000000000');
			});
			it("3.5.- Execute a IncreaseAllowance / TransferFrom more than Approval and Receive Revert ", async () => {
				console.log("Balance After of Receipt: ", (await metaquantumtoken.balanceOf(await accounts[1].getAddress())).toString(), "=====> must be 888889000000000000000000");
				expect(((await metaquantumtoken.balanceOf(await accounts[1].getAddress())).toString())).to.be.equal('888889000000000000000000');
				await metaquantumtoken.increaseAllowance(await accounts[1].getAddress(), '888889000000000000000000');
				expect((await metaquantumtoken.allowance(await accounts[0].getAddress(), await accounts[1].getAddress())).toString()).to.be.equal('888889000000000000000000');
				console.log("Verify Allowance Accounts[0] to Accounts[1]:", (await metaquantumtoken.allowance(await accounts[0].getAddress(), await accounts[1].getAddress())).toString());
				console.log("We Expect Revert the Transaction:");
				await expect(metaquantumtoken.connect(accounts[1]).transferFrom(await accounts[0].getAddress(), await accounts[1].getAddress(), '1888889000000000000000000')).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
			});
			//it("3.6.- Execute a DecreaseAllowance / TransferFrom more than Approval and Receive Revert", async () => {
			//	console.log("Balance Before of Receipt: ", (await metaquantumtoken.balanceOf(await accounts[1].getAddress())).toString(), "=====> must be 888889000000000000000000");
			//	expect(((await metaquantumtoken.balanceOf(await accounts[1].getAddress())).toString())).to.be.equal('888889000000000000000000');
			//	await metaquantumtoken.decreaseAllowance(await accounts[1].getAddress(), '8000000000000000000000000');
			//	console.log("Verify Allowance Accounts[0] to Accounts[1]:", (await metaquantumtoken.allowance(await accounts[0].getAddress(), await accounts[1].getAddress())).toString());
			//	expect((await metaquantumtoken.allowance(await accounts[0].getAddress(), await accounts[1].getAddress())).toString()).to.be.equal('888889000000000000000000');
			//	await metaquantumtoken.connect(accounts[1]).transferFrom(await accounts[0].getAddress(), await accounts[1].getAddress(), '888889000000000000000000');
			//	console.log("Balance After of Account Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 100000000000000000000000000");
			//	expect(((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('100000000000000000000000000');
			//	console.log("Balance After of Receipt: ", (await metaquantumtoken.balanceOf(await accounts[1].getAddress())).toString(), "=====> must be 9777778000000000000000000");
			//	expect(((await metaquantumtoken.balanceOf(await accounts[1].getAddress())).toString())).to.be.equal('9777778000000000000000000');
			//});
			//it("3.7.- Execute a IncreaseAllowance / TransferFrom and send to the Owner all Token by Steps", async () => {
			//	console.log("Balance Before of Account Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 629111111000000000000000000");
			//	console.log("Balance Before of Receipt: ", (await metaquantumtoken.balanceOf(await accounts[1].getAddress())).toString(), "=====> must be 9777778000000000000000000");
			//	expect(((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('99111111000000000000000000');
			//	expect(((await metaquantumtoken.balanceOf(await accounts[1].getAddress())).toString())).to.be.equal('888889000000000000000000');
			//	await metaquantumtoken.connect(accounts[1]).increaseAllowance(await accounts[0].getAddress(), '9000000000000000000000000');
			//	console.log("Verify Allowance Accounts[1] to Accounts[0]:", (await metaquantumtoken.allowance(await accounts[1].getAddress(), await accounts[0].getAddress())).toString());
			//	expect((await metaquantumtoken.allowance(await accounts[1].getAddress(), await accounts[0].getAddress())).toString()).to.be.equal('9000000000000000000000000');
			//	console.log("We Expect Revert the Transaction: Try to send total balance of Receipt (Accounts[1])");
			//	await expect(metaquantumtoken.transferFrom(await accounts[1].getAddress(), await accounts[0].getAddress(), '9777778000000000000000000')).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
			//	await metaquantumtoken.transferFrom(await accounts[1].getAddress(), await accounts[0].getAddress(), '9000000000000000000000000');
			//	console.log("Verify Allowance After first Tx Accounts[1] to Accounts[0]:", (await metaquantumtoken.allowance(await accounts[1].getAddress(), await accounts[0].getAddress())).toString());
			//	await metaquantumtoken.connect(accounts[1]).increaseAllowance(await accounts[0].getAddress(), '777778000000000000000000');
			//	console.log("Verify Allowance Before second Tx Accounts[1] to Accounts[0]:", (await metaquantumtoken.allowance(await accounts[1].getAddress(), await accounts[0].getAddress())).toString());
			//	await metaquantumtoken.transferFrom(await accounts[1].getAddress(), await accounts[0].getAddress(), '777778000000000000000000');
			//	console.log("Verify Allowance After second Tx Accounts[1] to Accounts[0]:", (await metaquantumtoken.allowance(await accounts[1].getAddress(), await accounts[0].getAddress())).toString());
			//	console.log("Balance After of Account Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 100000000000000000000000000");
			//	expect(((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('100000000000000000000000000');
			//	console.log("Balance After of Receipt: ", (await metaquantumtoken.balanceOf(await accounts[1].getAddress())).toString(), "=====> must be 0");
			//	expect(((await metaquantumtoken.balanceOf(await accounts[1].getAddress())).toString())).to.be.equal('0');
			//});
		});
	});

	//   ** Function / Methods Blacklistable Wallet */
	//   ** 4. Test Black List Method's of Smart Contract : How it is working - Test Case */
	//   ** t1. Setting Multiples Wallet in the Blacklist */
	//   ** t2. Getting List of All blacklisted Wallet*/
	//   ** t3. Testing with blacklisted Wallet IncreaseAllowance, DecreaseAllowance, Transfer, TransferMany, Mint and Burn */
	//   ** t4. Testing drop blacklisted Wallet, and Testing again the methods*/


	it("4. Should the right value for add, drop or revert when i try to execute a transfer", async () => {
		const MetaQuantumToken = await ethers.getContractFactory("MQMTokenV1");
		const metaquantumtoken = await upgrades.deployProxy(MetaQuantumToken)

		await metaquantumtoken.deployed();
		// verify the Address
		console.log("MQM Token deployed to:", metaquantumtoken.address);
		
		 
		 
		// Verify the balance of the Owner
		console.log("Balance of the Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "must be 100 million!!! in wei");
		expect((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString()).to.be.equal('100000000000000000000000000');
		console.log("Total Supply: ", (await metaquantumtoken.totalSupply()).toString(), "must be 100 million!!! in wei");
		expect(((await metaquantumtoken.totalSupply()).toString())).to.be.equal('100000000000000000000000000');

		describe("Add Wallet to the blacklist and getting the list, and drop someone, and update the list", async () => {
			it("4.1.- Add several list of Accounts in the Blacklist: ", async () => {
				console.log("Verify only the Owner can add wallet to the Blacklist: ");
				await expect(metaquantumtoken.connect(accounts[1]).addBlacklist(await accounts[0].getAddress())).to.be.revertedWith("Ownable: caller is not the owner");
				const walletZeroAddress = '0x0000000000000000000000000000000000000000';
				console.log("Revert for WalletAddressZero");
				await expect(metaquantumtoken.addBlacklist(walletZeroAddress)).to.be.revertedWith("ERC20 MQM: Not Add Zero Address");
				console.log("Add all odd accounts from 4 to 16 address:");
				for (let i=4; i <= 16; i+=2) {
					await expect(metaquantumtoken.addBlacklist(await accounts[i].getAddress())).to.emit(metaquantumtoken, 'InBlacklisted').withArgs(await accounts[i].getAddress());
					console.log("Account ", i, "Blacklisted ", await accounts[i].getAddress());
				}
				await expect(metaquantumtoken.addBlacklist(await accounts[4].getAddress())).to.be.revertedWith("ERC20 MQM: sender account is blacklisted");
				await expect(metaquantumtoken.addBlacklist(await accounts[8].getAddress())).to.be.revertedWith("ERC20 MQM: sender account is blacklisted");
				await expect(metaquantumtoken.addBlacklist(await accounts[12].getAddress())).to.be.revertedWith("ERC20 MQM: sender account is blacklisted");
				const address:string[] = await metaquantumtoken.getBlacklist()
				console.log("List of Address Blacklisted: ");
				for (let i=0; i < address.length ; i++) {
					console.log("Address Blacklisted : ", address[i], "Status :", await metaquantumtoken.isBlacklisted(address[i]));
				}
			});

			it("4.2.- Drop some address from Blacklist, adn verify the changes", async () => {
				console.log("Drop accounts from positions 4, 8, 12 and 16 address:");
				for (let i=4; i <= 16; i+=4) {
					await expect(metaquantumtoken.dropBlacklist(await accounts[i].getAddress())).to.emit(metaquantumtoken, 'OutBlacklisted').withArgs(await accounts[i].getAddress());
					console.log("Account ", i, "Blacklisted ", await accounts[i].getAddress());
				}
				const walletZeroAddress = '0x0000000000000000000000000000000000000000';
				console.log("Revert for WalletAddressZero");
				await expect(metaquantumtoken.dropBlacklist(walletZeroAddress)).to.be.revertedWith("ERC20 MQM: Not Add Zero Address");
				console.log("Revert for Drop a wrong wallet")
				//await expect(metaquantumtoken.dropBlacklist(await accounts[20].getAddress())).to.be.revertedWith("ERC20 MQM: Wallet don't exist");
				const address:string[] = await metaquantumtoken.getBlacklist()
				console.log("List of Address Blacklisted: ");
				for (let i=0; i < address.length ; i++) {
					console.log("Address Blacklisted : ", address[i], "Status :", await metaquantumtoken.isBlacklisted(address[i]));
				}
			});
			it("4.3.- IncreaseAllowance / Transfer / TransferFrom only the unBlacklisted Wallet", async () => {
				// Accounts[4]
				await metaquantumtoken.increaseAllowance(await accounts[4].getAddress(), '888889000000000000000000');
				console.log("Verify Allowance Accounts[0] to Accounts[4]:", (await metaquantumtoken.allowance(await accounts[0].getAddress(), await accounts[4].getAddress())).toString());
				expect((await metaquantumtoken.allowance(await accounts[0].getAddress(), await accounts[4].getAddress())).toString()).to.be.equal('888889000000000000000000');
				await metaquantumtoken.connect(accounts[4]).transferFrom(await accounts[0].getAddress(), await accounts[4].getAddress(), '888889000000000000000000');
				console.log("Balance After of Account Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 91111110000000000000000000");
				expect(((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('99111111000000000000000000');
				console.log("Balance After of Receipt: ", (await metaquantumtoken.balanceOf(await accounts[4].getAddress())).toString(), "=====> must be 888889000000000000000000");
				expect(((await metaquantumtoken.balanceOf(await accounts[4].getAddress())).toString())).to.be.equal('888889000000000000000000');
				// Accounts[8]
				await metaquantumtoken.increaseAllowance(await accounts[8].getAddress(), '30000000000000000000000000');
				console.log("Verify Allowance Accounts[0] to Accounts[8]:", (await metaquantumtoken.allowance(await accounts[0].getAddress(), await accounts[8].getAddress())).toString());
				expect((await metaquantumtoken.allowance(await accounts[0].getAddress(), await accounts[8].getAddress())).toString()).to.be.equal('30000000000000000000000000');
				await metaquantumtoken.connect(accounts[8]).transferFrom(await accounts[0].getAddress(), await accounts[8].getAddress(), '30000000000000000000000000');
				console.log("Balance After of Account Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 69111111000000000000000000");
				expect(((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('69111111000000000000000000');
				console.log("Balance After of Receipt: ", (await metaquantumtoken.balanceOf(await accounts[8].getAddress())).toString(), "=====> must be 30000000000000000000000000");
				expect(((await metaquantumtoken.balanceOf(await accounts[8].getAddress())).toString())).to.be.equal('30000000000000000000000000');
			});

			it("4.4.- IncreaseAllowance / Mint / Burn only the unBlacklisted Wallet", async () => {
				// Accounts[4]
				const walletZeroAddress = '0x0000000000000000000000000000000000000000';
				await metaquantumtoken.increaseAllowance(await accounts[4].getAddress(), '888889000000000000000000');
				console.log("Verify Allowance Accounts[0] to Accounts[4]:", (await metaquantumtoken.allowance(await accounts[0].getAddress(), await accounts[4].getAddress())).toString());
				await expect((await metaquantumtoken.allowance(await accounts[0].getAddress(), await accounts[4].getAddress())).toString()).to.be.equal('888889000000000000000000');
				await expect(metaquantumtoken.burn('888889000000000000000000')).to.emit(metaquantumtoken, 'Transfer').withArgs(await accounts[0].getAddress(), walletZeroAddress,'888889000000000000000000');
				await expect(metaquantumtoken.mint('888889000000000000000000')).to.emit(metaquantumtoken, 'Transfer').withArgs(walletZeroAddress, await accounts[0].getAddress(), '888889000000000000000000');
				await expect(metaquantumtoken.mint('888889000000000000000000')).to.be.revertedWith("ERC20: Can't Mint, it exceeds the maximum supply");
				console.log("Balance After of Account Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 69111111000000000000000000");
				expect(((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('69111111000000000000000000');
				console.log("Balance After of Receipt: ", (await metaquantumtoken.balanceOf(await accounts[4].getAddress())).toString(), "=====> must be 888889000000000000000000");
				expect(((await metaquantumtoken.balanceOf(await accounts[4].getAddress())).toString())).to.be.equal('888889000000000000000000');
				// Accounts[8]
				await metaquantumtoken.increaseAllowance(await accounts[8].getAddress(), '30000000000000000000000000');
				console.log("Verify Allowance Accounts[0] to Accounts[8]:", (await metaquantumtoken.allowance(await accounts[0].getAddress(), await accounts[8].getAddress())).toString());
				await expect((await metaquantumtoken.allowance(await accounts[0].getAddress(), await accounts[8].getAddress())).toString()).to.be.equal('30000000000000000000000000');
				await expect(metaquantumtoken.burn('888889000000000000000000')).to.emit(metaquantumtoken, 'Transfer').withArgs(await accounts[0].getAddress(), walletZeroAddress,'888889000000000000000000');
				await expect(metaquantumtoken.mint('888889000000000000000000')).to.emit(metaquantumtoken, 'Transfer').withArgs(walletZeroAddress, await accounts[0].getAddress(), '888889000000000000000000');
				await expect(metaquantumtoken.mint('888889000000000000000000')).to.be.revertedWith("ERC20: Can't Mint, it exceeds the maximum supply");
				console.log("Balance After of Account Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 69111111000000000000000000");
				expect(((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('69111111000000000000000000');
				console.log("Balance After of Receipt: ", (await metaquantumtoken.balanceOf(await accounts[8].getAddress())).toString(), "=====> must be 30000000000000000000000000");
				expect(((await metaquantumtoken.balanceOf(await accounts[8].getAddress())).toString())).to.be.equal('30000000000000000000000000');
			});

			it("4.5.- IncreaseAllowance / Transfer / TransferFrom only the Blacklisted Wallet", async () => {
				// Accounts[6]
				await metaquantumtoken.increaseAllowance(await accounts[6].getAddress(), '888889000000000000000000');
				console.log("Verify Allowance Accounts[0] to Accounts[6]:", (await metaquantumtoken.allowance(await accounts[0].getAddress(), await accounts[6].getAddress())).toString());
				expect((await metaquantumtoken.allowance(await accounts[0].getAddress(), await accounts[6].getAddress())).toString()).to.be.equal('888889000000000000000000');
				console.log("We Expect Revert the Transaction: Try to send total balance of Receipt (Accounts[6])");
				await expect(metaquantumtoken.connect(accounts[6]).transferFrom(await accounts[0].getAddress(), await accounts[6].getAddress(), '888889000000000000000000')).to.be.revertedWith("ERC20 MQM: recipient account is blacklisted");
				console.log("Balance After of Account Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 69111111000000000000000000");
				expect(((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('69111111000000000000000000');
				console.log("Balance After of Receipt: ", (await metaquantumtoken.balanceOf(await accounts[6].getAddress())).toString(), "=====> must be 0");
				expect(((await metaquantumtoken.balanceOf(await accounts[6].getAddress())).toString())).to.be.equal('0');
				// Accounts[10]
				await metaquantumtoken.increaseAllowance(await accounts[10].getAddress(), '30000000000000000000000000');
				console.log("Verify Allowance Accounts[0] to Accounts[10]:", (await metaquantumtoken.allowance(await accounts[0].getAddress(), await accounts[10].getAddress())).toString());
				expect((await metaquantumtoken.allowance(await accounts[0].getAddress(), await accounts[10].getAddress())).toString()).to.be.equal('30000000000000000000000000');
				console.log("We Expect Revert the Transaction: Try to send total balance of Receipt (Accounts[10])");
				await expect(metaquantumtoken.connect(accounts[10]).transferFrom(await accounts[0].getAddress(), await accounts[10].getAddress(), '30000000000000000000000000')).to.be.revertedWith("ERC20 MQM: recipient account is blacklisted");
				console.log("Balance After of Account Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 69111111000000000000000000");
				expect(((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('69111111000000000000000000');
				console.log("Balance After of Receipt: ", (await metaquantumtoken.balanceOf(await accounts[10].getAddress())).toString(), "=====> must be 0");
				expect(((await metaquantumtoken.balanceOf(await accounts[10].getAddress())).toString())).to.be.equal('0');
			});
		});
	});

	//   ** Function / Methods Circulating Supply */
	//   ** 5. Test Circulating Supply Method's of Smart Contract : How it is working - Test Case */
	//   ** t1. Include Multiples Wallet in the MQM Wallets Array */
	//   ** t2. Getting List of All MQM Wallets Array */
	//   ** t3. Exclude Multiples Wallets in the MQM Wallets Array */
	//   ** t4. Verify in all cases the right value of the Circulating Supply */


	it("5. Should the right value of the Circulating Supply for add, drop any wallets in the Array for MQM Wallets", async () => {
		const MetaQuantumToken = await ethers.getContractFactory("MQMTokenV1");
		const metaquantumtoken = await upgrades.deployProxy(MetaQuantumToken)

		await metaquantumtoken.deployed();
		// verify the Address
		console.log("MQM Token deployed to:", metaquantumtoken.address);
		
		 
		 
		// Verify the balance of the Owner
		console.log("Balance of the Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "must be 100 million!!! in wei");
		expect((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString()).to.be.equal('100000000000000000000000000');
		console.log("Total Supply: ", (await metaquantumtoken.totalSupply()).toString(), "must be 100 million!!! in wei");
		expect(((await metaquantumtoken.totalSupply()).toString())).to.be.equal('100000000000000000000000000');
		await expect(metaquantumtoken.transfer((await accounts[19].getAddress()).toString(),'888889000000000000000000')).to.emit(metaquantumtoken, 'Transfer').withArgs(await accounts[0].getAddress(), await accounts[19].getAddress(), '888889000000000000000000');

		describe("Add Wallet to the blacklist and getting the list, and drop someone, and update the list", async () => {
			it("5.1.- Sending Token to Different Wallets and Verify the Circulating Supply with zero MQM Wallets", async () => {
				console.log("Verify the Circulating Supply with Start:", (await metaquantumtoken.circulatingSupply()).toString());
				expect((await metaquantumtoken.circulatingSupply()).toString()).to.equal('888889000000000000000000');
				console.log("Verify Owner Address Balance with Start: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString());
				expect((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString()).to.equal('99111111000000000000000000');
				console.log("Execute multiples Transfer for all odd Account from 4 to 18")
				for (let i=4; i <= 18; i+=2) {
					await expect(metaquantumtoken.transfer(await accounts[i].getAddress(),'9911111100000000000000000')).to.emit(metaquantumtoken, 'Transfer').withArgs(await accounts[0].getAddress(), await accounts[i].getAddress(), '9911111100000000000000000');
					console.log("Account ", i, "Receipt Address for Verify Circulating: ", await accounts[i].getAddress());
				}
				console.log("Circulating Supply After Sending Tokens to Several Accounts: ", (await metaquantumtoken.circulatingSupply()).toString());
				expect((await metaquantumtoken.circulatingSupply()).toString()).to.equal('80177777800000000000000000');
				console.log("Verify Owner Address Balance After: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString());
				expect((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString()).to.equal('19822222200000000000000000');
			})

			it("5.2.- Add several list of Accounts in the MQM Wallets Array: ", async () => {
				console.log("Verify only the Owner can add wallet to the MQM Wallets Array: ");
				await expect(metaquantumtoken.connect(accounts[1]).addMetaQuantumWallet(await accounts[0].getAddress())).to.be.revertedWith("Ownable: caller is not the owner");
				const walletZeroAddress = '0x0000000000000000000000000000000000000000';
				console.log("Revert for WalletAddressZero");
				await expect(metaquantumtoken.addMetaQuantumWallet(walletZeroAddress)).to.be.revertedWith("ERC20 MQM: Not Add Zero Address");
				console.log("Add MQM Wallets array, Accounts 4, 8, 12 and 16:");
				for (let i=4; i <= 16; i+=4) {
					await expect(metaquantumtoken.addMetaQuantumWallet(await accounts[i].getAddress())).to.emit(metaquantumtoken, 'InMetaQuantumWallet').withArgs(await accounts[i].getAddress());
					console.log("Account ", i, "MQM Wallets Address", await accounts[i].getAddress());
				}
				console.log("Revert for Add again in the MetaQuantumWallet Arrays");
				await expect(metaquantumtoken.addMetaQuantumWallet(await accounts[4].getAddress())).to.be.revertedWith("ERC20 MQM: wallet is already");
				await expect(metaquantumtoken.addMetaQuantumWallet(await accounts[8].getAddress())).to.be.revertedWith("ERC20 MQM: wallet is already");
				await expect(metaquantumtoken.addMetaQuantumWallet(await accounts[12].getAddress())).to.be.revertedWith("ERC20 MQM: wallet is already");
				const address:string[] = await metaquantumtoken.getMetaQuantumWallets();
				console.log("List of Address MQM Wallets: ");
				for (let i=0; i < address.length ; i++) {
					console.log("Address MQM Wallets: ", address[i], "Status :", await metaquantumtoken.isMetaQuantumWallet(address[i]));
				}
			});

			it("5.3.- Verify the Circulating Supply After add Money the MQM Wallets  ", async () => {
				console.log("Transfer Token for Several Wallet and Very:");
				console.log("Circulating Supply After Sending Several Accounts: ", (await metaquantumtoken.circulatingSupply()).toString());
				expect((await metaquantumtoken.circulatingSupply()).toString()).to.equal('40533333400000000000000000');
				console.log("Verify Owner Address Balance After: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString());
				expect((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString()).to.equal('19822222200000000000000000');
			});

			it("5.4.- Drop some address from MQM Wallets, and verify the changes", async () => {
				console.log("Drop accounts from positions 4, 8, 12 and 16 address:");
				const address:string[] = await metaquantumtoken.getMetaQuantumWallets();
				for (let i=4; i <= 16; i+=4) {
					await expect(metaquantumtoken.dropMetaQuantumWallet(await accounts[i].getAddress())).to.emit(metaquantumtoken, 'OutMetaQuantumWallet').withArgs(await accounts[i].getAddress());
					console.log("Account ", i, "MQM Wallets Address ", await accounts[i].getAddress());
				}
				const walletZeroAddress = '0x0000000000000000000000000000000000000000';
				console.log("Revert for WalletAddressZero");
				await expect(metaquantumtoken.dropMetaQuantumWallet(walletZeroAddress)).to.be.revertedWith("ERC20 MQM: Not Add Zero Address");
				console.log("Revert for Drop an not exist address")
				//await expect(metaquantumtoken.dropMetaQuantumWallet(await accounts[20].getAddress())).to.be.revertedWith("ERC20 MQM: Wallet don't exist");
				const address2:string[] = await metaquantumtoken.getMetaQuantumWallets();
				expect(address2.length).to.be.equal(address.length-4);
				console.log("List of Address MQM Wallets: ");
				for (let i=0; i < address2.length ; i++) {
					console.log("Address MQM Wallets: ", address[i], "Status :",  await metaquantumtoken.isMetaQuantumWallet(address[i]));
				}
			});

			it("5.5.- Verify the Circulating Supply After Drop all MQM Wallets  ", async () => {
				console.log("Circulating Supply After drop All MQM Wallets: ", (await metaquantumtoken.circulatingSupply()).toString());
				expect((await metaquantumtoken.circulatingSupply()).toString()).to.equal('80177777800000000000000000');
				console.log("Verify Owner Address Balance After: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString());
				expect((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString()).to.equal('19822222200000000000000000');
			});

			//it("5.6.- Sending token another Count not included in MQM Wallets: ", async () => {
			//	await expect(metaquantumtoken.connect(accounts[1]).addMetaQuantumWallet(await accounts[0].getAddress())).to.be.revertedWith("Ownable: caller is not the owner");
			//	console.log("Transfer Token to Accounts 2, 6, 10, 14 and 18:");
			//	for (let i=2; i <= 18; i+=4) {
			//		await expect(metaquantumtoken.transfer(await accounts[i].getAddress(),'100')).to.emit(metaquantumtoken, 'Transfer').withArgs(await accounts[0].getAddress(), await accounts[i].getAddress(), '100');
			//		console.log("Account ", i, "Receipt Address for Verify Circulating: ", await accounts[i].getAddress());
			//		console.log("Balance Receipt Address for Verify Circulating: ", (await metaquantumtoken.balanceOf(await accounts[i].getAddress())).toString());
			//	}
			//	console.log("Circulating Supply After drop All MQM Wallets: ", (await metaquantumtoken.circulatingSupply()).toString());
			//	expect((await metaquantumtoken.circulatingSupply()).toString()).to.equal('138888900000000000');
			//	console.log("Verify Owner Address Balance After: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString());
			//	expect((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString()).to.equal('6250000000000000000');
			//});

			it("5.7.- Verify the Circulating Supply if include the accounts 2, 6, 10, 14 and 18 in the MQM Wallets Array: ", async () => {
				await expect(metaquantumtoken.connect(accounts[1]).addMetaQuantumWallet(await accounts[0].getAddress())).to.be.revertedWith("Ownable: caller is not the owner");
				console.log("Add MQM Wallets array the Accounts 2, 6, 10, 14 and 18:");
				for (let i=2; i <= 18; i+=4) {
					await expect(metaquantumtoken.addMetaQuantumWallet(await accounts[i].getAddress())).to.emit(metaquantumtoken, 'InMetaQuantumWallet').withArgs(await accounts[i].getAddress());
					console.log("Account ", i, "MQM Wallets Address", await accounts[i].getAddress());
				}
				console.log("Circulating Supply After drop All MQM Wallets: ", (await metaquantumtoken.circulatingSupply()).toString());
				expect((await metaquantumtoken.circulatingSupply()).toString()).to.equal('40533333400000000000000000');
				console.log("Verify Owner Address Balance After: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString());
				expect((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString()).to.equal('19822222200000000000000000');
			});

		});
	});

	//   ** Function / Methods Claim Token and Native Coins */
	//   ** 6. Test Claim Method's of Smart Contract : How it is working - Test Case */
	//   ** t1. Sending Native Coin and Claim with the Methods */
	//   ** t2. Sending Token ERC20 and Clain with the Methods */

	it("6. Should the right value of the Claim wallets in the Array for MQM Wallets", async () => {
		const MetaQuantumToken = await ethers.getContractFactory("MQMTokenV1");
		const Erc20Token = await ethers.getContractFactory("ERC20Token");
		const metaquantumtoken = await upgrades.deployProxy(MetaQuantumToken)
		const erc20Token = await upgrades.deployProxy(Erc20Token);

		await metaquantumtoken.deployed();
		await erc20Token.deployed();
		// verify the Address
		console.log("MQM Token deployed to:", metaquantumtoken.address);
		
		 
		 
		console.log("ERC20 Token deployed to:", erc20Token.address);
		// Verify the balance of the Owner
		console.log("Balance of the Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "must be 100 million!!! in wei");
		expect((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString()).to.be.equal('100000000000000000000000000');
		console.log("Total Supply: ", (await metaquantumtoken.totalSupply()).toString(), "must be 100 million!!! in wei");
		expect(((await metaquantumtoken.totalSupply()).toString())).to.be.equal('100000000000000000000000000');
		describe("Sending Native Token and ERC20 Token and after Claim with the Methods", async () => {
			it("6.1.-  Sending Native Token and After Claim with the Method", async () => {
				console.log("Verify the Balance before send ETH: ", (await ethers.provider.getBalance(metaquantumtoken.address)).toString());
				const value = ethers.utils.parseEther('1000.0');
				const value2 = ethers.utils.parseEther('1000.0');
				await accounts[3].sendTransaction({to: await accounts[0].getAddress(), value: value});
				console.log("Verify Balance of ETH Accounts[0] before claim : ", (await ethers.provider.getBalance(await accounts[0].getAddress())).toString());
				await accounts[0].sendTransaction({to: metaquantumtoken.address, value: value2});
				//await expect(accounts[0].sendTransaction({to: metaquantumtoken.address, value: 10})).to.be.revertedWith("ERC20 MQM: Sending Ether for Error, revert!!!");
				console.log("Verify the Balance After send ETH: ", (await ethers.provider.getBalance(metaquantumtoken.address)).toString());
				const walletZeroAddress = '0x0000000000000000000000000000000000000000';
				console.log("Revert for WalletAddressZero");
				await expect(metaquantumtoken.claimValues('0x0000000000000000000000000000000000000000', walletZeroAddress)).to.be.revertedWith("ERC20 MQM: Not Add Zero Address");
				const address = await accounts[15].getAddress();
				console.log("Verify Balance of ETH Accounts[15] before claim: ", (await ethers.provider.getBalance(address)).toString());
				await metaquantumtoken.claimValues('0x0000000000000000000000000000000000000000', address);
				console.log("Verify Balance of ETH Accounts[15] After claim: ", (await ethers.provider.getBalance(address)).toString());
				console.log("Verify Balance of ETH Accounts[0] After claim : ", (await ethers.provider.getBalance(await accounts[0].getAddress())).toString());

			});

			it("6.2- Sending ERC20 token and After Claim with Method", async () => {
				await erc20Token.mintToWallet(metaquantumtoken.address,'9000000000000000000');
				console.log("Balance ERC20 Token of Smart Contract MQM before Claim: ", (await erc20Token.balanceOf(metaquantumtoken.address)).toString());
				const walletZeroAddress = '0x0000000000000000000000000000000000000000';
				console.log("Revert for WalletAddressZero");
				await expect(metaquantumtoken.claimValues(erc20Token.address, walletZeroAddress)).to.be.revertedWith("ERC20 MQM: Not Add Zero Address");
				const address = await accounts[15].getAddress();
				console.log("Balance ERC20 Token of Accounts[15] before Claim: ", (await erc20Token.balanceOf(address)).toString());
				await metaquantumtoken.claimValues(erc20Token.address, address);
				console.log("Balance ERC20 Token of Accounts[15] After Claim: ", (await erc20Token.balanceOf(address)).toString());
				console.log("Balance ERC20 Token of Smart Contract MQM After Claim: ", (await erc20Token.balanceOf(metaquantumtoken.address)).toString());
			})
		});
	});

	//   ** Function / Method ERC20 Permit for gas less transaction */
	//   ** 8. Test ERC20 Permit  Methods of Smart Contract : How it is working - Test Case */
	//   ** t1. Verify DOMAIN_SEPARATOR ERC20 Permit Methods */
	//   ** t2. Verify ERC20 Permit Methods worked with thr right value and revert when is wrong */

	it("8.- Testing Method ERC20 Permit for gas less transaction and Verify the Approval process and Event", async () => {

		const MetaQuantumToken = await ethers.getContractFactory("MQMTokenV1");
		const Erc20Token = await ethers.getContractFactory("ERC20Token");
		const metaquantumtoken = await upgrades.deployProxy(MetaQuantumToken)
		const erc20Token = await upgrades.deployProxy(Erc20Token);

		await metaquantumtoken.deployed();
		await erc20Token.deployed();
		// verify the Address
		console.log("MQM Token deployed to:", metaquantumtoken.address);
		
		 
		 
		console.log("ERC20 Token deployed to:", erc20Token.address);
		// Verify the balance of the Owner
		console.log("Balance of the Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "must be 100 million!!! in wei");
		expect((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString()).to.be.equal('100000000000000000000000000');
		console.log("Total Supply: ", (await metaquantumtoken.totalSupply()).toString(), "must be 100 million!!! in wei");
		expect(((await metaquantumtoken.totalSupply()).toString())).to.be.equal('100000000000000000000000000');

		// variables of ERC Permit Test
		const PRIVATEKEY = `${process.env.PRIVATE_KEY}`
		const ownerPrivateKey = Buffer.from(PRIVATEKEY, 'hex');
		const chainId = 31337; // buidlerevm chain id

		const owner = accounts[0];
		const user = accounts[1];
		const name:string = (await metaquantumtoken.name()).toString();

		describe("Testing the ERC20 Permit Method a Auxiliary Methods", async () => {

			it('8.1.- initializes DOMAIN_SEPARATOR and PERMIT_TYPEHASH correctly', async () => {
				assert.equal(await owner.getAddress(), '0x83143d38ae13BF14AbE424a410312c7f93Af1988');

				assert.equal(name, 'MetaQuantum');

				assert.equal(await metaquantumtoken.DOMAIN_SEPARATOR(), getDomainSeparator(name, metaquantumtoken.address, chainId));
			  })

			it('8.2.- ERC20 Permits and emits Approval (replay safe) from EOA Address', async () => {
				// Create the approval request
				const approve = {
				  owner: await owner.getAddress(),
				  spender: await user.getAddress(),
				  value: BigNumber.from(100),
				};

				// deadline as much as you want in the future
				const deadline = BigNumber.from(100000000000000);

				// Get the user's nonce
				const nonce:BigNumber = await metaquantumtoken.nonces(approve.owner);

				// Get the EIP712 digest
				const digest = getPermitDigest(name, metaquantumtoken.address, chainId, approve, nonce, deadline);

				// Sign it
				// NOTE: Using web3.eth.sign will hash the message internally again which
				// we do not want, so we're manually signing here
				const { v, r, s } = sign(digest, ownerPrivateKey);

				// Approve it
				const permitTx = await metaquantumtoken.permit(approve.owner, approve.spender, approve.value, deadline, v, r, s);
				const recipient = await permitTx.wait();
				const events = recipient.events;

				// It worked!
				expect(events[0].event).to.be.equal('Approval');
				expect(await metaquantumtoken.nonces(approve.owner)).to.be.equal(1);
				expect(await metaquantumtoken.allowance(approve.owner, approve.spender)).to.be.equal(approve.value);

				// Re-using the same sig doesn't work since the nonce has been incremented
				// on the contract level for replay-protection
				await expect(
				  metaquantumtoken.permit(approve.owner, approve.spender, approve.value, deadline, v, r, s))
				  .to.be.revertedWith('ERC20Permit: invalid signature');

				// invalid ecrecover's return address(0x0), so we must also guarantee that
				// this case fail for wrong v value
				await expect(
					metaquantumtoken.permit(
						approve.owner,
						approve.spender,
						approve.value,
						deadline,
						99,
						r,
						s
					)).to.be.revertedWith("ECDSA: invalid signature 'v' value");

				// invalid ecrecover's return address(0x0), so we must also guarantee that
				// this case fail for address(0)
				await expect(
					metaquantumtoken.permit(
						'0x0000000000000000000000000000000000000000',
						approve.spender,
						approve.value,
						deadline,
						v,
						r,
						s
					)).to.be.revertedWith("ERC20Permit: invalid signature");

				// invalid ecrecover's return address(0x0), so we must also guarantee that
				// this case fail for address(0)
				const ss = Buffer.from('7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0', 'hex');
				await expect(
					metaquantumtoken.permit(
						approve.owner,
						approve.spender,
						approve.value,
						deadline,
						v,
						r,
						ss
					)).to.be.revertedWith("ERC20Permit: invalid signature");
			});

			it('8.3.- ERC20 Permits and emits Approval (replay safe) from Smart Contract Wallet', async () => {
				// Create the approval request
				const approve = {
				  owner: erc20Token.address,
				  spender: await user.getAddress(),
				  value: BigNumber.from(100),
				};

				// deadline as much as you want in the future
				const deadline = BigNumber.from(100000000000000);

				// Get the user's nonce
				const nonce:BigNumber = await metaquantumtoken.nonces(approve.owner);

				// Get the EIP712 digest
				const digest = getPermitDigest(name, metaquantumtoken.address, chainId, approve, nonce, deadline);

				// Sign it
				// NOTE: Using eth.sign will hash the message internally again which
				// we do not want, so we're manually signing here
				const { v, r, s } = sign(digest, ownerPrivateKey);

				// transfer MQM token to smart contract address
				await metaquantumtoken.transfer(approve.owner, ethers.utils.parseEther(String(5000)));
				expect((await metaquantumtoken.balanceOf(approve.owner)).toString()).to.be.equal(ethers.utils.parseEther(String(5000)).toString());

				// Approve it
				const permitTx = await metaquantumtoken.permit(approve.owner, approve.spender, approve.value, deadline, v, r, s);
				const recipient = await permitTx.wait();
				const events = recipient.events;

				// It worked!
				expect(events[0].event).to.be.equal('Approval');
				expect(await metaquantumtoken.nonces(approve.owner)).to.be.equal(1);
				expect(await metaquantumtoken.allowance(approve.owner, approve.spender)).to.be.equal(approve.value);

			});
		});
	})

	//   ** Function / Method AntiBot Protection based on Shield Finance  */
	//   ** 9. Test AntiBot Protection Methods of Smart Contract : How it is working - Test Case */
	//   ** t1. Verify DOMAIN_SEPARATOR ERC20 Permit Methods */
	//   ** t2. Verify ERC20 Permit Methods worked with thr right value and revert when is wrong */

	it("9.- Testing Method ERC20 Permit for gas less transaction and Verify the Approval process and Event", async () => {

		const MetaQuantumToken = await ethers.getContractFactory("MQMTokenV1");
		const Erc20Token = await ethers.getContractFactory("ERC20Token");
		const metaquantumtoken = await upgrades.deployProxy(MetaQuantumToken)
		const erc20Token = await upgrades.deployProxy(Erc20Token);

		await metaquantumtoken.deployed();
		await erc20Token.deployed();
		// verify the Address
		console.log("MQM Token deployed to:", metaquantumtoken.address);
		
		 
		 
		console.log("ERC20 Token deployed to:", erc20Token.address);
		// Verify the balance of the Owner
		console.log("Balance of the Owner: ", (await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString(), "must be 100 million!!! in wei");
		expect((await metaquantumtoken.balanceOf(await accounts[0].getAddress())).toString()).to.be.equal('100000000000000000000000000');
		console.log("Total Supply: ", (await metaquantumtoken.totalSupply()).toString(), "must be 100 million!!! in wei");
		expect(((await metaquantumtoken.totalSupply()).toString())).to.be.equal('100000000000000000000000000');

		// variables of ERC Permit Test
		const PRIVATEKEY = `${process.env.PRIVATE_KEY}`
		const ownerPrivateKey = Buffer.from(PRIVATEKEY, 'hex');
		const chainId = 31337; // buidlerevm chain id
		let defenseBlockDuration: number;

		const owner = accounts[0];
		const user = accounts[1];
		const tokenAmount = BigNumber.from(10);
		const name:string = (await metaquantumtoken.name()).toString();

		describe('9.- Test From AntiBots Defense', async () => {

			beforeEach(async () => {
				// initialize
				defenseBlockDuration = 20

				// give some tokens to nonOwner for tests
				metaquantumtoken.transfer(await user.getAddress(), tokenAmount.mul(2));
				metaquantumtoken.transfer(await accounts[10].getAddress(), tokenAmount.mul(2));
				metaquantumtoken.transfer(await accounts[11].getAddress(), tokenAmount.mul(2));
				metaquantumtoken.transfer(await accounts[12].getAddress(), tokenAmount.mul(2));
			});

			it("9.1.- Should run disableTransfers only by owner", async () => {
				await expect(
					metaquantumtoken.connect(user).disableTransfers(defenseBlockDuration)
				).to.be.revertedWith("caller is not the owner");
			});

			it("9.2.- Anti-bot defense should be off after deploy", async () => {
				const isTransferDisabled = await metaquantumtoken.getIsTransferDisabled();
				expect(isTransferDisabled).to.be.equal(false);
			});

			it("9.3.- Should burn when transfer for regular wallets if defense is on", async () => {
				const supply: BigNumber = await metaquantumtoken.totalSupply();

				await metaquantumtoken.disableTransfers(defenseBlockDuration);

				// owner should transfer
				expect(await metaquantumtoken.getIsTransferDisabled()).to.be.equal(true);

				const senderBalance: BigNumber = await metaquantumtoken.balanceOf(await user.getAddress());
				const receiverBalance: BigNumber = await metaquantumtoken.balanceOf(await owner.getAddress());

				// try to send tokens
				await expect(metaquantumtoken.connect(user).transfer(await owner.getAddress(), tokenAmount))
					.to.emit(metaquantumtoken, "TransferBurned")
					.withArgs(await user.getAddress(), tokenAmount);

				// balance of sender should decreased
				const newSenderBalance: BigNumber = await metaquantumtoken.balanceOf(
					await user.getAddress()
				);
				expect(newSenderBalance).to.equal(senderBalance.sub(tokenAmount));

				// balance of receiver should be unchanged
				const newReceiverBalance: BigNumber = await metaquantumtoken.balanceOf(
					await owner.getAddress()
				);
				expect(newReceiverBalance).to.equal(receiverBalance);

				// total supply should decreased after burn
				const newSupply: BigNumber = await metaquantumtoken.totalSupply();
				expect(newSupply).to.equal(supply.sub(tokenAmount));
			});

			
			it("9.5.- Should transfer with the defense is on, when the addresses are whitelisted ", async () => {
				await metaquantumtoken.disableTransfers(defenseBlockDuration);

				// Verify the AntiBots Defense it's on
				expect(await metaquantumtoken.getIsTransferDisabled()).to.be.equal(true);
 	 			console.log("Defense AntiBots ON");
				console.log("User Balance Before Burn:", (await metaquantumtoken.balanceOf(await user.getAddress())).toString());
				expect((await metaquantumtoken.balanceOf(await user.getAddress())).toString()).to.be.equal('70');

				// Burn the transfer because the address is not in the whitelisted
				await expect(
					metaquantumtoken.connect(user).transfer(await owner.getAddress(), tokenAmount)
				).to.emit(metaquantumtoken, "TransferBurned");
				console.log("User Balance After Burn:", (await metaquantumtoken.balanceOf(await user.getAddress())).toString());
				expect((await metaquantumtoken.balanceOf(await user.getAddress())).toString()).to.be.equal('60');

				// Add the user wallet in the whitelisted wallets array
				await expect(
					metaquantumtoken.addWhiteListed(await user.getAddress())
				).to.emit(metaquantumtoken, "InWhiteListWallet");
				console.log("User Address Add whitelisted");

				// Add multiples Address in the Whitelisted Array
				await expect(metaquantumtoken.addWhiteListed(await accounts[10].getAddress())).to.emit(metaquantumtoken, "InWhiteListWallet");
				await expect(metaquantumtoken.addWhiteListed(await accounts[11].getAddress())).to.emit(metaquantumtoken, "InWhiteListWallet");
				await expect(metaquantumtoken.addWhiteListed(await accounts[12].getAddress())).to.emit(metaquantumtoken, "InWhiteListWallet");
				console.log("Add multiples whitelisted");

				// Verify the user address are in the whitelisted wallets array
				expect(await metaquantumtoken.isWhiteListed(await user.getAddress())).to.be.equal(true);
				let whitelisted = await metaquantumtoken.getWhiteListWallets();
				console.log("List of Wallets Whitelisted: ", whitelisted);
				console.log("User Balance After Whitelisted, Before Transfer:", (await metaquantumtoken.balanceOf(await user.getAddress())).toString());
				expect((await metaquantumtoken.balanceOf(await user.getAddress())).toString()).to.be.equal('60');

				// Revert if you add again
				await expect(
					metaquantumtoken.addWhiteListed(await user.getAddress())
				).to.be.revertedWith("ERC20 MQM: wallet is already");

				//execute a transfer
				await expect(
					metaquantumtoken.connect(user).transfer(await owner.getAddress(), tokenAmount)
				).to.emit(metaquantumtoken, "Transfer");
				console.log("Owner Balance After first Tx:", (await metaquantumtoken.balanceOf(await owner.getAddress())).toString());
				await expect(
					metaquantumtoken.connect(accounts[10]).transfer(await owner.getAddress(), tokenAmount)
				).to.emit(metaquantumtoken, "Transfer");
				console.log("Owner Balance After second Tx:", (await metaquantumtoken.balanceOf(await owner.getAddress())).toString());
				await expect(
					metaquantumtoken.connect(accounts[11]).transfer(await owner.getAddress(), tokenAmount)
				).to.emit(metaquantumtoken, "Transfer");
				console.log("Owner Balance After third Tx:", (await metaquantumtoken.balanceOf(await owner.getAddress())).toString());
				await expect(
					metaquantumtoken.connect(accounts[12]).transfer(await owner.getAddress(), tokenAmount)
				).to.emit(metaquantumtoken, "Transfer");
				console.log("Owner Balance After four Tx:", (await metaquantumtoken.balanceOf(await owner.getAddress())).toString());

				// Drop the user wallet of the whitelisted wallets array
				await expect(
					metaquantumtoken.dropWhiteListed(await user.getAddress())
				).to.emit(metaquantumtoken, "OutWhiteListWallet");
				console.log("User Address Drop whitelisted");

				// Add multiples Address in the Whitelisted Array
				await expect(metaquantumtoken.dropWhiteListed(await accounts[10].getAddress())).to.emit(metaquantumtoken, "OutWhiteListWallet");
				await expect(metaquantumtoken.dropWhiteListed(await accounts[11].getAddress())).to.emit(metaquantumtoken, "OutWhiteListWallet");
				await expect(metaquantumtoken.dropWhiteListed(await accounts[12].getAddress())).to.emit(metaquantumtoken, "OutWhiteListWallet");
				console.log("Drop multiples whitelisted");

				// Verify the user address are in the whitelisted wallets array
				expect(await metaquantumtoken.isWhiteListed(await user.getAddress())).to.be.equal(false);
				whitelisted = await metaquantumtoken.getWhiteListWallets();
				console.log("List of Wallets Whitelisted: ", whitelisted);
				console.log("User Balance After Drop Whitelisted, Before Burn:", (await metaquantumtoken.balanceOf(await user.getAddress())).toString());
				expect((await metaquantumtoken.balanceOf(await user.getAddress())).toString()).to.be.equal('50');

				// Revert if you drop again
				await expect(
					metaquantumtoken.dropWhiteListed(await user.getAddress())
				).to.be.revertedWith("ERC20 MQM: Wallet don't exist");

				// Verify the AntiBots Defense still on
				expect(await metaquantumtoken.getIsTransferDisabled()).to.be.equal(true);

				// Burn the transfer because the address is not in the whitelisted
				await expect(
					metaquantumtoken.connect(user).transfer(await owner.getAddress(), tokenAmount)
				).to.emit(metaquantumtoken, "TransferBurned");
				console.log("User Balance After Second Burn:", (await metaquantumtoken.balanceOf(await user.getAddress())).toString());
				expect((await metaquantumtoken.balanceOf(await user.getAddress())).toString()).to.be.equal('40');

			});

			it("9.6.- Should transfer after defense is over", async () => {
				await metaquantumtoken.disableTransfers(defenseBlockDuration);

				expect(await metaquantumtoken.getIsTransferDisabled()).to.be.equal(true);

				// wait until defense is over
				await skipBlocks(defenseBlockDuration);

				expect(await metaquantumtoken.getIsTransferDisabled()).to.be.equal(false);

				await expect(
					metaquantumtoken.connect(user).transfer(await owner.getAddress(), tokenAmount)
				).to.not.emit(metaquantumtoken, "TransferBurned");
			});

			it("9.7.- Should disable defense calling disableBurnBeforeBlockNumber method", async () => {
				await metaquantumtoken.disableBurnBeforeBlockNumber();

				const burnBeforeBlockNumber = await metaquantumtoken.getBurnBeforeBlockNumber();
				expect(burnBeforeBlockNumber).to.be.equal(0);

				const burnBeforeBlockNumberDisabled =
					await metaquantumtoken.getBurnBeforeBlockNumberDisabled();
				expect(burnBeforeBlockNumberDisabled).to.be.equal(true);

				await expect(
					metaquantumtoken.disableTransfers(defenseBlockDuration)
				).to.be.revertedWith("Bot defense is disabled");
			});

			it("9.8.- Should run disableBurnBeforeBlockNumber only by owner", async () => {
				await expect(
					metaquantumtoken.connect(user).disableBurnBeforeBlockNumber()
				).to.be.revertedWith("caller is not the owner");
			});

		})

	});

});
