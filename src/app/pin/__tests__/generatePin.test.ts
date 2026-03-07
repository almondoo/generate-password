import { describe, it, expect } from 'vitest';
import { generatePin, generatePins, PinInputs } from '../generatePin';

describe('generatePin', () => {
  it('指定した桁数のPINを生成する', () => {
    const pin = generatePin(6);
    expect(pin).toHaveLength(6);
  });

  it('数字のみで構成される', () => {
    const pin = generatePin(10);
    expect(pin).toMatch(/^\d+$/);
  });

  it('1桁のPINを生成できる', () => {
    const pin = generatePin(1);
    expect(pin).toHaveLength(1);
    expect(pin).toMatch(/^\d$/);
  });

  it('20桁のPINを生成できる', () => {
    const pin = generatePin(20);
    expect(pin).toHaveLength(20);
    expect(pin).toMatch(/^\d{20}$/);
  });
});

describe('generatePins', () => {
  it('指定した数のPINを生成する', () => {
    const inputs: PinInputs = { length: 4, generatedNumber: 5 };
    const pins = generatePins(inputs);
    expect(pins).toHaveLength(5);
    pins.forEach((pin) => {
      expect(pin).toHaveLength(4);
      expect(pin).toMatch(/^\d+$/);
    });
  });
});
