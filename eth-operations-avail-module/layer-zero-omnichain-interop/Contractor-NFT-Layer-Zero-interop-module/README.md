
The Eth Operations DApp uses the Layer Zero protocol to enable omnichain interoperability, allowing seamless communication and transfer of assets between different blockchain networks. This ensures efficient data exchange and cross-chain functionality, enhancing the DApp's ability to interact across multiple ecosystems while providing a smooth user experience.

Layer Zero transaction (NFT): Tx-Layer zero : https://testnet.layerzeroscan.com/tx/0x85f022619a4772a3e5da0ecc26d56b7cc40aa2accd2424e10d6428b7ee4cd883

Layer Zero Transaction hash: https://testnet.layerzeroscan.com/tx/0xb197ee7bad22ba4eec1c4094e844ec8dc7b177f120cc3afe2a555682f607b9e9

We are extending Simple LayerZero ONFT V2 implementation.

This implementation is built based on a particular by default connected pathway on testnet which is:
Sepolia <-> Arbitrum Sepolia

- ONFT NAME: FLASH
- ONFT SYMBOL: FLS
- ONFT SUPPLY: 100


# Technical requirements (tested on):
- Node.js v18.9
- Hardhat v2.17.0
- Hardhat toolbox v2.0.2


# Required configuration:
- Fill .env local file with 3 fields:
    + PK: private key of a wallet funded with ETH in Sepolia and Arbitrum Sepolia/
    + SEPOLIA_RPC: sepolia rpc url.
    + ARBITRUM_SEPOLIA_RPC: arbitrum sepolia rpc url.
- Run `npm i` to install node packages.


# Steps to use:

## First step: DEPLOYMENT EXECUTION
- run: `npx hardhat run scripts/onft.js --network sepolia` and collect deployment address from terminal.
- then: - run: `npx hardhat run scripts/onft.js --network arbsepolia` and collect deployment address from terminal.


## Second step: DEPLOYMENT CONFIGURATION
- not needed yet as i given the deployed addresses 
- In onft.js, fill LZ_CONFIG sepolia and arbitrum 'deployment' field with previously collected corresponding addresses.


## Third step: SETTING PEERS
- In onft.js, comment line `await deploy();`.
- Then uncomment: `const flashInstance = await getFlashInstance();` and `await trustEachOther(flashInstance);` .
- Save and run:
    + `npx hardhat run scripts/onft.js --network sepolia`
    + `npx hardhat run scripts/onft.js --network arbsepolia`

## Fourth step: SETTING ENFORCED OPTIONS
- In onft.js, comment line `await trustEachOther(flashInstance);`.
- Then uncomment: `await configureItGlobally(flashInstance);` .
- Save and run:
    + `npx hardhat run scripts/onft.js --network sepolia`
    + `npx hardhat run scripts/onft.js --network arbsepolia`

## Fifth step: SENDING CROSS CHAIN
- In onft.js, comment line `await configureItGlobally(flashInstance);`.
- Then uncomment: `await sendFlash(flashInstance, TOKEN_ID_TO_BE_SENT);`.
- In onft.js, change line: `const TOKEN_ID_TO_BE_SENT = 0;` with the token ID you want to send.
- change it to 1 instead of 0 as i tested on zero.
- Make sure the token ID you configured exists on the local chain (has been minted).
- Save and run:
    + To send ONFT from Sepolia -> ARB Sepolia: `npx hardhat run scripts/onft.js --network sepolia`
    + To send ONFT from ARB Sepolia -> Sepolia: `npx hardhat run scripts/onft.js --network arbsepolia`
- You're finally done!
 
