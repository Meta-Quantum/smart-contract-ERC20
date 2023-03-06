// SPDX-License-Identifier: MIT

/// @title MetaQuantum Token V1
/// @author Arthur Miranda / MQM 2023.3 */

pragma solidity 0.8.4;

import "../@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./Antibots.sol";

/**
 * @title Circulating Supply Methods
 * @dev Allows update the wallets of MetaQuantum by Owner
 */
contract CirculatingSupply is OwnableUpgradeable, Antibots {
	// Array of address
    address[] internal metaquantum_wallets;

    event InMetaQuantumWallet(address indexed _account);
    event OutMetaQuantumWallet(address indexed _account);

	/**
     * @dev function to verify if the address exist in MetaQuantumWallet or not
     * @param _account The address to check
     */
	function isMetaQuantumWallet(address _account) public view returns (bool) {
		if (_account == address(0)) {
			return false;
		}
		uint256 index = metaquantum_wallets.length;
		for (uint256 i=0; i < index ; i++ ) {
			if (_account == metaquantum_wallets[i]) {
				return true;			}
		}
		return false;
	}

	/**
     * @dev Include the wallet in the wallets address of MetaQuantum Wallets
     * @param _account The address to include
     */
	function addMetaQuantumWallet(address _account) public validAddress(_account) onlyOwner() returns (bool) {
		require(!isMetaQuantumWallet(_account), "ERC20 MQM: wallet is already");
		metaquantum_wallets.push(_account);
		emit InMetaQuantumWallet(_account);
		return true;
	}

	/**
     * @dev Exclude the wallet in the wallets address of MetaQuantum Wallets
     * @param _account The address to exclude
     */
	function dropMetaQuantumWallet(address _account) public validAddress(_account) onlyOwner() returns (bool) {
		require(isMetaQuantumWallet(_account), "ERC20 MQM: Wallet don't exist");
		uint256 index = metaquantum_wallets.length;
		for (uint256 i=0; i < index ; i++ ) {
			if (_account == metaquantum_wallets[i]) {
				metaquantum_wallets[i] = metaquantum_wallets[index - 1];
				metaquantum_wallets.pop();
				emit OutMetaQuantumWallet(_account);
				return true;
			}
		}
		return false;
	}

	/**
     * @dev Getting the all wallets address of MetaQuantum Wallets
     */
	function getMetaQuantumWallets() public view returns (address[] memory) {
		return metaquantum_wallets;
	}

}
