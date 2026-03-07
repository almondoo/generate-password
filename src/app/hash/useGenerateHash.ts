import { useState } from 'react';
import { generateHash, HashInputs } from './generateHash';

export default function useGenerateHash() {
  const [generatedHashes, setGeneratedHashes] = useState<string[]>([]);

  const handleGenerate = async (inputs: HashInputs) => {
    const result = await generateHash(inputs);
    setGeneratedHashes([result]);
  };

  return {
    generatedHashes,
    handleGenerate,
  };
}
