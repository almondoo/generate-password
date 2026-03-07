import { useState } from 'react';
import { generatePassphrases, PassphraseInputs } from './generatePassphrase';

export default function useGeneratePassphrase() {
  const [generatedPassphrases, setGeneratedPassphrases] = useState<string[]>([]);

  const handleGenerate = (inputs: PassphraseInputs) => {
    setGeneratedPassphrases(generatePassphrases(inputs));
  };

  return {
    generatedPassphrases,
    handleGenerate,
  };
}
