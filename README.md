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



