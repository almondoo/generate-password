import { describe, expect, it } from 'vitest';
import { convertAllCases } from '../convertCase';

describe('convertAllCases', () => {
  it('スペース区切りの文字列を変換する', () => {
    const result = convertAllCases('hello world');
    expect(result.camelCase).toBe('helloWorld');
    expect(result.pascalCase).toBe('HelloWorld');
    expect(result.snakeCase).toBe('hello_world');
    expect(result.upperSnakeCase).toBe('HELLO_WORLD');
    expect(result.kebabCase).toBe('hello-world');
  });

  it('camelCaseの入力を変換する', () => {
    const result = convertAllCases('helloWorld');
    expect(result.snakeCase).toBe('hello_world');
    expect(result.kebabCase).toBe('hello-world');
    expect(result.pascalCase).toBe('HelloWorld');
  });

  it('snake_caseの入力を変換する', () => {
    const result = convertAllCases('hello_world_test');
    expect(result.camelCase).toBe('helloWorldTest');
    expect(result.pascalCase).toBe('HelloWorldTest');
    expect(result.kebabCase).toBe('hello-world-test');
  });

  it('kebab-caseの入力を変換する', () => {
    const result = convertAllCases('hello-world');
    expect(result.camelCase).toBe('helloWorld');
    expect(result.snakeCase).toBe('hello_world');
  });

  it('空文字列を処理する', () => {
    const result = convertAllCases('');
    expect(result.camelCase).toBe('');
    expect(result.pascalCase).toBe('');
    expect(result.snakeCase).toBe('');
    expect(result.upperSnakeCase).toBe('');
    expect(result.kebabCase).toBe('');
  });

  it('単一の単語を変換する', () => {
    const result = convertAllCases('hello');
    expect(result.camelCase).toBe('hello');
    expect(result.pascalCase).toBe('Hello');
    expect(result.upperSnakeCase).toBe('HELLO');
  });
});
