# Eth GovOps
Developer tools to track and manage incidents, auctions, documentation, workforce, work orders, and inventory on Ethereum. 

# Blockchain

# Lit Protocol

We are using Lit protocol to enable encryption and KYC of key identity documents like Social Security Card, driving license, passport, Aadhar card (national identity card in South Asia), PAN card (South Asian taxation card). We are integrating Lit Protocol's encryption and decryption functionality into Eth Operations dapp module to secure documents during user registration and ensure they are decrypted upon display after wallet signing.

Screencasts, Demos and screenshots at Lit: https://drive.google.com/drive/u/1/folders/1N5icAXouvd0S6YytZY7IxfU86O0KxrIb

Deployed link: https://web3-kyc-lit.vercel.app/

Implementation:

Lit Protocol SDK Integration: Added Lit Protocol SDK to the project dependencies.
Integrated with Lit Protocol and Lit Access Control Condition Resources.
Encryption on User Registration:

Implemented encryption of user documents during registration for both contractors and employers using Lit Protocol.
Ensured secure management of encryption keys.

Decryption for Document Display: Implemented decryption process for displaying documents. Integrated wallet signing to authenticate users and retrieve decryption keys.


# Sign Protocol

The Sign Protocol is employed for work order verification and digital signing. 

We have implemented a ZK Attestation Verifier with Schema Hooks using Sign Protocol's Schema Hooks and ZK Work Order Listing Verifier dapp, enabling builders to extend the core attestation protocol. This feature adds custom Work Order based Solidity logic, which is triggered each time an attestation is created or revoked for Contractor, Work Order and Contract Work schema. The Schema Hooks is utilized for whitelisting Work Order attesters, receiving Work Invoice and payments, and executing Work Order Listing Verifier application logic.

The ZK verification logic has been successfully implemented, ensuring secure and efficient attestations within the DApp.
Implementation Flow: please visit demo at https://drive.google.com/drive/u/1/folders/1IqKk0gP3Rh_tPAN0NfjnO3_Vba4VGRbK

Live link for Sign Protocol’s Schema Hooks: https://web3-medical-incident-tools.vercel.app/

Live Link for ZK Attestation Verifier for Work Order Listings:  https://zk-validate.vercel.app/

Sign Protocol guarantees the authenticity of every document uploaded to the system. Users can create, sign, and verify work orders, contracts, agreements, or any important document directly on the blockchain.


# Chainlink CCIP

The Eth Operations DApp utilizes Chainlink's Cross-Chain Interoperability Protocol (CCIP) to enable seamless communication and data transfer for work orders for 4 personas (contractor, staff, admin and dispatcher) between Ethereum, Optimism, Polygon and key blockchain networks like Avalanche, ensuring that data, assets, and smart contract functions can be securely shared and executed across multiple chains. 

Please visit demo and screenshots at https://drive.google.com/drive/u/1/folders/1z-ltOI2hO4rzQhQsfvKQCVn8tM3szL6-

CCIP transaction hash: https://ccip.chain.link/msg/0x194a610ba3dedbf079f4a2d4d3fa6839c77bde8b85fef2a30952e541e1e1d35a

Source minter address :- 0xC8F3dbe6DA685050A1927d04447F02012a4DFB9C

Destination minter address :- 0xC8F3dbe6DA685050A1927d04447F02012a4DFB9C

NFT : - 0xfb7D6F181c910B9F74cc2e88D1F1197d86774c78

Vercel Link: https://deci-report-x9q7.vercel.app/

CCIP enhances the DApp’s functionality by enabling cross-chain transactions, secure asset transfers, and interoperability with various blockchains, providing a unified and scalable user experience.



# RootStock

Our RootStock integration is a key component of the Work Order Management DApp module, which includes a ZK Attestation Verifier with Schema Hooks using Sign Protocol’s Schema Hooks. This allows builders to extend the core attestation protocol via the RootStock Starter Kit.

