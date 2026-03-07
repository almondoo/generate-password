import { useState } from 'react';
import { generateUlids, UlidInputs } from './generateUlid';

export default function useGenerateUlid() {
  const [generatedUlids, setGeneratedUlids] = useState<string[]>([]);

  const handleGenerate = (inputs: UlidInputs) => {
    setGeneratedUlids(generateUlids(inputs));
  };

  return {
    generatedUlids,
    handleGenerate,
  };
}
