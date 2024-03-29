import { task } from "hardhat/config";
import "hardhat-gas-reporter";
import 'hardhat-contract-sizer';
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-typechain";
import "@typechain/ethers-v5";
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-spdx-license-identifier';
import '@nomiclabs/hardhat-etherscan';
import 'dotenv/config';
import 'solidity-coverage';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 export default  {
	networks: {
		
		mainnet: {
			chainId: 1,
			url: process.env.URL_MAINNET_ETH,
			gasPrice: 65000000000,
			timeout: 100000,
			accounts: {
				mnemonic:process.env.MNEMONIC
			}
		},
		goerli: {
			chainId: 5,
			url: process.env.URL_TESTNET_ETH,
			gasPrice: 65000000000,
			timeout: 100000,
			accounts: {
				mnemonic:process.env.MNEMONIC,
				count:parseInt(`${process.env.ACCOUNTS}`)
			}
		},
		polygon: {
			chainId: 137,
			url:process.env.URL_MAINNET_POLYGON,
			gasPrice: 65000000000,
			timeout: 100000,
			accounts: {
				mnemonic:process.env.MNEMONIC,
				count:parseInt(`${process.env.ACCOUNTS}`)
			}
		},
		mumbai: {
			chainId: 80001,
			url:process.env.URL_TESTNET_POLYGON,
			gasPrice: 65000000000,
			timeout: 100000,
			accounts: {
				mnemonic:process.env.MNEMONIC,
				count:parseInt(`${process.env.ACCOUNTS}`)
			}
		},
		bsc_mainnet: {
			chainId: 56,
			url: process.env.URL_MAINNET_BSC,
			gasPrice: 20000000000,
			timeout: 100000,
			accounts: {
				mnemonic:process.env.MNEMONIC
			}
		},
		bsc_testnet: {
			chainId: 0x61,
			url: process.env.URL_TESTNET_BSC,
			gasPrice: 20000000000,
			timeout: 100000,
			accounts: {
				mnemonic:process.env.MNEMONIC,
				count:parseInt(`${process.env.ACCOUNTS}`)
			}
		},
		localhost: {
			url: "http://127.0.0.1:8545",
			gasPrice: 35000000000,
			blockGasLimit: 149000000
		},
		hardhat: {
			gasPrice: 35000000000,
			blockGasLimit: 149000000,
			chainId: 31337,
			initialBaseFeePerGas: 0,
			accounts: {
				mnemonic:process.env.MNEMONIC,
				count:parseInt(`${process.env.ACCOUNTS}`)
			}
		}
	},
	solidity: {
		version: "0.8.4",
		settings: {
			optimizer: {
				enabled: true,
				runs: 500
			},
		},
		allowUnlimitedContractSize: true,
	},
	paths: {
		sources: "./contracts",
		tests: "./test",
		cache: "./cache",
		artifacts: "./artifacts"
	},
	mocha: {
		timeout: 20000
	},
	gasReporter: {
		currency: 'USD',
		gasPrice: 35,
		coinmarketcap: process.env.COINMARKETCAP_API_KEY,
		maxMethodDiff: 10,
		excludeContracts: ['ERC20Token.sol']
	},
	contractSizer: {
		alphaSort: true,
		runOnCompile: true,
		disambiguatePaths: false,
	},
	etherscan: {
		// Your API key for Etherscan
		// Obtain one at https://etherscan.io/
		//apiKey: process.env.ETHERSCAN_API_KEY
		apiKey: process.env.BSCSCAN_API_KEY
		//apiKey: process.env.POLYGON_API_KEY
		// apiKey: {
		// 	polygonMumbai: process.env.POLYGON_API_KEY,
		// 	goerli: process.env.ETHERSCAN_API_KEY
		//   }
		  //,
		  //customChains: [
			// {
			//   network: "goerli",
			//   chainId: 5,
			//   urls: {
			// 	apiURL: "https://api-goerli.etherscan.io/api",
			// 	browserURL: "https://goerli.etherscan.io"
			//   }
			// },
		// 	{
		// 		network: "polygonMumbai",
		// 		chainId: 80001,
		// 		urls: {
		// 		  apiURL: "https://api-testnet.polygonscan.com",
		// 		  browserURL: "https://mumbai.polygonscan.com"
		// 		}
		// 	  }
		//   ]
	},
	spdxLicenseIdentifier: {
		overwrite: true,
		runOnCompile: true,
	},
	abiExporter: {
		path: './data/abi',
		clear: true,
		flat: true,
		only: [],
		spacing: 2
	}
};
