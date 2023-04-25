// SPDX-License-Identifier: ISC

/// @title MetaQuantum Token V1
/// @author Arthur Miranda / MQM 2023.3 */

pragma solidity 0.8.4;
pragma experimental ABIEncoderV2;

import "../lib/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "../lib/main/Vesting.sol";

contract MQMVesting is Vesting {

//Deposit is not possible anymore because the deposito period over
error DepositPeriodOver();
//Could not transfer the designated ERC20 token
error TransferFailed();
//FrozenWallet NotFound
error FrozenWalletNotfound();
//Lock Period Ongoing
error LockPeriodOngoing();
//Exceeds Transferable Amount
error ExceedsTransferableAmount();
 

function initialize(address token_) initializer() public  {
		// Allocation #1 / VestingType # 0, Angels Investors & KOLs Total (2.5)%, TGE Unlocked 5%(50000000000000000) and Start with 8 Months(245 days) Locked the Token
		vestingTypes.push(VestingType(0, 50000000000000000, 245 days, 79166666666666700, true, false)); // 8 Months (245 days) Locked, 0.079166666666666700% (79166666666666700) Percent monthly per 12 Months for the 95% Rest
	    // Allocation #2 / VestingType # 1, Seed Total (7)%, TGE Unlocked 7% (70000000000000000) and Start with 6 Months (184 days) Locked the Token
        vestingTypes.push(VestingType(0, 70000000000000000, 184 days, 93000000000000000, true, false)); // 184 days Locked, 0.093000000000000000% (93000000000000000) Percent monthly per 10 Months for the 93% Rest
		// Allocation #3 / VestingType # 2, Private Sale Total (12.5)%, TGE Unlocked 10% (100000000000000000)% and Start with 3 Months (92 days) Locked the Token
        vestingTypes.push(VestingType(0, 100000000000000000, 92 days, 128571428571429000, true, false)); // 92 days Locked, 0.128571428571429000 (128571428571429000) Percent monthly per 7 Months for the 90% Rest
		// Allocation #4 / VestingType # 3, Public Sale Total (1)%, TGE Unlocked 12% (120000000000000000) and Start with 0 day Locked the Token
        vestingTypes.push(VestingType(0, 120000000000000000, 0, 176000000000000000, true, false)); // 0 day locked, 0.176000000000000000 (176000000000000000) Percent monthly per 5 months for the 88% Rest
		// Allocation #5 / VestingType # 4,Liquidity Total (18.5)%, TGE Unlocked 6% (60000000000000000) and Start with 0 day Locked the Token
		vestingTypes.push(VestingType(0, 60000000000000000, 0, 67142857142857100, true, false)); // 0 day Locked, 0.067142857142857100 (67142857142857100) Percent monthly per 14 Months for the 94% Rest
		// Allocation #6 / VestingType # 5, Markting Total (7)%, TGE Unlocked 4% (40000000000000000), and Start After 0 day Locked the Token
		vestingTypes.push(VestingType(0, 40000000000000000, 0, 26666666666666700, true, false)); // 0 day Locked, 0.0.026666666666666700 (26666666666666700) Percent monthly per 36 Months for the 96% Rest
		// Allocation #7 / VestingType # 6, Development Total (7)%, TGE Unlocked 0% (0), and Start After 18 Months (550 days) Locked the Token
		vestingTypes.push(VestingType(0, 0, 550 days, 55555555555555600, true, false)); // 550 Days Locked, 0.055555555555555600 (55555555555555600) Percent monthly per 18 Months for the 100% Rest
		// Allocation #8 / VestingType # 7, Staking Total (17)%, TGE Unlocked 0% (0), and Start After 0 day Locked the Token
		vestingTypes.push(VestingType(0, 0, 0, 27777777777777800, true, false)); // 0 day Locked, 0.027777777777777800 (27777777777777800) Percent monthly per 36 Months for the 100% Rest
        // Allocation #9 / VestingType # 8, Team Total (15)%, TGE Unlocked 0% (0), and Start After 12 Months (366 days) Locked the Token
		vestingTypes.push(VestingType(0, 0, 366 days, 41666666666666700, true, false)); // 366 days Locked, 0.041666666666666700 (41666666666666700) Percent monthly per 24 Months for the 100% Rest
		// Allocation #10 / VestingType # 9, Treasury Total (12.5)% TGE Unlocked 0% (0), and Start After 18 Months (550 days) Locked the Token
		vestingTypes.push(VestingType(0, 0, 550 days, 0, true, false)); // 550 days Locked, 0.055555555555555600 (55555555555555600) Percent monthly per 18 Months for the 100% Rest

        //Set the token address
        token = ERC20Upgradeable(token_);
    }

    function deposit(uint256 amount) public onlyOwner {
        uint256 releaseTime = getReleaseTime();
        if(block.timestamp > releaseTime){
            revert DepositPeriodOver();
        }

        if(!token.transferFrom(msg.sender, address(this), amount)){
            revert TransferFailed();
        }
        emit Transfer(msg.sender, address(this), amount);
    }

     function withdraw(uint256 amount) public {
        if((!frozenWallets[msg.sender].scheduled)){
            revert FrozenWalletNotfound();
        }

        FrozenWallet memory frozenWallet = frozenWallets[msg.sender];
        uint256 releaseTime = getReleaseTime();
        
        if(block.timestamp > releaseTime && block.timestamp < releaseTime + frozenWallet.afterDays)){
            revert LockPeriodOngoing();
        }

        uint256 transferableAmount = getTransferableAmount(msg.sender);
        if(amount>=transferableAmount){
            revert ExceedsTransferableAmount();
        }

        if(!token.transfer(msg.sender, amount)){
            revert TransferFailed();
        }
        emit Transfer(msg.sender, address(this), amount);
    }


}