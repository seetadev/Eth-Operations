import { useState } from "react"
import * as LitJsSdk from '@lit-protocol/lit-node-client';
import lighthouse from '@lighthouse-web3/sdk';
import { LitNetwork } from "@lit-protocol/constants";
import { Loader2, Upload, Lock, Unlock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card';
import { ethers } from "ethers"
import toast, { Toaster } from 'react-hot-toast';
import { createSiweMessageWithRecaps, generateAuthSig, LitAbility, LitAccessControlConditionResource } from "@lit-protocol/auth-helpers";

function UploadFile() {
  const [encryptedUri, setEncryptedUri] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [a, seta] = useState(false);
  const [aloading, setaLoading] = useState(false);
  const [bloading, setbLoading] = useState(false);
  const [decrypted , setDecrypted] = useState("");



  // @ts-ignore
  const progressCallback = (progressData) => {
    let percentageDone =
      // @ts-ignore

      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2)
    console.log(percentageDone)
  }
  // @ts-ignore

  const uploadFileToIpfs = async (file) => {
    seta(true)
    // @ts-ignore
    if (file && file[0]) {
      setFile(file[0]);
      // @ts-ignore
      setImagePreview(URL.createObjectURL(file[0]));
    }
    // @ts-ignore
    const output = await lighthouse.upload(file, "77efe3ab.5e69b0128de34b208d9d8e3feac2cdfa", null, progressCallback)
    console.log('File Status:', output)

    setUrl("https://gateway.lighthouse.storage/ipfs/" + output.data.Hash);
    console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash)

    seta(false)

    toast.success("file Uploaded to IPFS", {
      position: "bottom-center"
    });
  }


  const EncryptIpfsUri = async (message: any) => {

    try {
      const accessControlConditions = [
        {
          contractAddress: "",
          standardContractType: "",
          chain: "sepolia",
          method: "eth_getBalance",
          parameters: [":userAddress", "latest"],
          returnValueTest: {
            comparator: ">=",
            value: "1000000000000", // 0.000001 ETH
          },
        },
      ];

      const litNodeClient = new LitJsSdk.LitNodeClient({
        litNetwork: LitNetwork.Cayenne,
      });
      await litNodeClient.connect();

      console.log(litNodeClient);

      console.log("encrypting data...");
      const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
        {
          accessControlConditions,
          dataToEncrypt: message,
        },
        litNodeClient
      );

      let retString = "";
      retString += ciphertext;
      retString += " ";
      retString += dataToEncryptHash;
      retString = retString.toString();

      return retString;

    } catch (e) {
      console.log("this is e", e);
      toast("Failed")
    }


  };

  const EncryptUriHandler = async () => {
    if (url) {
      setaLoading(true);
      const encrypt = await EncryptIpfsUri(url)
      toast.success("File Encrypted")
      setaLoading(false);
      // @ts-ignore
      setEncryptedUri(encrypt);
      console.log("this is ", encrypt);

    } else {
      console.log("uri not found");
    }
  }


  const handleDecrypt = async (stringToDecrypt: string) => {

    

    setbLoading(true);

    const accessControlConditions = [
      {
        contractAddress: "",
        standardContractType: "",
        chain: "sepolia",
        method: "eth_getBalance",
        parameters: [":userAddress", "latest"],
        returnValueTest: {
          comparator: ">=",
          value: "1000000000000", // 0.000001 ETH
        },
      },
    ];
    console.log(stringToDecrypt);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const ethersSigner = provider.getSigner();

    const litNodeClient = new LitJsSdk.LitNodeClient({
      litNetwork: LitNetwork.Cayenne,
    });
    await litNodeClient.connect();

    const [ciphertext, dataToEncryptHash] = stringToDecrypt.split(" ");
    console.log(ciphertext);
    console.log(dataToEncryptHash);

    console.log("decrypting...");

    const accsResourceString = await LitAccessControlConditionResource.generateResourceString(
      accessControlConditions,
      dataToEncryptHash
    );
    console.log(accsResourceString);

    const sessionSigs = await litNodeClient.getSessionSigs({
      chain: "sepolia",
      expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
      resourceAbilityRequests: [
        {
          resource: new LitAccessControlConditionResource(accsResourceString),
          ability: LitAbility.AccessControlConditionDecryption,
        },
      ],
      authNeededCallback: async ({ resourceAbilityRequests, expiration, uri }) => {
        const toSign = await createSiweMessageWithRecaps({
          // @ts-ignore
          uri,
          // @ts-ignore

          expiration,
          // @ts-ignore

          resources: resourceAbilityRequests,
          walletAddress: await ethersSigner.getAddress(),
          nonce: await litNodeClient.getLatestBlockhash(),
          litNodeClient,
        });

        return await generateAuthSig({
          signer: ethersSigner,
          toSign,
        });
      },
    });
    console.log(sessionSigs);

    const decryptRes = await LitJsSdk.decryptToString(
      {
        accessControlConditions,
        ciphertext,
        dataToEncryptHash,
        sessionSigs,
        chain: "sepolia",
      },
      litNodeClient
    );

    console.log("decryptRes:", decryptRes);
    setbLoading(false);
    setDecrypted(decryptRes);
    if (decryptRes) {
      toast.success("File Decrypted")
    }
  };






  return (
    <div className="z-10 flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 space-y-6">
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {
                  a ? <Loader2 className="w-4 h-4 mr-2 animate-spin text-black" /> : <Upload className="w-10 h-10 mb-3 text-gray-400" />
                }
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={(e) => uploadFileToIpfs(e.target.files)} />
            </label>
            <p></p>
          </div>

          <div className="flex justify-center space-x-4">
            <Button onClick={EncryptUriHandler} disabled={!file || aloading || a || encryptedUri}>
              {aloading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Lock className="w-4 h-4 mr-2" />}
              Encrypt
            </Button>
            <Button onClick={() => handleDecrypt(encryptedUri)} disabled={!encryptedUri || bloading}>
              {bloading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Unlock className="w-4 h-4 mr-2" />}
              Decrypt
            </Button>
          </div>

          {
            decrypted && <a className="flex justify-center text-sm p-2 px-2 bg-white/50 font-bold rounded-md shadow cursor-pointer" href={decrypted}>{decrypted}</a>
 
          }

          

          {imagePreview && (
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium text-gray-700">Image Preview:</p>
              <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-lg" />
            </div>
          )}

        </CardContent>
      </Card>
      <Toaster position="bottom-center" />
    </div>
  )
}

export default UploadFile