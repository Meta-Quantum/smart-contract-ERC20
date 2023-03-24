// SPDX-License-Identifier: ISC

/// @title MetaQuantum Token V1
/// @author Arthur Miranda / MQM 2023.3 */

pragma solidity 0.8.4;
pragma experimental ABIEncoderV2;

import "../lib/@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "../lib/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "../lib/main/lzApp/NonblockingLzAppUpgradeable.sol";
import "../lib/main/Vesting.sol";



contract MQMTokenV1 is Vesting, NonblockingLzAppUpgradeable{
	using AddressUpgradeable for address;
	using SafeMathUpgradeable for uint256;
	using SafeERC20Upgradeable for IERC20Upgradeable;
	// Constant Max Total Supply of MQM token
 	uint256 private constant _maxTotalSupply = 100_000_000 * (uint256(10) ** uint256(18));

	function initialize() initializer() public {
		__Ownable_init();
		__ERC20_init_unchained('MetaQuantum', 'MQM');
		__Pausable_init_unchained();
		__ERC20Permit_init('MetaQuantum');
		// Mint Total Supply
        mint(getMaxTotalSupply());
	    // Begininng Deploy of Allocation in the ERC20
		// Allocation #1 / VestingType # 0, Angels Investors & KOLs Total (2.5)%, TGE Unlocked 5%(50000000000000000) and Start with 8 Months(245 days) Locked the Token
		vestingTypes.push(VestingType(0, 50000000000000000, 245 days, 79166666666666700, 0,  true, false)); // 8 Months (245 days) Locked, 0.079166666666666700% (79166666666666700) Percent monthly per 12 Months for the 95% Rest
	    // Allocation #2 / VestingType # 1, Seed Total (7)%, TGE Unlocked 7% (70000000000000000) and Start with 6 Months (184 days) Locked the Token
        vestingTypes.push(VestingType(0, 70000000000000000, 184 days, 93000000000000000, 0,  true, false)); // 184 days Locked, 0.093000000000000000% (93000000000000000) Percent monthly per 10 Months for the 93% Rest
		// Allocation #3 / VestingType # 2, Private Sale Total (12.5)%, TGE Unlocked 10% (100000000000000000)% and Start with 3 Months (92 days) Locked the Token
        vestingTypes.push(VestingType(0, 100000000000000000, 92 days, 128571428571429000, 0, true, false)); // 92 days Locked, 0.128571428571429000 (128571428571429000) Percent monthly per 7 Months for the 90% Rest
		// Allocation #4 / VestingType # 3, Public Sale Total (1)%, TGE Unlocked 12% (120000000000000000) and Start with 0 day Locked the Token
        vestingTypes.push(VestingType(0, 120000000000000000, 0, 176000000000000000, 0, true, false)); // 0 day locked, 0.176000000000000000 (176000000000000000) Percent monthly per 5 months for the 88% Rest
		// Allocation #5 / VestingType # 4,Liquidity Total (18.5)%, TGE Unlocked 6% (60000000000000000) and Start with 0 day Locked the Token
		vestingTypes.push(VestingType(0, 60000000000000000, 0, 67142857142857100, 0, true, false)); // 0 day Locked, 0.067142857142857100 (67142857142857100) Percent monthly per 14 Months for the 94% Rest
		// Allocation #6 / VestingType # 5, Markting Total (7)%, TGE Unlocked 4% (40000000000000000), and Start After 0 day Locked the Token
		vestingTypes.push(VestingType(0, 40000000000000000, 0, 26666666666666700, 0, true, false)); // 0 day Locked, 0.0.026666666666666700 (26666666666666700) Percent monthly per 36 Months for the 96% Rest
		// Allocation #7 / VestingType # 6, Development Total (7)%, TGE Unlocked 0% (0), and Start After 18 Months (550 days) Locked the Token
		vestingTypes.push(VestingType(0, 0, 550 days, 55555555555555600, 0, true, false)); // 550 Days Locked, 0.055555555555555600 (55555555555555600) Percent monthly per 18 Months for the 100% Rest
		// Allocation #8 / VestingType # 7, Staking Total (17)%, TGE Unlocked 0% (0), and Start After 0 day Locked the Token
		vestingTypes.push(VestingType(0, 0, 0, 27777777777777800, 0, true, false)); // 0 day Locked, 0.027777777777777800 (27777777777777800) Percent monthly per 36 Months for the 100% Rest
        // Allocation #9 / VestingType # 8, Team Total (15)%, TGE Unlocked 0% (0), and Start After 12 Months (366 days) Locked the Token
		vestingTypes.push(VestingType(0, 0, 366 days, 41666666666666700, 0, true, false)); // 366 days Locked, 0.041666666666666700 (41666666666666700) Percent monthly per 24 Months for the 100% Rest
		// Allocation #10 / VestingType # 9, Treasury Total (12.5)% TGE Unlocked 0% (0), and Start After 18 Months (550 days) Locked the Token
		vestingTypes.push(VestingType(0, 0, 550 days, 0, 0, true, false)); // 550 days Locked, 0.055555555555555600 (55555555555555600) Percent monthly per 18 Months for the 100% Rest
	}

	/**
     * @dev This Method permit getting Maximun total Supply .
     * See {ERC20-_burn}.
     */
	function getMaxTotalSupply() public pure returns (uint256) {
		return _maxTotalSupply;
	}

 
	/**
     * @dev Implementation / Instance of TransferMany of Parsiq Token.
	 * @dev This method permitr to habdle AirDrop process with a reduce cost of gas in at least 30%
     * @param recipients Array of Address to receive the Tokens in AirDrop process
	 * @param amounts Array of Amounts of token to receive
     *
     */

	function transferMany(address[] calldata recipients, uint256[] calldata amounts) external onlyOwner() whenNotPaused()
    {
        require(recipients.length == amounts.length, "ERC20 MQM: Wrong array length");

        uint256 total = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
			address recipient = recipients[i];
			require(recipient != address(0), "ERC20: transfer to the zero address");
			require(!isBlacklisted(recipient), "ERC20 MQM: recipient account is blacklisted");
			require(amounts[i] != 0, "ERC20 MQM: total amount token is zero");
            total = total.add(amounts[i]);
        }

	    _balances[msg.sender] = _balances[msg.sender].sub(total, "ERC20: transfer amount exceeds balance");

        for (uint256 i = 0; i < recipients.length; i++) {
            address recipient = recipients[i];
            uint256 amount = amounts[i];

            _balances[recipient] = _balances[recipient].add(amount);
            emit Transfer(msg.sender, recipient, amount);
        }
    }

	/**
     * @dev Circulating Supply Method for Calculated based on Wallets of MQM
     */
	function circulatingSupply() public view returns (uint256 result) {
		uint256 index = metaquantum_wallets.length;
		result = totalSupply().sub(balanceOf(owner()));
		for (uint256 i=0; i < index ; i++ ) {
			if ((metaquantum_wallets[i] != address(0)) && (result != 0)) {
				result -= balanceOf(metaquantum_wallets[i]);
			}
		}
	}

	/**
     * @dev Implementation / Instance of paused methods() in the ERC20.
     * @param status Setting the status boolean (True for paused, or False for unpaused)
     * See {ERC20Pausable}.
     */
    function pause(bool status) public onlyOwner() {
        if (status) {
            _pause();
        } else {
            _unpause();
        }
    }

	/**
     * @dev Destroys `amount` tokens from the caller.
     * @param amount Amount token to burn
     * See {ERC20-_burn}.
     */
    function burn(uint256 amount) public {
        _burn(_msgSender(), amount);
    }

    /**
     * @dev Override the Hook of Open Zeppelin for checking before execute the method transfer/transferFrom/mint/burn.
	 * @param sender Addres of Sender of the token
     * @param amount Amount token to transfer/transferFrom/mint/burn, Verify that in hook _beforeTokenTransfer
     */
	function canTransfer(address sender, uint256 amount) public view returns (bool) {
        // Control is scheduled wallet
        if (!frozenWallets[sender].scheduled) {
            return true;
        }

        uint256 balance = balanceOf(sender);
        uint256 restAmount = getRestAmount(sender);

		if(balance.sub(restAmount) < amount) {
			return false;
		}

        return true;
	}


	/**
     * @dev Override the Hook of Open Zeppelin for checking before execute the method transfer/transferFrom/mint/burn.
	 * @param sender Addres of Sender of the token
	 * @param recipient Address of Receptor of the token
     * @param amount Amount token to transfer/transferFrom/mint/burn
     * See {ERC20 Upgradeable}.
     */
	function _beforeTokenTransfer(address sender, address recipient, uint256 amount) internal virtual override notBlacklisted(sender) {
		require(!isBlacklisted(recipient), "ERC20 MQM: recipient account is blacklisted");
		// Permit the Owner execute token transfer/mint/burn while paused contract
		if (_msgSender() != owner()) {
			require(!paused(), "ERC20 MQM: token transfer/mint/burn while paused");
		}
        super._beforeTokenTransfer(sender, recipient, amount);
    }

	/**
     * @dev Override the Standard Transfer Method of Open Zeppelin for checking before if Transfer status is Enabled or Disable.
	 * @param sender Addres of Sender of the token
	 * @param recipient Address of Receptor of the token
     * @param amount Amount token to transfer/transferFrom/mint/burn
     * See {https://github.com/ShieldFinanceHQ/contracts/blob/master/contracts/ShieldToken.sol}.
     */
	function _transfer(address sender, address recipient, uint256 amount) internal override {
        if (isTransferDisabled()) {
            // anti-sniping bot defense is on
            // burn tokens instead of transferring them >:]
            super._burn(sender, amount);
            emit TransferBurned(sender, amount);
        } else {
            super._transfer(sender, recipient, amount);
        }
    }

	/**
     * @dev Creates `amount` new tokens for `to`.
	 * @param _amount Amount Token to mint
     *
     * See {ERC20-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `OWNER`.
		 * - After upgrade the SmartContract and Eliminate this method
     */
    function mint( uint256 _amount) public onlyOwner() {
		require(getMaxTotalSupply() >= totalSupply().add(_amount), "ERC20: Can't Mint, it exceeds the maximum supply ");
        _mint(owner(), _amount);
    }

     function _nonblockingLzReceive(uint16, bytes memory, uint64, bytes memory _payload) internal override {
       (address toAddress, uint amount) = abi.decode(_payload, (address,uint));
       _mint(toAddress, amount);
    }

    function bridge(uint _amount, address _lzEndPoint, uint16 destChainId) public payable {
        lzEndpoint = ILayerZeroEndpointUpgradeable(_lzEndPoint);
        _burn(msg.sender, _amount);
        bytes memory payload = abi.encode(msg.sender, _amount);
        _lzSend(destChainId, payload, payable(msg.sender), address(0x0), bytes(""));
    }

     function estimateFees(address _lzEndPoint, uint16 _dstChainId, address _userApplication, bytes calldata _payload, bool _payInZRO, bytes calldata _adapterParam)  public view returns (uint nativeFee, uint zroFee){     
         ( nativeFee,  zroFee) = ILayerZeroEndpointUpgradeable(_lzEndPoint).estimateFees(_dstChainId, _userApplication, _payload, _payInZRO, _adapterParam);
     }

    function trustAddress(address _otherContract, uint16 destChainId) public onlyOwner {
        trustedRemoteLookup[destChainId] = abi.encodePacked(_otherContract, address(this));   
    }
}
