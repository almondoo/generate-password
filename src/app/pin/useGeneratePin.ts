import { useState } from 'react';
import { generatePins, PinInputs } from './generatePin';

export default function useGeneratePin() {
  const [generatedPins, setGeneratedPins] = useState<string[]>([]);

  const handleGenerate = (inputs: PinInputs) => {
    setGeneratedPins(generatePins(inputs));
  };

  return {
    generatedPins,
    handleGenerate,
  };
}
