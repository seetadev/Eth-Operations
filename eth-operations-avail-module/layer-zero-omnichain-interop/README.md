# Omnichain Interoperability using Layer Zero

The Eth Operations DApp uses the Layer Zero protocol to enable omnichain interoperability, allowing seamless communication and transfer of assets between different blockchain networks. This ensures efficient data exchange and cross-chain functionality, enhancing the DApp's ability to interact across multiple ecosystems while providing a smooth user experience.


Layer Zero Transaction hash: https://testnet.layerzeroscan.com/tx/0xb197ee7bad22ba4eec1c4094e844ec8dc7b177f120cc3afe2a555682f607b9e9


## Deploy Setup
1. Add a .env file (to the root project directory) with your MNEMONIC="" and fund your wallet in order to deploy!

## Deploying OFT (V1)

Run the following hardhat commands to deploy OFT to the original 7 chains:
```
npx hardhat deploy --network goerli --tags ExampleOFT
npx hardhat deploy --network bsc-testnet --tags ExampleOFT
npx hardhat deploy --network fuji --tags ExampleOFT
npx hardhat deploy --network mumbai --tags ExampleOFT
npx hardhat deploy --network arbitrum-goerli --tags ExampleOFT
npx hardhat deploy --network optimism-goerli --tags ExampleOFT
npx hardhat deploy --network fantom-testnet --tags ExampleOFT
```
### Wire Up Configuration
Then run the Wire Up Configuration to:
<ul>
    <li>function setTrustedRemote(uint16, bytes)</li>
    <li>function setUseCustomAdapterParams(bool)</li>
    <li>function setMinDstGas(uint16, uint16, uint)</li>
</ul>



```
npx hardhat wireAll --e testnet --config-path "./constants/oftConfig/wireUpConfig.json"
```

### Send OFT accross chains

```
npx hardhat --network fuji oftSend --qty 100000000000000000 --target-network mumbai
```

## Deploying OFTV2

Run the following hardhat commands to deploy OFTV2 to goerli and bsc-testnet:
```
npx hardhat deploy --network goerli --tags ExampleOFTV2
npx hardhat deploy --network bsc-testnet --tags ExampleOFTV2
```

### Wire Up Configuration

Then run the Wire Up Configuration to:
<ul>
    <li>function setTrustedRemote(uint16, bytes)</li>
    <li>function setUseCustomAdapterParams(bool)</li>
    <li>function setMinDstGas(uint16, uint16, uint)</li>
    <li>function setDefaultFeeBp(uint16)</li>
    <li>function setFeeBp(uint16, bool, uint16)</li>
</ul>

```
npx hardhat wireAll --e testnet --config-path "./constants/oftv2Config/wireUpConfig.json"
```

### Send OFTV2 accross chains

```
npx hardhat --network fuji oftv2Send --qty 100000000000000000 --target-network arbitrum-goerli
```

## Deploying OFTWithFee w/ already deployed ERC20 token

Run the following hardhat commands to deploy OFTV2 to goerli and bsc-testnet:
```
npx hardhat deploy --network fuji --tags ExampleProxyOFTWithFee
npx hardhat deploy --network bsc-testnet --tags ExampleOFTWithFee
npx hardhat deploy --network arbitrum-goerli --tags ExampleOFTWithFee
```

### Wire Up Configuration

Then run the Wire Up Configuration to:
<ul>
    <li>function setTrustedRemote(uint16, bytes)</li>
    <li>function setUseCustomAdapterParams(bool)</li>
    <li>function setMinDstGas(uint16, uint16, uint)</li>
    <li>function setDefaultFeeBp(uint16)</li>
    <li>function setFeeBp(uint16, bool, uint16)</li>
</ul>

```
npx hardhat wireAll --e testnet --config-path "./constants/oftWithFeeConfig/wireUpConfig.json"
```


### Send OFTV2 accross chains

```
npx hardhat --network fuji oftv2Send --qty 100000000000000000 --target-network arbitrum-goerli
```


## Lock down UA config

### OFT (V1)
```
npx hardhat setConfig --config-path "./constants/oftConfig/appConfig.json"
```

### OFTV2
```
npx hardhat setConfig --config-path "./constants/oftv2Config/appConfig.json"
```

### OFTWithFee
```
npx hardhat setConfig --config-path "./constants/oftWithFeeConfig/appConfig.json"
```