import { useState } from 'react';
import { generateUuids, UuidInputs } from './generateUuid';

export default function useGenerateUuid() {
  const [generatedUuids, setGeneratedUuids] = useState<string[]>([]);

  const handleGenerate = (inputs: UuidInputs) => {
    setGeneratedUuids(generateUuids(inputs));
  };

  return {
    generatedUuids,
    handleGenerate,
  };
}
