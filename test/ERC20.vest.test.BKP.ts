import { ethers, network, upgrades } from 'hardhat';
import { BigNumber, Signer } from "ethers";
import { expect } from "chai";
import moment from 'moment';

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
		const TGE = moment((await mqmvesting.getReleaseTime())*1000).utc();
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

		for (let i=10; i < 110; i++) {
			addresses1.push((await accounts[i].getAddress()).toString());
			addresses2.push((await accounts[i+100].getAddress()).toString());
			addresses3.push((await accounts[i+200].getAddress()).toString());
			addresses4.push((await accounts[i+300].getAddress()).toString());
			addresses5.push((await accounts[i+400].getAddress()).toString());
			addresses6.push((await accounts[i+500].getAddress()).toString());
			addresses7.push((await accounts[i+600].getAddress()).toString());
			addresses8.push((await accounts[i+700].getAddress()).toString());
			addresses9.push((await accounts[i+800].getAddress()).toString());
			addresses10.push((await accounts[i+900].getAddress()).toString());
			amount1.push(ethers.utils.parseEther(String(i+75000)));
			amount2.push(ethers.utils.parseEther(String(i+70000)));
			amount3.push(ethers.utils.parseEther(String(i+30000)));
			amount4.push(ethers.utils.parseEther(String(i+300)));
			amount5.push(ethers.utils.parseEther(String(i+500)));
			amount6.push(ethers.utils.parseEther(String(i+45000)));
			amount7.push(ethers.utils.parseEther(String(i+1000)));
			amount8.push(ethers.utils.parseEther(String(i+100)));
			amount9.push(ethers.utils.parseEther(String(i+10)));
			amount10.push(ethers.utils.parseEther(String(i+45)));
		}
		const address:string = addresses1[35];
		const amount:BigNumber =  amount1[35];
		describe("Start to Load the All Wallets in the allocation to corresponding such vesting process", async () => {
			beforeEach(async () => {
				// initialize
				defenseBlockDuration = 20
				const tiempo = Math.floor((await ethers.provider.getBlock("latest")).timestamp);
				console.log("Verify TimeStamp: ", tiempo," Full Date: ", moment(tiempo*1000).utc().format("dddd, MMMM Do YYYY, h:mm:ss a"));
			})

			it("1.1.- Call the AddAllocation Method, and Include a Address Zero, in the Wallets Array, Revert Transaction", async () => {
				// Revert Because include a Zero Address in Array
				addresses1[35] = '0x0000000000000000000000000000000000000000';
				console.log("addresses1[35]",addresses1[35]);
				console.log("amount1[35]",amount1[35]);
				await expect(mqmvesting.connect(accounts[0]).addAllocations(addresses1, amount1, 0)).to.be.revertedWith("revert ERC20 MQM: transfer to the zero address")
			});

			it("1.2.- Call the AddAllocation Method, and Include a Blacklisted Address in the Wallets Array, Revert Transaction", async () => {
				// Revert Because include a Blacklisted Address in Array
				addresses1[35] = address;
				await expect(mqmvesting.connect(accounts[0]).addBlacklist(address)).to.emit(mqmvesting, 'InBlacklisted').withArgs(address);
				await expect(mqmvesting.connect(accounts[0]).addAllocations(addresses1, amount1, 0)).to.be.revertedWith("revert ERC20 MQM: recipient account is blacklisted");
				await expect(mqmvesting.connect(accounts[0]).dropBlacklist(address)).to.emit(mqmvesting, 'OutBlacklisted').withArgs(address);
			});

			it("1.3.- Call the AddAllocation Method, and Include a Zero TotalAmount, in the Amount Array, Revert Transaction", async () => {
				// Revert Because include a Zero TotalAmount in Array
				amount1[35] = ethers.utils.parseEther(String(0));
				await expect(mqmvesting.connect(accounts[0]).addAllocations(addresses1, amount1, 0)).to.be.revertedWith("revert ERC20 MQM: total amount token is zero");
				amount1[35] = amount;
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
				//Review TODO:
				// Allocation #1
				const receipt = await mqmvesting.addAllocations(addresses1, amount1, 0);
				// await receipt.wait();
				// console.log("List of Wallet of Allocation #1, Balances, TransferableAmount, RestAmount Before TGE: ");
				for (let i=0 ; i<100; i++) {
					expect((await mqmvesting.getFrozenWallet(addresses1[i])).toString()).to.equal((amount1[i]).toString());
					//RestAmount Before TGE should be 0
					expect((await mqmvesting.getTransferableAmount(addresses1[i])).toString()).to.equal('0');
					expect((await mqmvesting.getRestAmount(addresses1[i])).toString()).to.equal((amount1[i]).toString());
				}
			});

			it("1.6.- Call the AddAllocation Method for Allocation #2 and upload all Wallets of the Vesting Process in the Smart Contract and Verify have the right Values", async () => {
				// Allocation #2
				const receipt = await mqmvesting.addAllocations(addresses2, amount2, 1);
				// await receipt.wait();
				// console.log("List of Wallet of Allocation #2, Balances, TransferableAmount, RestAmount Before TGE: ");
				for (let i=0 ; i<100; i++) {
					//console.log("Wallet ",i ," : ", addresses2[i], "Amount: ", amount2[i].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses2[i])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses2[i])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses2[i])).toString());
					expect((await mqmvesting.getFrozenWallet(addresses2[i])).toString()).to.equal((amount2[i]).toString());
					expect((await mqmvesting.getTransferableAmount(addresses2[i])).toString()).to.equal('0');
					expect((await mqmvesting.getRestAmount(addresses2[i])).toString()).to.equal((amount2[i]).toString());
				}
			});
			it("1.7.- Call the AddAllocation Method for Allocation #3 and upload all Wallets of the Vesting Process in the Smart Contract and Verify have the right Values", async () => {
				// Allocation #3
				const receipt = await mqmvesting.addAllocations(addresses3, amount3, 2);
				// await receipt.wait();
				// console.log("List of Wallet of Allocation #3, Balances, TransferableAmount, RestAmount Before TGE: ");
				for (let i=0 ; i<100; i++) {
					// console.log("Wallet ",i ," : ", addresses3[i], "Amount: ", amount3[i].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses3[i])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses3[i])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses3[i])).toString());
					expect((await mqmvesting.getFrozenWallet(addresses3[i])).toString()).to.equal((amount3[i]).toString());
					expect((await mqmvesting.getTransferableAmount(addresses3[i])).toString()).to.equal('0');
					expect((await mqmvesting.getRestAmount(addresses3[i])).toString()).to.equal((amount3[i]).toString());
				}
			});
			it("1.8.- Call the AddAllocation Method for Allocation #5 and upload all Wallets of the Vesting Process in the Smart Contract and Verify have the right Values", async () => {
				// Allocation #5
				const receipt = await mqmvesting.addAllocations(addresses5, amount5, 4);
				// await receipt.wait();
				// console.log("List of Wallet of Allocation #5, Balances, TransferableAmount, RestAmount Before TGE: ");
				for (let i=0 ; i<100; i++) {
					// console.log("Wallet ",i ," : ", addresses5[i], "Amount: ", amount5[i].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses5[i])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses5[i])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses5[i])).toString());
					expect((await mqmvesting.getFrozenWallet(addresses5[i])).toString()).to.equal((amount5[i]).toString());
					expect((await mqmvesting.getTransferableAmount(addresses5[i])).toString()).to.be.equal('0');
					expect((await mqmvesting.getRestAmount(addresses5[i])).toString()).to.equal((amount5[i]).toString());
				}
			});
			it("1.9.- Call the AddAllocation Method for Allocation #6 and upload all Wallets of the Vesting Process in the Smart Contract and Verify have the right Values", async () => {
				// Allocation #6
				const receipt = await mqmvesting.addAllocations(addresses6, amount6, 5);
				// await receipt.wait();
				// console.log("List of Wallet of Allocation #6, Balances, TransferableAmount, RestAmount Before TGE: ");
				for (let i=0 ; i<100; i++) {
					// console.log("Wallet ",i ," : ", addresses6[i], "Amount: ", amount6[i].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses6[i])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses6[i])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses6[i])).toString());
					expect((await mqmvesting.getFrozenWallet(addresses6[i])).toString()).to.equal((amount6[i]).toString());
					expect((await mqmvesting.getTransferableAmount(addresses6[i])).toString()).to.equal('0');
					expect((await mqmvesting.getRestAmount(addresses6[i])).toString()).to.equal((amount6[i]).toString());
				}
			});
			it("1.10.- Call the AddAllocation Method for Allocation #7 and upload all Wallets of the Vesting Process in the Smart Contract and Verify have the right Values", async () => {
				// Allocation #7
				const receipt = await mqmvesting.addAllocations(addresses7, amount7, 6);
				// await receipt.wait();
				// console.log("List of Wallet of Allocation #7, Balances, TransferableAmount, RestAmount Before TGE: ");
				for (let i=0 ; i<100; i++) {
					// console.log("Wallet ",i ," : ", addresses7[i], "Amount: ", amount7[i].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses7[i])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses7[i])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses7[i])).toString());
					expect((await mqmvesting.getFrozenWallet(addresses7[i])).toString()).to.equal((amount7[i]).toString());
					expect((await mqmvesting.getTransferableAmount(addresses7[i])).toString()).to.equal('0');
					expect((await mqmvesting.getRestAmount(addresses7[i])).toString()).to.equal((amount7[i]).toString());
				}
			});
			it("1.11.- Call the AddAllocation Method for Allocation #8 and upload all Wallets of the Vesting Process in the Smart Contract and Verify have the right Values", async () => {
				// Allocation #8
				const receipt = await mqmvesting.addAllocations(addresses8, amount8, 7);
				// await receipt.wait();
				// console.log("List of Wallet of Allocation #8, Balances, TransferableAmount, RestAmount Before TGE: ");
				for (let i=0 ; i<100; i++) {
					// console.log("Wallet ",i ," : ", addresses8[i], "Amount: ", amount8[i].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses8[i])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses8[i])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses8[i])).toString());
					expect((await mqmvesting.getFrozenWallet(addresses8[i])).toString()).to.equal((amount8[i]).toString());
					expect((await mqmvesting.getTransferableAmount(addresses8[i])).toString()).to.equal('0');
					expect((await mqmvesting.getRestAmount(addresses8[i])).toString()).to.equal((amount8[i]).toString());
				}
			});
			it("1.12.- Call the AddAllocation Method for Allocation #9 and upload all Wallets of the Vesting Process in the Smart Contract and Verify have the right Values", async () => {
				// Allocation #9
				const receipt = await mqmvesting.addAllocations(addresses9, amount9, 8);
				// await receipt.wait();
				// console.log("List of Wallet of Allocation #9, Balances, TransferableAmount, RestAmount Before TGE: ");
				for (let i=0 ; i<100; i++) {
					// console.log("Wallet ",i ," : ", addresses9[i], "Amount: ", amount9[i].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses9[i])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses9[i])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses9[i])).toString());
					expect((await mqmvesting.getFrozenWallet(addresses9[i])).toString()).to.equal((amount9[i]).toString());
					expect((await mqmvesting.getTransferableAmount(addresses9[i])).toString()).to.equal('0');
					expect((await mqmvesting.getRestAmount(addresses9[i])).toString()).to.equal((amount9[i]).toString());
				}
			});
			it("1.13.- Call the AddAllocation Method for Allocation #10 and upload all Wallets of the Vesting Process in the Smart Contract and Verify have the right Values", async () => {
				// Allocation #10
				const receipt = await mqmvesting.addAllocations(addresses10, amount10, 9);
				// await receipt.wait();
				// console.log("List of Wallet of Allocation #10, Balances, TransferableAmount, RestAmount Before TGE: ");
				for (let i=0 ; i<100; i++) {
					// console.log("Wallet ",i ," : ", addresses10[i], "Amount: ", amount10[i].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses10[i])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses10[i])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses10[i])).toString());
					expect((await mqmvesting.getFrozenWallet(addresses10[i])).toString()).to.equal((amount10[i]).toString());
					expect((await mqmvesting.getTransferableAmount(addresses10[i])).toString()).to.equal('0');
					expect((await mqmvesting.getRestAmount(addresses10[i])).toString()).to.equal((amount10[i]).toString());
				}
			});
			
			it("1.14- Verify Monthly Rate Iteration of Allocation #1, #2, #3, #4, #5, #6 ,#7, #8, #9,#10 TGE =============================================================", async () => {
				console.log("Date for Token Generate Event Before TGE: ", parseInt(TGE.format('X')), TGE.format("dddd, MMMM Do YYYY, h:mm:ss a"));
				console.log("List of Wallet of Allocation #1 Before TGE, Balances, TransferableAmount, RestAmount Beginning to TGE: ");
				for (let i=0 ; i<5; i++) {
					console.log("Wallet ",i ," : ", addresses1[i], "Amount: ", amount1[i].toString(), "Balances: ",(await mqmvesting.getFrozenWallet(addresses1[i])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses1[i])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses1[i])).toString());
				}
				for (let i=0 ; i<100; i++) {
					expect((await mqmvesting.getFrozenWallet(addresses1[i])).toString()).to.equal((amount1[i]).toString());
					expect((await mqmvesting.getTransferableAmount(addresses1[i])).toString()).to.equal('0');
					expect((await mqmvesting.getRestAmount(addresses1[i])).toString()).to.equal((amount1[i]).toString());
				}

				 console.log("List of Wallet of Allocation #2, Balances, TransferableAmount, RestAmount Beginning to TGE: ");
				 for (let i=0 ; i<5; i++) {
				 	console.log("Wallet ",i ," : ", addresses2[i], "Amount: ", amount2[i].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses2[i])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses2[i])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses2[i])).toString());
				 }
				 for (let i=0 ; i<100; i++) {
				 	expect((await mqmvesting.getFrozenWallet(addresses2[i])).toString()).to.equal((amount2[i]).toString());
				 	expect((await mqmvesting.getTransferableAmount(addresses2[i])).toString()).to.equal('0');
				 	expect((await mqmvesting.getRestAmount(addresses2[i])).toString()).to.equal((amount2[i]).toString());
				 }
				// console.log("List of Wallet of Allocation #3, Balances, TransferableAmount, RestAmount Beginning to TGE: ");
				// for (let i=0 ; i<5; i++) {
				// 	console.log("Wallet ",i ," : ", addresses3[i], "Amount: ", amount3[i].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses3[i])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses3[i])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses3[i])).toString());
				// }
				// for (let i=0 ; i<100; i++) {
				// 	expect((await mqmvesting.balanceOf(addresses3[i])).toString()).to.equal((amount3[i]).toString());
				// 	const ten:BigNumber = BigNumber.from(await mqmvesting.balanceOf(addresses3[i])).mul('10').div('100');
				// 	expect((await mqmvesting.getTransferableAmount(addresses3[i])).toString()).to.equal(ten.toString());
				// 	expect((await mqmvesting.canTransfer(addresses3[i],ten.toString()))).to.equal(true);
				// 	expect((await mqmvesting.canTransfer(addresses3[i],ten.add(1).toString()))).to.equal(false);
				// 	const diff:BigNumber = BigNumber.from(await mqmvesting.balanceOf(addresses3[i])).sub(ten);
				// 	expect((await mqmvesting.getRestAmount(addresses3[i])).toString()).to.equal(diff.toString());
				// }
				// console.log("List of Wallet of Allocation #6, Balances, TransferableAmount, RestAmount Beginning to TGE: ");
				// for (let i=0 ; i<5; i++) {
				// 	console.log("Wallet ",i ," : ", addresses6[i], "Amount: ", amount6[i].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses6[i])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses6[i])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses6[i])).toString());
				// }
				// for (let i=0 ; i<100; i++) {
				// 	expect((await mqmvesting.balanceOf(addresses6[i])).toString()).to.equal((amount6[i]).toString());
				// 	expect((await mqmvesting.getTransferableAmount(addresses6[i])).toString()).to.equal('0');
				// 	expect((await mqmvesting.getRestAmount(addresses6[i])).toString()).to.equal((amount6[i]).toString());
				// }
				// console.log("List of Wallet of Allocation #10, Balances, TransferableAmount, RestAmount Beginning to TGE: ");
				// for (let i=0 ; i<5; i++) {
				// 	console.log("Wallet ",i ," : ", addresses10[i], "Amount: ", amount10[i].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses10[i])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses10[i])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses10[i])).toString());
				// }
				// for (let i=0 ; i<100; i++) {
				// 	expect((await mqmvesting.balanceOf(addresses10[i])).toString()).to.equal((amount10[i]).toString());
				// 	expect((await mqmvesting.getTransferableAmount(addresses10[i])).toString()).to.equal((amount10[i]).toString());
				// 	expect((await mqmvesting.getRestAmount(addresses10[i])).toString()).to.equal('0');
				// }
			});
				//it After 1 Month
				//console.log("Date for Token Generate Event After 1 Month TGE: ", parseInt(TGE.add(30,'d').add(2, 'h').format('X')), TGE.format("dddd, MMMM Do YYYY, h:mm:ss a"));
				//	await network.provider.send("evm_setNextBlockTimestamp", [parseInt(TGE.format('X'))]);
				//	await network.provider.send("evm_mine", []);
				//	let time = Math.floor((await ethers.provider.getBlock("latest")).timestamp);
				//	console.log("Verify TimeStamp: Before TGE ", time," Full Date: ", moment(time*1000).utc().format("dddd, MMMM Do YYYY, h:mm:ss a"));
					
				//	for (let i=0 ; i<100; i++) {
				//		expect((await mqmvesting.getFrozenWallet(addresses1[i])).toString()).to.equal((amount1[i]).toString());
						//TGE event should be 5% inital unlocked
				//		const five:BigNumber = BigNumber.from(amount1[i]).mul(5).div(100);
				//		expect((await mqmvesting.getTransferableAmount(addresses1[i])).toString()).to.equal(five.toString());
				//		const diff:BigNumber = BigNumber.from((amount1[i]).sub(five));
				//		expect((await mqmvesting.getRestAmount(addresses1[i])).toString()).to.equal(diff.toString());
				//	}
				//console.log("List of Wallet of Allocation #2, Balances, TransferableAmount, RestAmount Beginning to TGE: ");
				//for (let i=0 ; i<5; i++) {
				//	console.log("Wallet ",i ," : ", addresses2[i], "Amount: ", amount2[i].toString(), "Balances: ",(await mqmvesting.balanceOf(addresses2[i])).toString(),"Transferable Amount: ",(await mqmvesting.getTransferableAmount(addresses2[i])).toString(), "Rest Amount: ",(await mqmvesting.getRestAmount(addresses2[i])).toString());
				//}
				//for (let i=0 ; i<100; i++) {
				//TGE event should be 7% inital unlocked
				//	expect((await mqmvesting.getFrozenWallet(addresses2[i])).toString()).to.equal((amount2[i]).toString());
				//   const seven:BigNumber = BigNumber.from(amount2[i]).mul(7).div(100);
				//	expect((await mqmvesting.getTransferableAmount(addresses2[i])).toString()).to.equal(seven.toString());
				//  const diff:BigNumber = BigNumber.from((amount2[i]).sub(seven));
				//	expect((await mqmvesting.getRestAmount(addresses2[i])).toString()).to.equal(diff.toString());
				//}

		



			

		});

	});
});
