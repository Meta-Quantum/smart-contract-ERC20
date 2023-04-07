// SPDX-License-Identifier: ISC

/// @title MetaQuantum Token V1
/// @author Arthur Miranda / MQM 2023.3 */

pragma solidity 0.8.4;
pragma experimental ABIEncoderV2;

import "../lib/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "../lib/main/lzApp/NonblockingLzAppUpgradeable.sol";
import "../lib/main/Vesting.sol";



contract MQMTokenV1 is OwnableUpgradeable, Claimable, PausableUpgradeable, ERC20PermitUpgradeable, NonblockingLzAppUpgradeable{
	using AddressUpgradeable for address;
	using SafeERC20Upgradeable for IERC20Upgradeable;

    error WrongArrayLength();
    error TranferToZeroAddress();
    error RecipientIsBlacklisted();
    error ZeroAmount();
    error AmountExceedsBalance();
    error TokenActionWhilePaused();
    error MaximumSupplyOverflow();

	// Constant Max Total Supply of MQM token
 	uint256 private constant _maxTotalSupply = 100_000_000 * (uint256(10) ** uint256(18));

	function initialize() initializer() public {
		__Ownable_init();
		__ERC20_init_unchained('MetaQuantum', 'MQM');
		__Pausable_init_unchained();
		__ERC20Permit_init('MetaQuantum');
		// Mint Total Supply
        mint(getMaxTotalSupply());
	}

	/**
     * @dev This Method permit getting Maximun total Supply .
     * See {ERC20-_burn}.
     */
	function getMaxTotalSupply() public pure returns (uint256) {
		return _maxTotalSupply;
	}

 
	/**
     * @dev Implementation / Instance of TransferMany of MQM Token.
	 * @dev This method permitr to habdle AirDrop process with a reduce cost of gas in at least 30%
     * @param recipients Array of Address to receive the Tokens in AirDrop process
	 * @param amounts Array of Amounts of token to receive
     *
     */

	function transferMany(address[] calldata recipients, uint256[] calldata amounts) external onlyOwner() whenNotPaused()
    {
        if(recipients.length != amounts.length){
            revert WrongArrayLength();
        }

        uint256 total = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
			address recipient = recipients[i];
            if(recipient == address(0)){
                revert TranferToZeroAddress();
            }
            if(isBlacklisted(recipient)){
                revert RecipientIsBlacklisted();
            }
            if(amounts[i] == 0){
                revert ZeroAmount();
            }
            total += amounts[i];
        }

        if(total > _balances[msg.sender]){
            revert AmountExceedsBalance();
        }

	    _balances[msg.sender] -= total;

        for (uint256 i = 0; i < recipients.length; i++) {
            address recipient = recipients[i];
            uint256 amount = amounts[i];

            _balances[recipient] += amount;
            emit Transfer(msg.sender, recipient, amount);
        }
    }

	/**
     * @dev Circulating Supply Method for Calculated based on Wallets of MQM
     */
	function circulatingSupply() public view returns (uint256 result) {
		uint256 index = metaquantum_wallets.length;
		result = totalSupply() - balanceOf(owner());
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
	//function canTransfer(address sender, uint256 amount) public view returns (bool) {
        // Control is scheduled wallet
    //    if (!frozenWallets[sender].scheduled) {
    //        return true;
    //    }

    //    uint256 balance = balanceOf(sender);
    //    uint256 restAmount = getRestAmount(sender);

	//	if(balance.sub(restAmount) < amount) {
	//		return false;
	//	}

    //    return true;
	//}


	/**
     * @dev Override the Hook of Open Zeppelin for checking before execute the method transfer/transferFrom/mint/burn.
	 * @param sender Addres of Sender of the token
	 * @param recipient Address of Receptor of the token
     * @param amount Amount token to transfer/transferFrom/mint/burn
     * See {ERC20 Upgradeable}.
     */
	function _beforeTokenTransfer(address sender, address recipient, uint256 amount) internal virtual override notBlacklisted(sender) notBlacklisted(recipient) {
		// Permit the Owner execute token transfer/mint/burn while paused contract
		if (_msgSender() != owner() && paused()) {
            revert TokenActionWhilePaused();
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
        if(getMaxTotalSupply() < (totalSupply()+_amount)){
            revert MaximumSupplyOverflow();
        }
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
