import { useState } from 'react';
import { generatePasswords, PasswordInputs } from './generatePassword';

export default function useGeneratePassword() {
  const [generatedPasswords, setGeneratedPasswords] = useState<string[]>([]);

  const handleGenerate = (inputs: PasswordInputs) => {
    setGeneratedPasswords(generatePasswords(inputs));
  };

  return {
    generatedPasswords,
    handleGenerate,
  };
}
