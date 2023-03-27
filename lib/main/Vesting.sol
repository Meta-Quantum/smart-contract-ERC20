// SPDX-License-Identifier: MIT

/// @title MetaQuantum Token V1
/// @author Arthur Miranda / MQM 2023.3 */

pragma solidity 0.8.4;

import "../@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol";
import "../@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "../@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "../@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "../@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "../main/Claimable.sol";
import "./Math.sol";

struct FrozenWallet {
	bool scheduled;
	uint32 startDay;
    uint32 afterDays;
    address wallet;
    uint256 totalAmount;
    uint256 dailyAmount;
	uint256 monthlyAmount;
    uint256 initialAmount;
}

struct VestingType {
    uint256 dailyRate;
    uint256 initialRate;
    uint256 afterDays;
	uint256 monthRate;
	bool vesting;
	bool vestingType; //true for daily rate and false for monthly rate
}

/**
 * @title Vesting Methods
 * @dev All Method to permit handle the Vesting Process of MQM token
 */
contract Vesting is OwnableUpgradeable, Math, Claimable, PausableUpgradeable, ERC20PermitUpgradeable {
	using SafeMathUpgradeable for uint256;

	// Mapping of FrozenWallet
	// Address Wallets -> Struc FrozenWallet
	mapping (address => FrozenWallet) public frozenWallets;

	uint256 private totalAmountVesting;
	// Array of Struc Vesting Types
    VestingType[] public vestingTypes;

	ERC20Upgradeable public token;

	// Event
	event inFrozenWallet(
		bool scheduled,
		uint32 startDay,
		uint32 afterDays,
		address indexed wallet,
		uint256 indexed totalAmount,
		uint256 dailyAmount,
		uint256 monthlyAmount,
		uint256 initialAmount
	);

    /**
     * @dev Method to permit to get the Exactly Unix Epoch of Token Generate Event
     */
	function getReleaseTime() public pure returns (uint256) {
        return 1626440400; // "Friday, 16 July 2021 13:00:00 GMT"
    }

    /**
     * @dev Principal Method to permit Upload all wallets in all allocation, based on Vesting Process
	 * @dev this method was merge with transferMany method for reduce the cost in gass around 30%
	 * @param addresses Array of Wallets will be Frozen with Locked and Unlocked Token Based on the Predefined Allocation
	 * @param totalAmounts Array of Amount coprresponding with each wallets, will be Locked and Unlocked Based on the Predefined Allocation
	 * @param vestingTypeIndex Index corresponding to the List of Wallets to be Upload in the Smart Contract ERC20 of MQM Foundation
     */
    function addAllocations(address[] calldata addresses, uint256[] calldata totalAmounts, uint256 vestingTypeIndex) external onlyOwner() whenNotPaused() returns (bool) {
        require(addresses.length == totalAmounts.length, "Address and totalAmounts length must be same");
		VestingType memory vestingType = vestingTypes[vestingTypeIndex];
        require(vestingType.vesting, "Vesting type isn't found");

        uint256 addressesLength = addresses.length;
		uint256 total = 0;

		for(uint256 i = 0; i < addressesLength; i++) {
			address _address = addresses[i];
			require(_address != address(0), "ERC20: transfer to the zero address");
			require(!isBlacklisted(_address), "ERC20 MQM: recipient account is blacklisted");
			require(totalAmounts[i] != 0, "ERC20 MQM: total amount token is zero");
			total = total.add(totalAmounts[i]);
		}

	    //_balances[msg.sender] = _balances[msg.sender].sub(total, "ERC20: transfer amount exceeds balance");
		   require(token.balanceOf(address(this)) >= total,"ERC20: transfer amount exceeds balance");


        for(uint256 j = 0; j < addressesLength; j++) {
            address _address = addresses[j];
            uint256 totalAmount = totalAmounts[j];
			uint256 dailyAmount;
			uint256 monthlyAmount;
			uint256 afterDay;
			uint256 initialAmount;
			if (vestingType.vestingType) {
				dailyAmount = mulDiv(totalAmounts[j], vestingType.dailyRate, 1e18);
				monthlyAmount = 0;
				 afterDay = vestingType.afterDays;
			} else {
				dailyAmount = 0;
				//monthlyAmount = mulDiv(totalAmounts[j], 500000000000000000, 1e18);
				//afterDay = vestingType.monthDelay.mul(30 days);
				monthlyAmount =  mulDiv(totalAmounts[j], vestingType.monthRate, 1e18);
				afterDay = vestingType.afterDays;
			}
			
			if (vestingTypeIndex == 3) {
				initialAmount = 0;
			} else {
				initialAmount = mulDiv(totalAmounts[j], vestingType.initialRate, 1e18);
			}
			// Transfer Token to the Wallet
            //_balances[_address] = _balances[_address].add(totalAmount);
			//emit Transfer(msg.sender, _address, totalAmount);

			// Frozen Wallet
            addFrozenWallet(_address, totalAmount, dailyAmount, monthlyAmount, initialAmount, afterDay);
			totalAmountVesting = totalAmountVesting + totalAmount;
        }

        return true;
    }

    /**
     * @dev Auxiliary Method to permit Upload all wallets in all allocation, based on Vesting Process
	 * @param wallet Wallet will be Frozen based on correspondig Allocation
	 * @param totalAmount Total Amount of Stake holder based on Investment and the Allocation to participate
	 * @param dailyAmount Daily Amount of Stake holder based on Investment and the Allocation to participate
	 * @param monthlyAmount Monthly Amount of Stake holder based on Investment and the Allocation to participate
	 * @param initialAmount Initial Amount of Stake holder based on Investment and the Allocation to participate
	 * @param afterDays Period of Days after to start Unlocked Token based on the Allocation to participate
     */
	function addFrozenWallet(address wallet, uint256 totalAmount, uint256 dailyAmount,uint256 monthlyAmount ,uint256 initialAmount, uint256 afterDays) internal {
        uint256 releaseTime = getReleaseTime();

        // Create frozen wallets
        FrozenWallet memory frozenWallet = FrozenWallet(
			true,
			uint32(releaseTime.add(afterDays)),
            uint32(afterDays),
            wallet,
            totalAmount,
            dailyAmount,
			monthlyAmount,
            initialAmount
        );

        // Add wallet to frozen wallets
        frozenWallets[wallet] = frozenWallet;

		// emit Event add Frozen Wallet
		emit inFrozenWallet(
			true,
			uint32(releaseTime.add(afterDays)),
            uint32(afterDays),
			wallet,
            totalAmount,
            dailyAmount,
			monthlyAmount,
            initialAmount);
    }

    /**
     * @dev Auxiliary Method to permit to get the Last Exactly Unix Epoch of Blockchain timestamp
     */
    function getTimestamp() public view returns (uint256) {
        return block.timestamp;
    }

    /**
     * @dev Auxiliary Method to permit get the number of days elapsed time from the TGE to the current moment
	 * @param afterDays Period of Days after to start Unlocked Token based on the Allocation to participate
	 */
    function getDays(uint256 afterDays) public view returns (uint256 dias) {
        uint256 releaseTime = getReleaseTime();
        uint256 time = releaseTime.add(afterDays);

        if (block.timestamp < time) {
            return dias;
        }

        uint256 diff = block.timestamp.sub(time);
        dias = diff.div(24 hours);
    }

    /**
     * @dev Auxiliary Method to permit get the number of months elapsed time from the TGE to the current moment
	 * @param afterDays Period of Days after to start Unlocked Token based on the Allocation to participate	 */
	 function getMonths(uint afterDays) public view returns (uint256 months) {
        uint256 releaseTime = getReleaseTime();
        uint256 time = releaseTime.add(afterDays);

        if (block.timestamp < time) {
            return months;
        }

        uint256 diff = block.timestamp.sub(time);
        months = diff.div(30 days);
    }

	/**
     * @dev Auxiliary Method to permit to verify if the vesting processs start or not
	 */
    function isStarted(uint256 startDay) public view returns (bool) {
        uint256 releaseTime = getReleaseTime();

        if (block.timestamp < releaseTime || block.timestamp < startDay) {
            return false;
        }

        return true;
    }


    /**
     * @dev Auxiliary Method to permit get of token can be transferable based on Allocation of the Frozen Wallet
	 * @param sender Wallets of Stakeholders to verify amount of Token are Unlocked based on Allocation
	 */
    function getTransferableAmount(address sender) public view returns (uint256 transferableAmount) {
		uint256 releaseTime = getReleaseTime();

		if (block.timestamp < releaseTime) {
            return transferableAmount;
        }

		FrozenWallet memory frozenWallet = frozenWallets[sender];

		if ((frozenWallet.monthlyAmount == 0) && (frozenWallet.dailyAmount != 0)) {
			uint256 dias = getDays(frozenWallet.afterDays);
        	uint256 dailyTransferableAmount = frozenWallet.dailyAmount.mul(dias);
			transferableAmount = dailyTransferableAmount.add(frozenWallet.initialAmount);
		}
		if ((frozenWallet.monthlyAmount != 0) && (frozenWallet.dailyAmount == 0)) {
			uint256 meses = getMonths(frozenWallet.afterDays);
			uint256 monthlyTransferableAmount = frozenWallet.monthlyAmount.mul(meses);
			transferableAmount = monthlyTransferableAmount.add(frozenWallet.initialAmount);
		}

        if (transferableAmount > frozenWallet.totalAmount) {
            return frozenWallet.totalAmount;
        }
    }

    /**
     * @dev Auxiliary Method to permit get of token can't be transferable based on Allocation of the Frozen Wallet
	 * @param sender Wallets of Stakeholders to verify amount of Token are locked based on Allocation
	 */
	function getRestAmount(address sender) public view returns (uint256 restAmount) {
        uint256 transferableAmount = getTransferableAmount(sender);
        restAmount = frozenWallets[sender].totalAmount.sub(transferableAmount);
    }

	function getToken() external view returns (address){
        return address(token);
    }

    function getWithdrawContractAmount()  external view returns (uint256){
		return token.balanceOf(address(this));
    }

    function getWithdrawContractAmountSubFrozenWalletAllocation()  external view returns (uint256){
		return token.balanceOf(address(this)) - totalAmountVesting;
    }

}