We are also utilizing Lit Protocol to securely encrypt key identity documents in India, such as Aadhaar (national ID), PAN (taxation card), driving licenses, and passports. The encryption ensures secure document handling during user registration, with decryption occurring after wallet signing using Lit protocol through the RootStock Starter Kit.

Please visit demo video with RootStock implementation at https://drive.google.com/drive/u/1/folders/1CLTBAA7UJuLCt5TzDGDY94reiWPCX4an

As the leading and oldest Bitcoin Layer 2 blockchain, RootStock is fully EVM-compatible, enabling seamless integration of Ethereum's scalability and programmability.


# Layer Zero

The Eth Operations DApp uses the Layer Zero protocol to enable omnichain interoperability, allowing seamless communication and transfer of assets between different blockchain networks. This ensures efficient data exchange and cross-chain functionality, enhancing the DApp's ability to interact across multiple ecosystems while providing a smooth user experience.

Layer Zero Transaction Hash 1: tps://testnet.layerzeroscan.com/tx/0x85f022619a4772a3e5da0ecc26d56b7cc40aa2accd2424e10d6428b7ee4cd883

Layer Zero Transaction hash 2: https://testnet.layerzeroscan.com/tx/0xb197ee7bad22ba4eec1c4094e844ec8dc7b177f120cc3afe2a555682f607b9e9

Details of implementation at https://drive.google.com/drive/u/1/folders/1-EQEQvChH8HJ5T70eeQTpLUiIvwnYBkD

Github: https://github.com/seetadev/Eth-Operations/tree/main/eth-operations-avail-module/layer-zero-omnichain-interop


# Nethermind

The Eth Operations DApp utilizes Nethermind (Starknet) for secure and scalable medical incident reporting. This integration leverages Starknet's zero-knowledge rollups to ensure efficient, privacy-preserving data handling, allowing for decentralized and tamper-proof reporting within the DApp.

Demo Video (screencasts): https://drive.google.com/drive/u/1/folders/1EB6Fao9D1cc4uFVGXShesSy2rjkgNSvk

Benefits:

Enable hyperlocal medical service and delivery information. 

Enable QR code based blockchain payments at key sites with support for key Ethereum based blockchain platforms. 

Enhance safety through smart incentivization of incident reporting by employees and logistics providers.

Additionally, the Eth Operations DApp uses verified medical incident data to mint NFTs on Voyager, which store an image and related insurance metadata. This process leverages Starknet and Argent Mobile to ensure secure and decentralized storage of medical records in the form of NFTs.


# Avail

Avail’s P2P light client network provides efficient data availability and verification, making it easier to manage work order and government operations while keeping the public billing system decentralized and scalable. 

We are integrating Avail’s Light Client features with the zk Work Order wallet that seamlessly works across key Ethereum L2 Blockchains and leverages Zero Knowledge Proofs for Crypto-transactions and Identity proofs.

Android version at https://github.com/seetadev/Eth-Operations/tree/main/eth-operations-avail-module/avail-work-order-manager

(please download tablet.apk)

Lib integration at https://github.com/seetadev/Eth-Operations/tree/main/eth-operations-avail-module/avail-work-order-manager/android/app

demo, screenshots at https://drive.google.com/drive/u/1/folders/1QOI1elSYw8-RYzFLfMYVcmuseUA5Eqdy

Wish to share our Avail addresses:

[1] 5CMLgLMsgj6kbtXDaHZY19g2FzujSHGRn3oqmh1WEGh3K6hW 

[2] 5Dqyi6FbQBURFDAivKwLPSTkxv3fa4Uj4qfcd7pTe18FmCex  

Avail network optimizes the performance of the platform, ensuring that data is easily retrievable and verifiable. We are also developing custom rollapps with Avail DA and tools to enable no code, low code analytics tooling using an open source analytics and visualization tool, namely Avail XLS, which enables tabulation, organization, collaboration, visualization, graphing and charting.

Link:https://github.com/seetadev/Eth-Operations/tree/main/eth-operations-avail-module/avail-work-order-manager and https://github.com/seetadev/Eth-Operations/tree/main/eth-operations-avail-module/avail-da










