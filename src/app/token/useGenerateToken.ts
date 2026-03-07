import { useState } from 'react';
import { generateTokens, TokenInputs } from './generateToken';

export default function useGenerateToken() {
  const [generatedTokens, setGeneratedTokens] = useState<string[]>([]);

  const handleGenerate = (inputs: TokenInputs) => {
    setGeneratedTokens(generateTokens(inputs));
  };

  return {
    generatedTokens,
    handleGenerate,
  };
}
