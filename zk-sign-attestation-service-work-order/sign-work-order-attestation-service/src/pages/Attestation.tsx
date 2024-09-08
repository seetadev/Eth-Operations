import React, { useState } from 'react';
import { ChevronDown, Plus, X } from 'lucide-react';
import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";

type DataType = 'uint256' | 'int256' | 'string' | 'boolean' | 'address';

interface Field {
  name: string;
  type: DataType;
}

interface SchemaField {
  name: string;
  type: string;
}

// Ensure the private key is prefixed with '0x' and is exactly 32 bytes (64 characters) long
const privateKey = "0xf03a4913efdd40406794c10b549d9e4ebc56ca2bf60e551ad75658bb5fff3d1c";
const account = privateKeyToAccount(privateKey);
const client = new SignProtocolClient(SpMode.OnChain, {
  chain: EvmChains.polygonAmoy,
  account: account,
});

const FieldAdder: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [fieldName, setFieldName] = useState<string>('');
  const [dataType, setDataType] = useState<DataType>('uint256');
  const [schemaId, setSchemaId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedSchema, setFetchedSchema] = useState<SchemaField[] | null>(null);
  const [attestationData, setAttestationData] = useState<Record<string, string>>({});

  const dataTypes: DataType[] = ['uint256', 'int256', 'string', 'boolean', 'address'];

  const addField = (): void => {
    if (fieldName.trim()) {
      setFields([...fields, { name: fieldName, type: dataType }]);
      setFieldName('');
      setDataType('uint256');
    }
  };

  const removeField = (index: number): void => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const createSchema = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await client.createSchema({
        name: "SDK Test",
        // @ts-ignore
        data: fields,
      });
      console.log("Schema created:", res);
      setSchemaId(res.schemaId);
    } catch (error) {
      console.error("Error creating schema:", error);
      setError("Failed to create schema. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSchema = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const schema = await client.getSchema(schemaId);
    //   @ts-ignore
      setFetchedSchema(schema.data);
      setAttestationData({});
    } catch (error) {
      console.error("Error fetching schema:", error);
      setError("Failed to fetch schema. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setAttestationData(prev => ({ ...prev, [name]: value }));
  };

  const createAttestation = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await client.createAttestation({
        schemaId: schemaId,
        data: attestationData,
        indexingValue: attestationData.signer ? attestationData.signer.toLowerCase() : ''
      });
      console.log("Attestation created:", res);
      setError("Attestation created successfully!");
    } catch (error) {
      console.error("Error creating attestation:", error);
      setError("Failed to create attestation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      {/* Field addition section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Add Fields to Schema</h2>
        {fields.map((field, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded-md mb-2">
            <span className="text-white">
              {field.name}: {field.type}
            </span>
            <button onClick={() => removeField(index)} className="text-red-500 hover:text-red-700">
              <X size={16} />
            </button>
          </div>
        ))}

        <div className="flex items-center space-x-2 mt-4">
          <input
            type="text"
            placeholder="Field Name"
            value={fieldName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldName(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
          />
          <div className="relative">
            <select
              value={dataType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDataType(e.target.value as DataType)}
              className="bg-gray-700 text-white px-3 py-2 pr-8 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {dataTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" size={16} />
          </div>
        </div>
        
        <button 
          onClick={addField}
          className="mt-4 flex items-center space-x-2 text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
        >
          <Plus size={16} />
          <span>Add Field</span>
        </button>

        <button 
          onClick={createSchema}
          disabled={isLoading || fields.length === 0}
          className={`mt-4 w-full text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 ${
            isLoading || fields.length === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isLoading ? 'Creating Schema...' : 'Create Schema'}
        </button>
      </div>

      {/* Schema fetching and attestation creation section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-white mb-4">Create Attestation</h2>
        <input
          type="text"
          placeholder="Enter Schema ID"
          value={schemaId}
          onChange={(e) => setSchemaId(e.target.value)}
          className="w-full bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button 
          onClick={fetchSchema}
          disabled={isLoading || !schemaId}
          className={`w-full text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 mb-4 ${
            isLoading || !schemaId ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Fetching Schema...' : 'Fetch Schema'}
        </button>

        {fetchedSchema && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">Schema Fields:</h3>
            {fetchedSchema.map((field, index) => (
              <div key={index} className="mb-2">
                <label className="block text-sm font-medium text-gray-300">{field.name}</label>
                <input
                  type="text"
                  placeholder={`Enter ${field.name}`}
                  value={attestationData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        )}

        {fetchedSchema && (
          <button 
            onClick={createAttestation}
            disabled={isLoading || Object.keys(attestationData).length === 0}
            className={`w-full text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 ${
              isLoading || Object.keys(attestationData).length === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isLoading ? 'Creating Attestation...' : 'Create Attestation'}
          </button>
        )}
      </div>

      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default FieldAdder;