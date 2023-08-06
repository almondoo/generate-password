import { Inputs } from '@/app/page';
import { useState } from 'react';

const UPPER_CASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_CASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER = '0123456789';
const SYMBOL = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~';

export default function useGeneratePassword() {
  const [generatedPasswords, setGeneratedPasswords] = useState<string[]>([]);

  const handleGenerate = ({
    level,
    custom,
    symbols,
    length,
    generatedNumber,
  }: Inputs) => {
    // 使用する文字列を使う
    let chars = '';
    if (custom.upperCaseOnly) {
      chars += UPPER_CASE;
    } else if (custom.lowerCaseOnly) {
      chars += LOWER_CASE;
    } else {
      chars += UPPER_CASE + LOWER_CASE;
    }

    if (level === '1') {
    } else if (level === '2') {
      chars += NUMBER;
    } else if (level === '3') {
      chars += NUMBER + SYMBOL;
    } else {
      if (custom.number) {
        chars += NUMBER;
      }
      chars += symbols.join('');
    }

    let passwords: string[] = [];
    for (let i = 0; i < generatedNumber; i++) {
      let password = '';
      for (let j = 0; j < length; j++) {
        let index = Math.floor(Math.random() * chars.length);
        let char = chars[index];
        password += char;
      }

      passwords.push(password);
    }

    setGeneratedPasswords(passwords);
  };

  return {
    generatedPasswords,
    handleGenerate,
  };
}
