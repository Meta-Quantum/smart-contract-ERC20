// SPDX-License-Identifier: ISC

/// @title MetaQuantum Token V1
/// @author Arthur Miranda / MQM 2023.3 */

pragma solidity 0.8.4;
pragma experimental ABIEncoderV2;

import "../lib/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "../lib/@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "../lib/@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "../lib/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "../lib/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "../lib/@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "../lib/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol";
import "../lib/@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "../lib/main/CirculatingSupply.sol";
import "../lib/main/Math.sol";
import "../lib/main/Claimable.sol";
import "../lib/main/lzApp/NonblockingLzAppUpgradeable.sol";



contract MQMTokenV1 is Math, Claimable, PausableUpgradeable, ERC20PermitUpgradeable, NonblockingLzAppUpgradeable{
	using AddressUpgradeable for address;
	using SafeMathUpgradeable for uint256;
	using SafeERC20Upgradeable for IERC20Upgradeable;
	// Constant Max Total Supply of MQM token
 	uint256 private constant _maxTotalSupply = 100_000_000 * (uint256(10) ** uint256(18));
    uint16 destChainId;

	function initialize(address _lzEndpoint) initializer() public {
		__Ownable_init();
		__ERC20_init_unchained('MetaQuantum', 'MQM');
		__Pausable_init_unchained();
		__ERC20Permit_init('MetaQuantum');
		// Mint Total Supply
        mint(getMaxTotalSupply());
        //LayerZero Optimism Goerli
        //lzChainId:10132 lzEndpoint:0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1
        if (_lzEndpoint == 0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1) destChainId = 10121;
        //LayerZero Goerli
        //lzChainId:10121 lzEndpoint:0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23
        if (_lzEndpoint == 0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23) destChainId = 10132;
	}

	/**
     * @dev This Method permit getting Maximun total Supply .
     * See {ERC20-_burn}.
     */
	function getMaxTotalSupply() public pure returns (uint256) {
		return _maxTotalSupply;
	}

    /**
     * @dev This Method permit getting Layer0 destChainId .
     */
	function getDestChainId() public view returns (uint16) {
		return destChainId;
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

    function bridge(uint _amount) public payable {
        _burn(msg.sender, _amount);
        bytes memory payload = abi.encode(msg.sender, _amount);
        _lzSend(destChainId, payload, payable(msg.sender), address(0x0), bytes(""));
    }

    function trustAddress(address _otherContract) public onlyOwner {
        trustedRemoteLookup[destChainId] = abi.encodePacked(_otherContract, address(this));   
    }
}
