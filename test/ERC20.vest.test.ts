import { ethers, network, upgrades } from 'hardhat';
import { BigNumber, Signer } from "ethers";
import { expect } from "chai";
import moment from 'moment';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe("ERC20 Only Vesting Test", async () => {

	let accounts: Signer[]
	let defenseBlockDuration: number;

	beforeEach(async () => {
		accounts = await ethers.getSigners();
        console.log("accounts size", accounts.length)
		// console.log("Accounts:", accounts.map((a) => a.getAddress()));
		console.log("Get TimeStamp:", Math.floor((await ethers.provider.getBlock("latest")).timestamp));
	});

	//   ** Function Total Supply, Balance of, Name, Symbol, Decimals */
	//   ** 1. Test Add Allocation in the ERC20 MQMVesting Smart Contract : How it is working - Test Case */
	//   ** t1. Add Allocation and Verify Frozen Wallets, include, Unlocked and Locked Tokens into the Wallets*/
	//   ** t2. Verify each Allocation day by day Frozen Wallets, include, Unlocked and Locked Tokens into the Wallets*/


	it("1.- Add Allocation, and Verify into the Frozen Wallets Unlocked and Locked Tokens into the Wallets", async () => {
		const MetaQuantumToken = await ethers.getContractFactory("MQMTokenV1");
		const mqmtoken = await upgrades.deployProxy(MetaQuantumToken);
        await mqmtoken.deployed();
		// verify the Address
		console.log("MQMTokenV1 deployed to:", mqmtoken.address);
        
        //Deploy MQMVesting Token
        const MQMVesting = await ethers.getContractFactory("MQMVesting");
		const mqmvesting = await upgrades.deployProxy(MQMVesting,[mqmtoken.address], {initializer: 'initialize' });
        await mqmvesting.deployed();
		// verify the Address
		console.log("MQMVesting deployed to:", mqmvesting.address);

		// Verify the balance of the Owner
		// TGE TimeStamp
		let TGE = moment((await mqmvesting.getReleaseTime())*1000).utc();
		console.log("TimeStamp TGE: ", parseInt(TGE.format('X')), " Full Date Token Generate Event: ", TGE.format("dddd, MMMM Do YYYY, h:mm:ss a"));
		console.log("Balance of the Owner: ", (await mqmtoken.balanceOf(await accounts[0].getAddress())).toString(), "must be 100 million!!! in wei");
		expect((await mqmtoken.balanceOf(await accounts[0].getAddress())).toString()).to.be.equal('100000000000000000000000000');
		console.log("Total Supply: ", (await mqmtoken.totalSupply()).toString(), "must be 100 million!!! in wei");
		expect(((await mqmtoken.totalSupply()).toString())).to.be.equal('100000000000000000000000000');
		// Define the Array for address and vesting process
		let addresses1:string[] = [];
		let addresses2:string[] = [];
		let addresses3:string[] = [];
		let addresses4:string[] = [];
		let addresses5:string[] = [];
		let addresses6:string[] = [];
		let addresses7:string[] = [];
		let addresses8:string[] = [];
		let addresses9:string[] = [];
		let addresses10:string[] = [];
		//Allocations
		let amount1:BigNumber[] = [];
		let amount2:BigNumber[] = [];
		let amount3:BigNumber[] = [];
		let amount4:BigNumber[] = [];
		let amount5:BigNumber[] = [];
		let amount6:BigNumber[] = [];
		let amount7:BigNumber[] = [];
		let amount8:BigNumber[] = [];
		let amount9:BigNumber[] = [];
		let amount10:BigNumber[] = [];
			addresses1.push((await accounts[1].getAddress()).toString());
			addresses2.push((await accounts[2].getAddress()).toString());
			addresses3.push((await accounts[3].getAddress()).toString());
			addresses4.push((await accounts[4].getAddress()).toString());
			addresses5.push((await accounts[5].getAddress()).toString());
			addresses6.push((await accounts[6].getAddress()).toString());
			addresses7.push((await accounts[7].getAddress()).toString());
			addresses8.push((await accounts[8].getAddress()).toString());
			addresses9.push((await accounts[9].getAddress()).toString());
			addresses10.push((await accounts[10].getAddress()).toString());
			//Allocations
			amount1.push(ethers.utils.parseEther(String(2500000)));
			amount2.push(ethers.utils.parseEther(String(7000000)));
			amount3.push(ethers.utils.parseEther(String(12500000)));
			amount4.push(ethers.utils.parseEther(String(1000000)));
			amount5.push(ethers.utils.parseEther(String(18500000)));
			amount6.push(ethers.utils.parseEther(String(7000000)));
			amount7.push(ethers.utils.parseEther(String(7000000)));
			amount8.push(ethers.utils.parseEther(String(17000000)));
			amount9.push(ethers.utils.parseEther(String(15000000)));
			amount10.push(ethers.utils.parseEther(String(12500000)));
		
		const address:string = addresses1[0];
		const amount:BigNumber =  amount1[0];
		describe("Start to Load the All Wallets in the allocation to corresponding such vesting process", async () => {
			beforeEach(async () => {
				// initialize
				defenseBlockDuration = 20
				const tiempo = Math.floor((await ethers.provider.getBlock("latest")).timestamp);
				console.log("beforeEach - Verify TimeStamp: ", tiempo," Full Date: ", moment(tiempo*1000).utc().format("dddd, MMMM Do YYYY, h:mm:ss a"));
			})

			it("1.1.- Call the AddAllocation Method, and Include a Address Zero, in the Wallets Array, Revert Transaction", async () => {
				// Revert Because include a Zero Address in Array
				addresses1[0] = '0x0000000000000000000000000000000000000000';
				console.log("addresses1[0]",addresses1[0]);
				console.log("amount1[0]",amount1[0]);
				await expect(mqmvesting.connect(accounts[0]).addAllocations(addresses1, amount1, 0)).to.be.revertedWith("revert ERC20 MQM: transfer to the zero address")
			});

			it("1.2.- Call the AddAllocation Method, and Include a Blacklisted Address in the Wallets Array, Revert Transaction", async () => {
				// Revert Because include a Blacklisted Address in Array
				addresses1[0] = address;
				await expect(mqmvesting.connect(accounts[0]).addBlacklist(address)).to.emit(mqmvesting, 'InBlacklisted').withArgs(address);
				await expect(mqmvesting.connect(accounts[0]).addAllocations(addresses1, amount1, 0)).to.be.revertedWith("revert ERC20 MQM: recipient account is blacklisted");
				await expect(mqmvesting.connect(accounts[0]).dropBlacklist(address)).to.emit(mqmvesting, 'OutBlacklisted').withArgs(address);
			});

			it("1.3.- Call the AddAllocation Method, and Include a Zero TotalAmount, in the Amount Array, Revert Transaction", async () => {
				// Revert Because include a Zero TotalAmount in Array
				amount1[0] = ethers.utils.parseEther(String(0));
				await expect(mqmvesting.connect(accounts[0]).addAllocations(addresses1, amount1, 0)).to.be.revertedWith("revert ERC20 MQM: total amount token is zero");
				amount1[0] = amount;
			});
			  //deposit and lock 100 milion MQM
			it("1.4.- Transfer method from owner MQM Token to MQM Vesting contract ", async () => {
				const tokenAmount = BigNumber.from(0);
				// Revert Because include a Zero TotalAmount in Array
				await mqmtoken.connect(accounts[0]).disableTransfers(defenseBlockDuration)
				const balance: BigNumber = await mqmtoken.balanceOf(await accounts[0].getAddress());
				console.log("account[0] current balance",balance);

				await mqmtoken.connect(accounts[0]).transfer(mqmvesting.address, balance);
				await expect((await mqmtoken.balanceOf(await accounts[0].getAddress())).toString()).to.equal('0');
				await expect((await mqmtoken.balanceOf(await mqmvesting.address)).toString()).to.equal('100000000000000000000000000');
			});

			it("1.5.- Call the AddAllocation Method for Allocation #1 and upload all Wallets of the Vesting Process in the Smart Contract and Verify have the right Values", async () => {
				// Allocation #1
				const receipt = await mqmvesting.addAllocations(addresses1, amount1, 0);
					expect((await mqmvesting.getFrozenWallet(addresses1[0])).toString()).to.equal((amount1[0]).toString());
					//RestAmount Before TGE should be 0
					expect((await mqmvesting.getTransferableAmount(addresses1[0])).toString()).to.equal('0');
					expect((await mqmvesting.getRestAmount(addresses1[0])).toString()).to.equal((amount1[0]).toString());
				
			});

			it("1.6.- Call the AddAllocation Method for Allocation #2 and upload all Wallets of the Vesting Process in the Smart Contract and Verify have the right Values", async () => {
				// Allocation #2
				const receipt = await mqmvesting.addAllocations(addresses2, amount2, 1);
					expect((await mqmvesting.getFrozenWallet(addresses2[0])).toString()).to.equal((amount2[0]).toString());
					expect((await mqmvesting.getTransferableAmount(addresses2[0])).toString()).to.equal('0');
					expect((await mqmvesting.getRestAmount(addresses2[0])).toString()).to.equal((amount2[0]).toString());
				
			});
			it("1.7.- Call the AddAllocation Method for Allocation #3 and upload all Wallets of the Vesting Process in the Smart Contract and Verify have the right Values", async () => {
				// Allocation #3
				const receipt = await mqmvesting.addAllocations(addresses3, amount3, 2);
					expect((await mqmvesting.getFrozenWallet(addresses3[0])).toString()).to.equal((amount3[0]).toString());
					expect((await mqmvesting.getTransferableAmount(addresses3[0])).toString()).to.equal('0');
					expect((await mqmvesting.getRestAmount(addresses3[0])).toString()).to.equal((amount3[0]).toString());	
			});
			it("1.8.- Call the AddAllocation Method for Allocation #4 and upload all Wallets of the Vesting Process in the Smart Contract and Verify have the right Values", async () => {
				// Allocation #3
				const receipt = await mqmvesting.addAllocations(addresses4, amount4, 3);
					expect((await mqmvesting.getFrozenWallet(addresses4[0])).toString()).to.equal((amount4[0]).toString());
					expect((await mqmvesting.getTransferableAmount(addresses4[0])).toString()).to.equal('0');
					expect((await mqmvesting.getRestAmount(addresses4[0])).toString()).to.equal((amount4[0]).toString());	
			});
			it("1.9.- Call the AddAllocation Method for Allocation #5 and upload all Wallets of the Vesting Process in the Smart Contract and Verify have the right Values", async () => {
				// Allocation #5
				const receipt = await mqmvesting.addAllocations(addresses5, amount5, 4);
					expect((await mqmvesting.getFrozenWallet(addresses5[0])).toString()).to.equal((amount5[0]).toString());
					expect((await mqmvesting.getTransferableAmount(addresses5[0])).toString()).to.be.equal('0');
					expect((await mqmvesting.getRestAmount(addresses5[0])).toString()).to.equal((amount5[0]).toString());
			});
			it("1.10.- Call the AddAllocation Method for Allocation #6 and upload all Wallets of the Vesting Process in the Smart Contract and Verify have the right Values", async () => {
				// Allocation #6
				const receipt = await mqmvesting.addAllocations(addresses6, amount6, 5);
					expect((await mqmvesting.getFrozenWallet(addresses6[0])).toString()).to.equal((amount6[0]).toString());
					expect((await mqmvesting.getTransferableAmount(addresses6[0])).toString()).to.equal('0');
					expect((await mqmvesting.getRestAmount(addresses6[0])).toString()).to.equal((amount6[0]).toString());
			});
			it("1.11.- Call the AddAllocation Method for Allocation #7 and upload all Wallets of the Vesting Process in the Smart Contract and Verify have the right Values", async () => {
				// Allocation #7
				const receipt = await mqmvesting.addAllocations(addresses7, amount7, 6);
					expect((await mqmvesting.getFrozenWallet(addresses7[0])).toString()).to.equal((amount7[0]).toString());
					expect((await mqmvesting.getTransferableAmount(addresses7[0])).toString()).to.equal('0');
					expect((await mqmvesting.getRestAmount(addresses7[0])).toString()).to.equal((amount7[0]).toString());
			});
			it("1.12.- Call the AddAllocation Method for Allocation #8 and upload all Wallets of the Vesting Process in the Smart Contract and Verify have the right Values", async () => {
				// Allocation #8
				const receipt = await mqmvesting.addAllocations(addresses8, amount8, 7);
					// console.log("Wallet ",i ," : ", addresses8[i], "Amount: ", amount8[i].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses8[i])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses8[i])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses8[i])).toString());
					expect((await mqmvesting.getFrozenWallet(addresses8[0])).toString()).to.equal((amount8[0]).toString());
					expect((await mqmvesting.getTransferableAmount(addresses8[0])).toString()).to.equal('0');
					expect((await mqmvesting.getRestAmount(addresses8[0])).toString()).to.equal((amount8[0]).toString());				
			});
			it("1.13.- Call the AddAllocation Method for Allocation #9 and upload all Wallets of the Vesting Process in the Smart Contract and Verify have the right Values", async () => {
				// Allocation #9
				const receipt = await mqmvesting.addAllocations(addresses9, amount9, 8);
					expect((await mqmvesting.getFrozenWallet(addresses9[0])).toString()).to.equal((amount9[0]).toString());
					expect((await mqmvesting.getTransferableAmount(addresses9[0])).toString()).to.equal('0');
					expect((await mqmvesting.getRestAmount(addresses9[0])).toString()).to.equal((amount9[0]).toString());
			});
			it("1.14.- Call the AddAllocation Method for Allocation #10 and upload all Wallets of the Vesting Process in the Smart Contract and Verify have the right Values", async () => {
				// Allocation #10
				const receipt = await mqmvesting.addAllocations(addresses10, amount10, 9);
					expect((await mqmvesting.getFrozenWallet(addresses10[0])).toString()).to.equal((amount10[0]).toString());
					expect((await mqmvesting.getTransferableAmount(addresses10[0])).toString()).to.equal('0');
					expect((await mqmvesting.getRestAmount(addresses10[0])).toString()).to.equal((amount10[0]).toString());
			});
		});
		describe(" Verify Monthly Rate Iteration of Allocation #1, #2, #3, #4, #5, #6 ,#7, #8, #9,#10 - Before TGE Date ", async () => {
			it("1.15.- List of Wallet of Allocation #1 Before TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {	
				console.log("Date for Token Generate Event Before TGE: ", parseInt(TGE.format('X')), TGE.format("dddd, MMMM Do YYYY, h:mm:ss a"));		
				const tiempo = Math.floor((await ethers.provider.getBlock("latest")).timestamp);
				console.log("beforeEach - Verify TimeStamp: ", tiempo," Full Date: ", moment(tiempo*1000).utc().format("dddd, MMMM Do YYYY, h:mm:ss a"));
				
				console.log("Wallet addresses1 ", " : ", addresses1[0], "Amount: ", amount1[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses1[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses1[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses1[0])).toString());
				expect((await mqmvesting.getFrozenWallet(addresses1[0])).toString()).to.equal((amount1[0]).toString());
				expect((await mqmvesting.getTransferableAmount(addresses1[0])).toString()).to.equal('0');
				expect((await mqmvesting.getRestAmount(addresses1[0])).toString()).to.equal((amount1[0]).toString());
			});
			
			it("1.16.- List of Wallet of Allocation #2 Before TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {	
				console.log("Wallet addresses2 ", " : ", addresses2[0], "Amount: ", amount2[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses2[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses2[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses2[0])).toString());
				expect((await mqmvesting.getFrozenWallet(addresses2[0])).toString()).to.equal((amount2[0]).toString());
				expect((await mqmvesting.getTransferableAmount(addresses2[0])).toString()).to.equal('0');
				expect((await mqmvesting.getRestAmount(addresses2[0])).toString()).to.equal((amount2[0]).toString());
			});
			
			it("1.17.- List of Wallet of Allocation #3 Before TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {	
				console.log("Wallet addresses3 ", " : ", addresses3[0], "Amount: ", amount3[0].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses3[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses3[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses3[0])).toString());
				expect((await mqmvesting.getFrozenWallet(addresses3[0])).toString()).to.equal((amount3[0]).toString());
				expect((await mqmvesting.getTransferableAmount(addresses3[0])).toString()).to.equal('0');
				expect((await mqmvesting.getRestAmount(addresses3[0])).toString()).to.equal((amount3[0]).toString());
			});

			it("1.18.- List of Wallet of Allocation #4 Before TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {	
				console.log("Wallet addresses4 ", " : ", addresses4[0], "Amount: ", amount4[0].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses4[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses4[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses4[0])).toString());
				expect((await mqmvesting.getFrozenWallet(addresses4[0])).toString()).to.equal((amount4[0]).toString());
				expect((await mqmvesting.getTransferableAmount(addresses3[0])).toString()).to.equal('0');
				expect((await mqmvesting.getRestAmount(addresses4[0])).toString()).to.equal((amount4[0]).toString());
			});

			it("1.19.- List of Wallet of Allocation #5 Before TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {	
				console.log("Wallet addresses5 ", " : ", addresses5[0], "Amount: ", addresses5[0].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses5[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses5[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses5[0])).toString());
				expect((await mqmvesting.getFrozenWallet(addresses5[0])).toString()).to.equal((amount5[0]).toString());
				expect((await mqmvesting.getTransferableAmount(addresses5[0])).toString()).to.equal('0');
				expect((await mqmvesting.getRestAmount(addresses5[0])).toString()).to.equal((amount5[0]).toString());
			});

			it("1.20.- List of Wallet of Allocation #6 Before TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {	
				console.log("Wallet addresses6 ", " : ", addresses6[0], "Amount: ", addresses6[0].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses6[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses6[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses6[0])).toString());
				expect((await mqmvesting.getFrozenWallet(addresses6[0])).toString()).to.equal((amount6[0]).toString());
				expect((await mqmvesting.getTransferableAmount(addresses6[0])).toString()).to.equal('0');
				expect((await mqmvesting.getRestAmount(addresses6[0])).toString()).to.equal((amount6[0]).toString());
			});

			it("1.21.- List of Wallet of Allocation #7 Before TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {	
				console.log("Wallet addresses7 ", " : ", addresses7[0], "Amount: ", addresses7[0].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses7[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses7[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses7[0])).toString());
				expect((await mqmvesting.getFrozenWallet(addresses7[0])).toString()).to.equal((amount7[0]).toString());
				expect((await mqmvesting.getTransferableAmount(addresses7[0])).toString()).to.equal('0');
				expect((await mqmvesting.getRestAmount(addresses7[0])).toString()).to.equal((amount7[0]).toString());
			});

			it("1.22.- List of Wallet of Allocation #8 Before TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {	
				console.log("Wallet addresses8 ", " : ", addresses8[0], "Amount: ", addresses8[0].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses8[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses8[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses8[0])).toString());
				expect((await mqmvesting.getFrozenWallet(addresses8[0])).toString()).to.equal((amount8[0]).toString());
				expect((await mqmvesting.getTransferableAmount(addresses8[0])).toString()).to.equal('0');
				expect((await mqmvesting.getRestAmount(addresses8[0])).toString()).to.equal((amount8[0]).toString());
			});

			it("1.23.- List of Wallet of Allocation #9 Before TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {	
				console.log("Wallet addresses9 ", " : ", addresses9[0], "Amount: ", addresses9[0].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses9[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses9[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses9[0])).toString());
				expect((await mqmvesting.getFrozenWallet(addresses9[0])).toString()).to.equal((amount9[0]).toString());
				expect((await mqmvesting.getTransferableAmount(addresses9[0])).toString()).to.equal('0');
				expect((await mqmvesting.getRestAmount(addresses9[0])).toString()).to.equal((amount9[0]).toString());
			});

			it("1.24.- List of Wallet of Allocation #10 Before TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {	
				console.log("Wallet addresses10 ", " : ", addresses10[0], "Amount: ", addresses10[0].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses10[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses10[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses10[0])).toString());
				expect((await mqmvesting.getFrozenWallet(addresses10[0])).toString()).to.equal((amount10[0]).toString());
				expect((await mqmvesting.getTransferableAmount(addresses10[0])).toString()).to.equal('0');
				expect((await mqmvesting.getRestAmount(addresses10[0])).toString()).to.equal((amount10[0]).toString());
			});
		});

		describe(" Verify Monthly Rate Iteration of Allocation #1, #2, #3, #4, #5, #6 ,#7, #8, #9,#10 - After 1 Week TGE Date", async () => {	
			it("1.25. - List of Wallet of Allocation #1 After 1 Week TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {
				console.log("Date for Token Generate Event After 1 Week: ", parseInt(TGE.add(7,'d').add(2, 'h').format('X')), TGE.format("dddd, MMMM Do YYYY, h:mm:ss a"));
				await network.provider.send("evm_setNextBlockTimestamp", [parseInt(TGE.format('X'))]);
				await network.provider.send("evm_mine", []);
				let time = Math.floor((await ethers.provider.getBlock("latest")).timestamp);
				console.log("Verify TimeStamp: After 1 Week TGE ", time," Full Date: ", moment(time*1000).utc().format("dddd, MMMM Do YYYY, h:mm:ss a"));	
					
				
				console.log("Wallet addresses1 ", " : ", addresses1[0], "Amount: ", amount1[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses1[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses1[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses1[0])).toString());
				//TGE event should be 5% inital unlocked
				const five:BigNumber = BigNumber.from(amount1[0]).mul(5).div(100);
				expect((await mqmvesting.getTransferableAmount(addresses1[0])).toString()).to.equal(five.toString());
				//TGE event invalid <> 5% inital unlocked	
				const six:BigNumber = BigNumber.from(amount1[0]).mul(6).div(100);
				expect((await mqmvesting.getTransferableAmount(addresses1[0])).toString()).to.not.equal(six.toString());
				const diff:BigNumber = BigNumber.from((amount1[0]).sub(five));
				expect((await mqmvesting.getRestAmount(addresses1[0])).toString()).to.equal(diff.toString());		
			});
			it("1.26. - List of Wallet of Allocation #2 After 1 Week TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {
				console.log("Wallet addresses2 ", " : ", addresses2[0], "Amount: ", amount2[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses2[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses2[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses2[0])).toString());
				//TGE event should be 7% inital unlocked
				const seven:BigNumber = BigNumber.from(amount2[0]).mul(7).div(100);
				expect((await mqmvesting.getTransferableAmount(addresses2[0])).toString()).to.equal(seven.toString());
				//TGE event invalid <> 7% inital unlocked	
				const eight:BigNumber = BigNumber.from(amount2[0]).mul(8).div(100);
				expect((await mqmvesting.getTransferableAmount(addresses2[0])).toString()).to.not.equal(eight.toString());
				const diff:BigNumber = BigNumber.from((amount2[0]).sub(seven));
				expect((await mqmvesting.getRestAmount(addresses2[0])).toString()).to.equal(diff.toString());		
			});
			it("1.27. - List of Wallet of Allocation #3 After 1 Week TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {
				console.log("Wallet addresses3 ", " : ", addresses3[0], "Amount: ", amount3[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses3[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses3[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses3[0])).toString());
				//TGE event should be 10% inital unlocked
				const ten:BigNumber = BigNumber.from(amount3[0]).mul(10).div(100);
				expect((await mqmvesting.getTransferableAmount(addresses3[0])).toString()).to.equal(ten.toString());
				//TGE event invalid <> 10% inital unlocked	
				const eleven:BigNumber = BigNumber.from(amount3[0]).mul(11).div(100);
				expect((await mqmvesting.getTransferableAmount(addresses3[0])).toString()).to.not.equal(eleven.toString());
				const diff:BigNumber = BigNumber.from((amount3[0]).sub(ten));
				expect((await mqmvesting.getRestAmount(addresses3[0])).toString()).to.equal(diff.toString());	
			});
			it("1.28. - List of Wallet of Allocation #4 After 1 Week TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {
				console.log("Wallet addresses4 ", " : ", addresses4[0], "Amount: ", amount4[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses4[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses4[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses4[0])).toString());
				//TGE event should be 12% inital unlocked
				const twelve:BigNumber = BigNumber.from(amount4[0]).mul(12).div(100);
				expect((await mqmvesting.getTransferableAmount(addresses4[0])).toString()).to.equal(twelve.toString());
				//TGE event invalid <> 12% inital unlocked	
				const thirteen:BigNumber = BigNumber.from(amount4[0]).mul(13).div(100);
				expect((await mqmvesting.getTransferableAmount(addresses4[0])).toString()).to.not.equal(thirteen.toString());
				const diff:BigNumber = BigNumber.from((amount4[0]).sub(twelve));
				expect((await mqmvesting.getRestAmount(addresses4[0])).toString()).to.equal(diff.toString());	
			});
			it("1.29. - List of Wallet of Allocation #5 After 1 Week TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {
				console.log("Wallet addresses5 ", " : ", addresses5[0], "Amount: ", amount5[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses5[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses5[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses5[0])).toString());
				//TGE event should be 6% inital unlocked
				const six:BigNumber = BigNumber.from(amount5[0]).mul(6).div(100);
				expect((await mqmvesting.getTransferableAmount(addresses5[0])).toString()).to.equal(six.toString());
				//TGE event invalid <> 6% inital unlocked
				const seven:BigNumber = BigNumber.from(amount5[0]).mul(7).div(100);
				expect((await mqmvesting.getTransferableAmount(addresses5[0])).toString()).to.not.equal(seven.toString());
				const diff:BigNumber = BigNumber.from((amount5[0]).sub(six));
				expect((await mqmvesting.getRestAmount(addresses5[0])).toString()).to.equal(diff.toString());	
			});
			it("1.30. - List of Wallet of Allocation #6 After 1 Week TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {
				console.log("Wallet addresses6 ", " : ", addresses6[0], "Amount: ", amount6[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses6[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses6[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses6[0])).toString());
				//TGE event should be 4% inital unlocked
				const four:BigNumber = BigNumber.from(amount6[0]).mul(4).div(100);
				expect((await mqmvesting.getTransferableAmount(addresses6[0])).toString()).to.equal(four.toString());
				//TGE event invalid <> 4% inital unlocked	
				const five:BigNumber = BigNumber.from(amount6[0]).mul(5).div(100);
				expect((await mqmvesting.getTransferableAmount(addresses6[0])).toString()).to.not.equal(five.toString());
				const diff:BigNumber = BigNumber.from((amount6[0]).sub(four));
				expect((await mqmvesting.getRestAmount(addresses6[0])).toString()).to.equal(diff.toString());	
			});
			it("1.31. - List of Wallet of Allocation #7 After 1 Week TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {
				console.log("Wallet addresses7 ", " : ", addresses7[0], "Amount: ", amount7[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses7[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses7[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses7[0])).toString());
				//TGE event should be 0% inital unlocked
				expect((await mqmvesting.getTransferableAmount(addresses7[0])).toString()).to.equal('0');
				//TGE event invalid <> 0% inital unlocked	
				const one:BigNumber = BigNumber.from(amount7[0]).mul(1).div(100);
				expect((await mqmvesting.getTransferableAmount(addresses7[0])).toString()).to.not.equal(one.toString());
				expect((await mqmvesting.getRestAmount(addresses7[0])).toString()).to.equal(amount7[0].toString());	
			});
			it("1.32. - List of Wallet of Allocation #8 After 1 Week TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {
				console.log("Wallet addresses8 ", " : ", addresses8[0], "Amount: ", amount8[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses8[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses8[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses8[0])).toString());
				//TGE event should be 0% inital unlocked
				expect((await mqmvesting.getTransferableAmount(addresses8[0])).toString()).to.equal('0');
				//TGE event invalid <> 0% inital unlocked	
				const one:BigNumber = BigNumber.from(amount8[0]).mul(1).div(100);
				expect((await mqmvesting.getTransferableAmount(addresses8[0])).toString()).to.not.equal(one.toString());
				expect((await mqmvesting.getRestAmount(addresses8[0])).toString()).to.equal(amount8[0].toString());	
			});
			it("1.33. - List of Wallet of Allocation #9 After 1 Week TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {
				console.log("Wallet addresses9 ", " : ", addresses9[0], "Amount: ", amount9[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses9[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses9[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses9[0])).toString());
				//TGE event should be 0% inital unlocked
				expect((await mqmvesting.getTransferableAmount(addresses9[0])).toString()).to.equal('0');
				//TGE event invalid <> 0% inital unlocked	
				const one:BigNumber = BigNumber.from(amount9[0]).mul(1).div(100);
				expect((await mqmvesting.getTransferableAmount(addresses9[0])).toString()).to.not.equal(one.toString());
				expect((await mqmvesting.getRestAmount(addresses9[0])).toString()).to.equal(amount9[0].toString());	
			});
			it("1.34. - List of Wallet of Allocation #10 After 1 Week TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {
				console.log("Wallet addresses10 ", " : ", addresses10[0], "Amount: ", amount10[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses10[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses10[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses10[0])).toString());
				//TGE event should be 0% inital unlocked
				expect((await mqmvesting.getTransferableAmount(addresses10[0])).toString()).to.equal('0');
				//TGE event invalid <> 0% inital unlocked	
				const one:BigNumber = BigNumber.from(amount10[0]).mul(1).div(100);
				expect((await mqmvesting.getTransferableAmount(addresses7[0])).toString()).to.not.equal(one.toString());
				expect((await mqmvesting.getRestAmount(addresses10[0])).toString()).to.equal(amount10[0].toString());	
			});
		});

		describe(" Verify Monthly Rate Iteration of Allocation #1, #2, #3, #4, #5, #6 ,#7, #8, #9,#10 - During 3 years TGE Date", async () => {	
			it("1.35. - List all Wallets of Allocations During 3 years TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ", async () => {
				
				//Allocation#1 - TGE event should be 5% inital unlocked, Cliff 8 months and Vesting 12 months
				const A1TGEUnlocked:BigNumber = BigNumber.from(amount1[0]).mul(5).div(100);
				const A1Cliff:number = 8;
				const A1Vesting:number = 12;
				const A1TotalTokenVestingPerMonth:BigNumber = BigNumber.from(amount1[0]).mul(BigNumber.from('79166666666666700')).div(BigNumber.from('1000000000000000000'));
				let A1totalMonthVesting = 1;
				
				//Allocation#2 - TGE event should be 7% inital unlocked, Cliff 6 months and Vesting 10 months
				const A2TGEUnlocked:BigNumber = BigNumber.from(amount2[0]).mul(7).div(100);
				const A2Cliff:number = 6;
				const A2Vesting:number = 10;
				const A2TotalTokenVestingPerMonth:BigNumber = BigNumber.from(amount2[0]).mul(BigNumber.from('93000000000000000')).div(BigNumber.from('1000000000000000000'));
				let A2totalMonthVesting = 1;
				
				//Allocation#3 - TGE event should be 10% inital unlocked, Cliff 3 months and Vesting 7 months
				const A3TGEUnlocked:BigNumber = BigNumber.from(amount3[0]).mul(10).div(100);
				const A3Cliff:number = 3;
				const A3Vesting:number = 7;
				const A3TotalTokenVestingPerMonth:BigNumber = BigNumber.from(amount3[0]).mul(BigNumber.from('128571428571429000')).div(BigNumber.from('1000000000000000000'));
				let A3totalMonthVesting = 1;

				//Allocation#4 - TGE event should be 12% inital unlocked, Cliff 0 months and Vesting 5 months
				const A4TGEUnlocked:BigNumber = BigNumber.from(amount4[0]).mul(12).div(100);
				const A4Cliff:number = 0;
				const A4Vesting:number = 5;
				const A4TotalTokenVestingPerMonth:BigNumber = BigNumber.from(amount4[0]).mul(BigNumber.from('176000000000000000')).div(BigNumber.from('1000000000000000000'));
				let A4totalMonthVesting = 1;

				//Allocation#5 - TGE event should be 6% inital unlocked, Cliff 0 months and Vesting 14 months
				const A5TGEUnlocked:BigNumber = BigNumber.from(amount5[0]).mul(6).div(100);
				const A5Cliff:number = 0;
				const A5Vesting:number = 14;
				const A5TotalTokenVestingPerMonth:BigNumber = BigNumber.from(amount5[0]).mul(BigNumber.from('67142857142857100')).div(BigNumber.from('1000000000000000000'));
				let A5totalMonthVesting = 1;

				//Allocation#6 - TGE event should be 4% inital unlocked, Cliff 0 months and Vesting 36 months
				const A6TGEUnlocked:BigNumber = BigNumber.from(amount6[0]).mul(4).div(100);
				const A6Cliff:number = 0;
				const A6Vesting:number = 36;
				const A6TotalTokenVestingPerMonth:BigNumber = BigNumber.from(amount6[0]).mul(BigNumber.from('26666666666666700')).div(BigNumber.from('1000000000000000000'));
				let A6totalMonthVesting = 1;

				//Allocation#7 - TGE event should be 0% inital unlocked, Cliff 18 months and Vesting 18 months
				const A7TGEUnlocked:BigNumber = BigNumber.from(amount7[0]).mul(0).div(100);
				const A7Cliff:number = 18;
				const A7Vesting:number = 18;
				const A7TotalTokenVestingPerMonth:BigNumber = BigNumber.from(amount7[0]).mul(BigNumber.from('55555555555555600')).div(BigNumber.from('1000000000000000000'));
				let A7totalMonthVesting = 1;

				//Allocation#8 - TGE event should be 0% inital unlocked, Cliff 0 months and Vesting 36 months
				const A8TGEUnlocked:BigNumber = BigNumber.from(amount8[0]).mul(0).div(100);
				const A8Cliff:number = 0;
				const A8Vesting:number = 36;
				const A8TotalTokenVestingPerMonth:BigNumber = BigNumber.from(amount8[0]).mul(BigNumber.from('27777777777777800')).div(BigNumber.from('1000000000000000000'));
				let A8totalMonthVesting = 1;

				//Allocation#9 - TGE event should be 0% inital unlocked, Cliff 12 months and Vesting 24 months
				const A9TGEUnlocked:BigNumber = BigNumber.from(amount9[0]).mul(0).div(100);
				const A9Cliff:number = 12;
				const A9Vesting:number = 24;
				const A9TotalTokenVestingPerMonth:BigNumber = BigNumber.from(amount9[0]).mul(BigNumber.from('41666666666666700')).div(BigNumber.from('1000000000000000000'));
				let A9totalMonthVesting = 1;
				
				//Allocation#10 - TGE event should be 0% inital unlocked, Cliff 18 months and Vesting 18 months
				const A10TGEUnlocked:BigNumber = BigNumber.from(amount10[0]).mul(0).div(100);
				const A10Cliff:number = 18;
				const A10Vesting:number = 18;
				const A10TotalTokenVestingPerMonth:BigNumber = BigNumber.from(amount10[0]).mul(BigNumber.from('55555555555555600')).div(BigNumber.from('1000000000000000000'));
				let A10totalMonthVesting = 1;

				for(let afterMonthTGE=1; afterMonthTGE <= 36; afterMonthTGE++){
					console.log("Date for Token Generate Event After "+afterMonthTGE+" Month: ", parseInt(TGE.add(1,'M').add(2, 'h').format('X')), TGE.format("dddd, MMMM Do YYYY, h:mm:ss a"));
					await network.provider.send("evm_setNextBlockTimestamp", [parseInt(TGE.format('X'))]);
					await network.provider.send("evm_mine", []);
					let time = Math.floor((await ethers.provider.getBlock("latest")).timestamp);
					console.log("Verify TimeStamp: Month "+afterMonthTGE +" after TGE ", time," Full Date: ", moment(time*1000).utc().format("dddd, MMMM Do YYYY, h:mm:ss a"));			
					
					//Allocation #1
					console.log("Wallet addresses1 Month TGE", afterMonthTGE ," : ", addresses1[0], "Amount: ", amount1[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses1[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses1[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses1[0])).toString());
					if(afterMonthTGE <= A1Cliff){
						expect((await mqmvesting.getTransferableAmount(addresses1[0])).toString()).to.equal(A1TGEUnlocked.toString());
						const diff:BigNumber = BigNumber.from((amount1[0]).sub(A1TGEUnlocked));
						expect((await mqmvesting.getRestAmount(addresses1[0])).toString()).to.equal(diff.toString());		
					} else if(A1totalMonthVesting < A1Vesting){
					//	console.log('amount', amount1[0].toString());
					//	console.log('totalTokenVestingPerMonth: ',totalTokenVestingPerMonth.toString());
					//	console.log('TGEUnlocked', TGEUnlocked.toString());
					//console.log('totalMonthVesting: ',totalMonthVesting);
					//	console.log('soma TGE + Monthly: ', TGEUnlocked.add(totalTokenVestingPerMonth.mul(totalMonthVesting)).toString());
						expect((await mqmvesting.getTransferableAmount(addresses1[0])).toString()).to.equal(A1TGEUnlocked.add(A1TotalTokenVestingPerMonth.mul(A1totalMonthVesting)).toString());
						const diff:BigNumber = BigNumber.from(((amount1[0]).sub(A1TGEUnlocked)).sub(A1TotalTokenVestingPerMonth.mul(A1totalMonthVesting)));
						expect((await mqmvesting.getRestAmount(addresses1[0])).toString()).to.equal(diff.toString());		
						A1totalMonthVesting++;
					}else{
						expect((await mqmvesting.getTransferableAmount(addresses1[0])).toString()).to.equal(amount1[0]);
						expect((await mqmvesting.getRestAmount(addresses1[0])).toString()).to.equal('0');
					}

					//Allocation #2
					console.log("Wallet addresses2 Month TGE", afterMonthTGE , " : ", addresses2[0], "Amount: ", amount2[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses2[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses2[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses2[0])).toString());
					if(afterMonthTGE <= A2Cliff){
						expect((await mqmvesting.getTransferableAmount(addresses2[0])).toString()).to.equal(A2TGEUnlocked.toString());
						const diff:BigNumber = BigNumber.from((amount2[0]).sub(A2TGEUnlocked));
						expect((await mqmvesting.getRestAmount(addresses2[0])).toString()).to.equal(diff.toString());		
					} else if(A2totalMonthVesting < A2Vesting){
						expect((await mqmvesting.getTransferableAmount(addresses2[0])).toString()).to.equal(A2TGEUnlocked.add(A2TotalTokenVestingPerMonth.mul(A2totalMonthVesting)).toString());
						const diff:BigNumber = BigNumber.from(((amount2[0]).sub(A2TGEUnlocked)).sub(A2TotalTokenVestingPerMonth.mul(A2totalMonthVesting)));
						expect((await mqmvesting.getRestAmount(addresses2[0])).toString()).to.equal(diff.toString());		
						A2totalMonthVesting++;
					}else{
						expect((await mqmvesting.getTransferableAmount(addresses2[0])).toString()).to.equal(amount2[0]);
						expect((await mqmvesting.getRestAmount(addresses2[0])).toString()).to.equal('0');
					}

					//Allocation #3
					console.log("Wallet addresses3 Month TGE", afterMonthTGE , " : ", addresses3[0], "Amount: ", amount3[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses3[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses3[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses3[0])).toString());
					if(afterMonthTGE <= A3Cliff){
						expect((await mqmvesting.getTransferableAmount(addresses3[0])).toString()).to.equal(A3TGEUnlocked.toString());
						const diff:BigNumber = BigNumber.from((amount3[0]).sub(A3TGEUnlocked));
						expect((await mqmvesting.getRestAmount(addresses3[0])).toString()).to.equal(diff.toString());		
					} else if(A3totalMonthVesting < A3Vesting){
						expect((await mqmvesting.getTransferableAmount(addresses3[0])).toString()).to.equal(A3TGEUnlocked.add(A3TotalTokenVestingPerMonth.mul(A3totalMonthVesting)).toString());
						const diff:BigNumber = BigNumber.from(((amount3[0]).sub(A3TGEUnlocked)).sub(A3TotalTokenVestingPerMonth.mul(A3totalMonthVesting)));
						expect((await mqmvesting.getRestAmount(addresses3[0])).toString()).to.equal(diff.toString());		
						A3totalMonthVesting++;
					}else{
						expect((await mqmvesting.getTransferableAmount(addresses3[0])).toString()).to.equal(amount3[0]);
						expect((await mqmvesting.getRestAmount(addresses3[0])).toString()).to.equal('0');
					}

					//Allocation #4
					console.log("Wallet addresses4 Month TGE", afterMonthTGE , " : ", addresses4[0], "Amount: ", amount4[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses4[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses4[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses4[0])).toString());
					if(afterMonthTGE <= A4Cliff){
						expect((await mqmvesting.getTransferableAmount(addresses4[0])).toString()).to.equal(A4TGEUnlocked.toString());
						const diff:BigNumber = BigNumber.from((amount4[0]).sub(A4TGEUnlocked));
						expect((await mqmvesting.getRestAmount(addresses4[0])).toString()).to.equal(diff.toString());		
					} else if(A4totalMonthVesting < A4Vesting){
						expect((await mqmvesting.getTransferableAmount(addresses4[0])).toString()).to.equal(A4TGEUnlocked.add(A4TotalTokenVestingPerMonth.mul(A4totalMonthVesting)).toString());
						const diff:BigNumber = BigNumber.from(((amount4[0]).sub(A4TGEUnlocked)).sub(A4TotalTokenVestingPerMonth.mul(A4totalMonthVesting)));
						expect((await mqmvesting.getRestAmount(addresses4[0])).toString()).to.equal(diff.toString());		
						A4totalMonthVesting++;
					}else{
						expect((await mqmvesting.getTransferableAmount(addresses4[0])).toString()).to.equal(amount4[0]);
						expect((await mqmvesting.getRestAmount(addresses4[0])).toString()).to.equal('0');
					}

					//Allocation #5
					console.log("Wallet addresses5 Month TGE", afterMonthTGE , " : ", addresses5[0], "Amount: ", amount5[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses5[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses5[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses5[0])).toString());
					if(afterMonthTGE <= A5Cliff){
						expect((await mqmvesting.getTransferableAmount(addresses4[0])).toString()).to.equal(A5TGEUnlocked.toString());
						const diff:BigNumber = BigNumber.from((amount5[0]).sub(A5TGEUnlocked));
						expect((await mqmvesting.getRestAmount(addresses5[0])).toString()).to.equal(diff.toString());		
					} else if(A5totalMonthVesting <= A5Vesting){
						expect((await mqmvesting.getTransferableAmount(addresses5[0])).toString()).to.equal(A5TGEUnlocked.add(A5TotalTokenVestingPerMonth.mul(A5totalMonthVesting)).toString());
						const diff:BigNumber = BigNumber.from(((amount5[0]).sub(A5TGEUnlocked)).sub(A5TotalTokenVestingPerMonth.mul(A5totalMonthVesting)));
						expect((await mqmvesting.getRestAmount(addresses5[0])).toString()).to.equal(diff.toString());		
						A5totalMonthVesting++;
					}else{
						expect((await mqmvesting.getTransferableAmount(addresses5[0])).toString()).to.equal(amount5[0]);
						expect((await mqmvesting.getRestAmount(addresses5[0])).toString()).to.equal('0');
					}

					//Allocation #6
					console.log("Wallet addresses6 Month TGE", afterMonthTGE , " : ", addresses6[0], "Amount: ", amount6[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses6[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses6[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses6[0])).toString());
					if(afterMonthTGE <= A6Cliff){
						expect((await mqmvesting.getTransferableAmount(addresses6[0])).toString()).to.equal(A6TGEUnlocked.toString());
						const diff:BigNumber = BigNumber.from((amount6[0]).sub(A6TGEUnlocked));
						expect((await mqmvesting.getRestAmount(addresses6[0])).toString()).to.equal(diff.toString());		
					} else if(A6totalMonthVesting < A6Vesting){
						expect((await mqmvesting.getTransferableAmount(addresses6[0])).toString()).to.equal(A6TGEUnlocked.add(A6TotalTokenVestingPerMonth.mul(A6totalMonthVesting)).toString());
						const diff:BigNumber = BigNumber.from(((amount6[0]).sub(A6TGEUnlocked)).sub(A6TotalTokenVestingPerMonth.mul(A6totalMonthVesting)));
						expect((await mqmvesting.getRestAmount(addresses6[0])).toString()).to.equal(diff.toString());		
						A6totalMonthVesting++;
					}else{
						expect((await mqmvesting.getTransferableAmount(addresses6[0])).toString()).to.equal(amount6[0]);
						expect((await mqmvesting.getRestAmount(addresses6[0])).toString()).to.equal('0');
					}

					//Allocation #7
					console.log("Wallet addresses7 Month TGE", afterMonthTGE , " : ", addresses7[0], "Amount: ", amount7[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses7[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses7[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses7[0])).toString());
					if(afterMonthTGE <= A7Cliff){
						expect((await mqmvesting.getTransferableAmount(addresses7[0])).toString()).to.equal(A7TGEUnlocked.toString());
						const diff:BigNumber = BigNumber.from((amount7[0]).sub(A7TGEUnlocked));
						expect((await mqmvesting.getRestAmount(addresses7[0])).toString()).to.equal(diff.toString());		
					} else if(A7totalMonthVesting < A7Vesting){
						expect((await mqmvesting.getTransferableAmount(addresses7[0])).toString()).to.equal(A7TGEUnlocked.add(A7TotalTokenVestingPerMonth.mul(A7totalMonthVesting)).toString());
						const diff:BigNumber = BigNumber.from(((amount7[0]).sub(A7TGEUnlocked)).sub(A7TotalTokenVestingPerMonth.mul(A7totalMonthVesting)));
						expect((await mqmvesting.getRestAmount(addresses7[0])).toString()).to.equal(diff.toString());		
						A7totalMonthVesting++;
					}else{
						expect((await mqmvesting.getTransferableAmount(addresses7[0])).toString()).to.equal(amount7[0]);
						expect((await mqmvesting.getRestAmount(addresses7[0])).toString()).to.equal('0');
					}

					//Allocation #8
					console.log("Wallet addresses8 Month TGE", afterMonthTGE , " : ", addresses8[0], "Amount: ", amount8[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses8[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses8[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses8[0])).toString());
					if(afterMonthTGE <= A8Cliff){
						expect((await mqmvesting.getTransferableAmount(addresses8[0])).toString()).to.equal(A8TGEUnlocked.toString());
						const diff:BigNumber = BigNumber.from((amount8[0]).sub(A8TGEUnlocked));
						expect((await mqmvesting.getRestAmount(addresses8[0])).toString()).to.equal(diff.toString());		
					} else if(A8totalMonthVesting < A8Vesting){
						expect((await mqmvesting.getTransferableAmount(addresses8[0])).toString()).to.equal(A8TGEUnlocked.add(A8TotalTokenVestingPerMonth.mul(A8totalMonthVesting)).toString());
						const diff:BigNumber = BigNumber.from(((amount8[0]).sub(A8TGEUnlocked)).sub(A8TotalTokenVestingPerMonth.mul(A8totalMonthVesting)));
						expect((await mqmvesting.getRestAmount(addresses8[0])).toString()).to.equal(diff.toString());		
						A8totalMonthVesting++;
					}else{
						expect((await mqmvesting.getTransferableAmount(addresses8[0])).toString()).to.equal(amount8[0]);
						expect((await mqmvesting.getRestAmount(addresses8[0])).toString()).to.equal('0');
					}

					//Allocation #9
					console.log("Wallet addresses9 Month TGE", afterMonthTGE , " : ", addresses9[0], "Amount: ", amount9[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses9[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses9[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses9[0])).toString());
					if(afterMonthTGE <= A9Cliff){
						expect((await mqmvesting.getTransferableAmount(addresses9[0])).toString()).to.equal(A7TGEUnlocked.toString());
						const diff:BigNumber = BigNumber.from((amount9[0]).sub(A7TGEUnlocked));
						expect((await mqmvesting.getRestAmount(addresses9[0])).toString()).to.equal(diff.toString());		
					} else if(A9totalMonthVesting < A9Vesting){
						expect((await mqmvesting.getTransferableAmount(addresses9[0])).toString()).to.equal(A9TGEUnlocked.add(A9TotalTokenVestingPerMonth.mul(A9totalMonthVesting)).toString());
						const diff:BigNumber = BigNumber.from(((amount9[0]).sub(A9TGEUnlocked)).sub(A9TotalTokenVestingPerMonth.mul(A9totalMonthVesting)));
						expect((await mqmvesting.getRestAmount(addresses9[0])).toString()).to.equal(diff.toString());		
						A9totalMonthVesting++;
					}else{
						expect((await mqmvesting.getTransferableAmount(addresses9[0])).toString()).to.equal(amount9[0]);
						expect((await mqmvesting.getRestAmount(addresses9[0])).toString()).to.equal('0');
					}

					//Allocation #10
					console.log("Wallet addresses10 Month TGE", afterMonthTGE , " : ", addresses10[0], "Amount: ", amount10[0].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses10[0])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses10[0])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses10[0])).toString());
					if(afterMonthTGE <= A10Cliff){
						expect((await mqmvesting.getTransferableAmount(addresses10[0])).toString()).to.equal(A10TGEUnlocked.toString());
						const diff:BigNumber = BigNumber.from((amount10[0]).sub(A10TGEUnlocked));
						expect((await mqmvesting.getRestAmount(addresses10[0])).toString()).to.equal(diff.toString());		
					} else if(A10totalMonthVesting < A10Vesting){
						expect((await mqmvesting.getTransferableAmount(addresses10[0])).toString()).to.equal(A10TGEUnlocked.add(A10TotalTokenVestingPerMonth.mul(A10totalMonthVesting)).toString());
						const diff:BigNumber = BigNumber.from(((amount10[0]).sub(A10TGEUnlocked)).sub(A10TotalTokenVestingPerMonth.mul(A10totalMonthVesting)));
						expect((await mqmvesting.getRestAmount(addresses10[0])).toString()).to.equal(diff.toString());		
						A10totalMonthVesting++;
					}else{
						expect((await mqmvesting.getTransferableAmount(addresses10[0])).toString()).to.equal(amount10[0]);
						expect((await mqmvesting.getRestAmount(addresses10[0])).toString()).to.equal('0');
					}
				}	
			});

			
			
		});

		describe(" Withdraw from MQMVesting/FrozenWallet contract to wallet accounts/addresses", async () => {	
			it("1.36. - Withdraw full amount from MQMVesting contract to  wallet account/addresses 1 after 3 years TGE: ", async () => {
				await expect(await mqmvesting.connect(await ethers.getSigner(addresses1[0])).withdraw(amount1[0].toString())).to.emit(mqmvesting,'Transfer').withArgs(addresses1[0],mqmvesting.address,amount1[0].toString());
				expect((await mqmtoken.balanceOf(addresses1[0])).toString()).to.equal(amount1[0].toString());
			});

			it("1.37. - Withdraw full amount from MQMVesting contract to  wallet account/addresses 2 after 3 years TGE: ", async () => {
				expect(await mqmvesting.connect(await ethers.getSigner(addresses2[0])).withdraw(amount2[0].toString())).to.emit(mqmvesting,'Transfer').withArgs(addresses2[0],mqmvesting.address,amount2[0].toString());
				expect((await mqmtoken.balanceOf(addresses2[0])).toString()).to.equal(amount2[0].toString());
			});

			it("1.38. - Withdraw full amount from MQMVesting contract to  wallet account/addresses 3 after 3 years TGE: ", async () => {
				expect(await mqmvesting.connect(await ethers.getSigner(addresses3[0])).withdraw(amount3[0].toString())).to.emit(mqmvesting,'Transfer').withArgs(addresses3[0],mqmvesting.address,amount3[0].toString());
				expect((await mqmtoken.balanceOf(addresses3[0])).toString()).to.equal(amount3[0].toString());
			});

			it("1.39. - Withdraw full amount from MQMVesting contract to  wallet account/addresses 4 after 3 years TGE: ", async () => {
				expect(await mqmvesting.connect(await ethers.getSigner(addresses4[0])).withdraw(amount4[0].toString())).to.emit(mqmvesting,'Transfer').withArgs(addresses4[0],mqmvesting.address,amount4[0].toString());
				expect((await mqmtoken.balanceOf(addresses4[0])).toString()).to.equal(amount4[0].toString());
			});

			it("1.40. - Withdraw full amount from MQMVesting contract to  wallet account/addresses 5 after 3 years TGE: ", async () => {
				expect(await mqmvesting.connect(await ethers.getSigner(addresses5[0])).withdraw(amount5[0].toString())).to.emit(mqmvesting,'Transfer').withArgs(addresses5[0],mqmvesting.address,amount5[0].toString());
				expect((await mqmtoken.balanceOf(addresses5[0])).toString()).to.equal(amount5[0].toString());
			});

			it("1.41. - Withdraw full amount from MQMVesting contract to  wallet account/addresses 6 after 3 years TGE: ", async () => {
				expect(await mqmvesting.connect(await ethers.getSigner(addresses6[0])).withdraw(amount6[0].toString())).to.emit(mqmvesting,'Transfer').withArgs(addresses6[0],mqmvesting.address,amount6[0].toString());
				expect((await mqmtoken.balanceOf(addresses6[0])).toString()).to.equal(amount6[0].toString());
			});

			it("1.42. - Withdraw full amount from MQMVesting contract to  wallet account/addresses 7 after 3 years TGE: ", async () => {
				expect(await mqmvesting.connect(await ethers.getSigner(addresses7[0])).withdraw(amount7[0].toString())).to.emit(mqmvesting,'Transfer').withArgs(addresses7[0],mqmvesting.address,amount7[0].toString());
				expect((await mqmtoken.balanceOf(addresses7[0])).toString()).to.equal(amount7[0].toString());
			});

			it("1.43. - Withdraw full amount from MQMVesting contract to  wallet account/addresses 8 after 3 years TGE: ", async () => {
				expect(await mqmvesting.connect(await ethers.getSigner(addresses8[0])).withdraw(amount8[0].toString())).to.emit(mqmvesting,'Transfer').withArgs(addresses8[0],mqmvesting.address,amount8[0].toString());
				expect((await mqmtoken.balanceOf(addresses8[0])).toString()).to.equal(amount8[0].toString());
			});

			it("1.44. - Withdraw full amount from MQMVesting contract to  wallet account/addresses 9 after 3 years TGE: ", async () => {
				expect(await mqmvesting.connect(await ethers.getSigner(addresses9[0])).withdraw(amount9[0].toString())).to.emit(mqmvesting,'Transfer').withArgs(addresses9[0],mqmvesting.address,amount9[0].toString());
				expect((await mqmtoken.balanceOf(addresses9[0])).toString()).to.equal(amount9[0].toString());
			});

			it("1.45. - Withdraw full amount from MQMVesting contract to  wallet account/addresses 10 after 3 years TGE: ", async () => {
				expect(await mqmvesting.connect(await ethers.getSigner(addresses10[0])).withdraw(amount10[0].toString())).to.emit(mqmvesting,'Transfer').withArgs(addresses10[0],mqmvesting.address,amount10[0].toString());
				expect((await mqmtoken.balanceOf(addresses10[0])).toString()).to.equal(amount10[0].toString());
			});
	    });

	});
});
