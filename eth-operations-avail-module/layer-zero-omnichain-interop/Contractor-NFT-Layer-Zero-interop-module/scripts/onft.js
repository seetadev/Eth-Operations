const {ethers, network} = require("hardhat");
const {Options} = require("@layerzerolabs/lz-v2-utilities");


const MAX_SUPPLY = 100;
const LZ_CONFIG = {
  "sepolia": {
    "endpoint": "0x6EDCE65403992e310A62460808c4b910D972f10f",
    "eid": 40161,
    "startIndex": 0,
    "deployment": "0x084a1d51B9f904f8d9a8a98aC5D49F38Ec08d313"
  },
  "arbsepolia": {
    "endpoint": "0x6EDCE65403992e310A62460808c4b910D972f10f",
    "eid": 40231,
    "startIndex": 50,
    "deployment": "0xF96De61Ad9E3d7213CA2723D2357325283d1d195"
  }
}




const TOKEN_ID_TO_BE_SENT = 0;





const filterCurrentNetwork = () => {

const otherNetwork = Object.keys(LZ_CONFIG).filter(key => key != network.name)[0];

  return LZ_CONFIG[otherNetwork];
}

const deploy = async () => {

  console.log(`Deploying on ${network.name}`);

  const flash = await ethers.deployContract(
                                            "Flash", 
                                            [
                                              LZ_CONFIG[network.name].endpoint, 
                                              MAX_SUPPLY / 2,
                                              LZ_CONFIG[network.name].startIndex
                                            ]
                                          );

  await flash.deployed();

  console.log(`Flash contract deployed on ${network.name} at: ${flash.address}`);
}

const trustEachOther = async (flashInstance) => {
  try {
    console.log("Getting other network info..");
    const otherNetwork = filterCurrentNetwork();
    console.log("Other network info:", otherNetwork.endpoint);

    if (!otherNetwork || !otherNetwork.eid) {
      throw new Error("Invalid otherNetwork object");
    }

    console.log(`Applying set peers on ${network.name}`);
    
    if (otherNetwork.deployment === '') {
      throw new Error("otherNetwork.deployment is empty");
    }

    const paddedDeployment = ethers.utils.zeroPad(
      ethers.utils.arrayify(otherNetwork.deployment),
      32
    );

    const receipt = await flashInstance.setPeer(otherNetwork.eid, paddedDeployment);
    console.log("Peer set!", receipt);
  } catch (error) {
    console.error("Error in trustEachOther:", error);
    throw error;
  }
}



const configureItGlobally = async (flashInstance) => {

  console.log("Getting other network info..");
  const otherNetwork = filterCurrentNetwork();

  console.log("Building enforced options struct..");
  const enforcedOptions = craftEnforcedOptions(otherNetwork.eid);

  console.log("thise are enforced options",enforcedOptions);
  console.log(`Configuring flash contract on ${network}`);
  const txResp = await flashInstance.setEnforcedOptions(enforcedOptions);
  await txResp.wait();
  
  console.log("Configuration set!");

}

const craftEnforcedOptions = (_eid) => {

  const GAS_LIMIT = 1000000; // Gas limit for the executor
  const MSG_VALUE = 0; // msg.value for the lzReceive() function on destination in wei

  const _options = Options.newOptions().addExecutorLzReceiveOption(GAS_LIMIT, MSG_VALUE);
  return [[
    _eid,
    1,
    _options.toHex()
  ]];

}

const quoteIt = async (flashInstance, _tokenID) => {
  const signer = (await ethers.getSigners())[0];

  console.log("Getting other network info..");
  const otherNetwork = filterCurrentNetwork();

  console.log("Estimating how much it would cost to send a Flash token..");
  
  const sendParams = [
    otherNetwork.eid,
    ethers.utils.hexZeroPad(
      signer.address, 
      32
    ),
    _tokenID,
    "0x",
    "0x",
    "0x"
  ];
  console.log(sendParams);

  const quote = await flashInstance.quoteSend(sendParams, false);
  console.log(`Quote result: ${ethers.utils.formatEther(quote.nativeFee)} ETH`);

  return {sp: sendParams, fee: quote.nativeFee};

}

const getFlashInstance = async () => {
  console.log(`Connecting with flash instance at ${LZ_CONFIG[network.name].deployment} on ${network.name}`);
  return await ethers.getContractAt("Flash", LZ_CONFIG[network.name].deployment);
}

const sendFlash = async (flashInstance, _tokenID) => {
  const signer = (await ethers.getSigners())[0];

  console.log(`Approving Flash token with id ${_tokenID} to be transfered..`);
  const abi = new ethers.utils.AbiCoder();
  const data = abi.encode(["address", "uint"], [LZ_CONFIG[network.name].deployment, _tokenID]).slice(2);
  const sigHash = ethers.utils.id("approve(address,uint256)").slice(0, 10);
  const approvalReceipt = await signer.sendTransaction({to: LZ_CONFIG[network.name].deployment, data: sigHash + data});
  await approvalReceipt.wait(2);

  console.log("Quoting for send call..");
  const quote = await quoteIt(flashInstance, _tokenID);

  const txResp = await flashInstance.send(quote.sp, [quote.fee, 0], signer.address, {value: quote.fee});
  await txResp.wait(2);

  console.log(`Sent from ${network.name} with tx hash: ${txResp.hash} !`);

}

async function main() {

  // DEPLOYING
  // await deploy();

  const flashInstance = await getFlashInstance();

  // SETTING PEERS
  // await trustEachOther(flashInstance);

  // SETTING ENFORCED OPTIONS
  // await configureItGlobally(flashInstance);

  // SENDING 
  await sendFlash(flashInstance, 0);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
