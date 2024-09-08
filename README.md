# Eth-Operations
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


# RootStock

Our RootStock integration is a key component of the Work Order Management DApp module, which includes a ZK Attestation Verifier with Schema Hooks using Sign Protocol’s Schema Hooks. This allows builders to extend the core attestation protocol via the RootStock Starter Kit.

We are also utilizing Lit Protocol to securely encrypt key identity documents in India, such as Aadhaar (national ID), PAN (taxation card), driving licenses, and passports. The encryption ensures secure document handling during user registration, with decryption occurring after wallet signing using Lit protocol through the RootStock Starter Kit.

Please visit demo video with RootStock implementation at https://drive.google.com/drive/u/1/folders/1CLTBAA7UJuLCt5TzDGDY94reiWPCX4an

As the leading and oldest Bitcoin Layer 2 blockchain, RootStock is fully EVM-compatible, enabling seamless integration of Ethereum's scalability and programmability.



