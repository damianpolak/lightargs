import { describe, it, expect } from 'vitest';
import { Patterns } from '../src/patterns.class';

describe('Regex patterns', () => {
  it('checks string is argument', () => {
    expect(Patterns.isArgument('file1.txt')).toEqual(true);
    expect(Patterns.isArgument('f-ile2.txt')).toEqual(true);
    expect(Patterns.isArgument('+_f-ile3.txt--')).toEqual(true);
    expect(Patterns.isArgument('-file4.txt')).toEqual(false);
    expect(Patterns.isArgument('--file5.txt')).toEqual(false);
    expect(Patterns.isArgument('500')).toEqual(true);
    expect(Patterns.isArgument('one')).toEqual(true);
    expect(Patterns.isArgument('two')).toEqual(true);
  })

  it('checks string is normal flag', () => {
    expect(Patterns.isFlag('-version')).toEqual(true);
    expect(Patterns.isFlag('--version')).toEqual(true);
    expect(Patterns.isFlag('output-path')).toEqual(false);
    expect(Patterns.isFlag('--output-path')).toEqual(true);
    expect(Patterns.isFlag('--output-path-')).toEqual(false);
    expect(Patterns.isFlag('--output-path+(')).toEqual(false);
    expect(Patterns.isFlag('--output-path=')).toEqual(false);
    expect(Patterns.isFlag('--output-path=C:\log.txt')).toEqual(false);
  })

  it('checks string is flag with equal', () => {
    expect(Patterns.isFlagEq('-version')).toEqual(false);
    expect(Patterns.isFlagEq('--version')).toEqual(false);
    expect(Patterns.isFlagEq('--output-path')).toEqual(false);
    expect(Patterns.isFlagEq('--output-path-')).toEqual(false);
    expect(Patterns.isFlagEq('--output-path+(')).toEqual(false);
    expect(Patterns.isFlagEq('--output-path=C:\log.txt')).toEqual(true);
    expect(Patterns.isFlagEq('--time==60')).toEqual(true);
    expect(Patterns.isFlagEq('--time= 60')).toEqual(false);
  })
});

describe('Just checks couple of args', () => {
  it('checks some arg from CLI is just flag', () => {
    expect(Patterns.isJustFlag('file', 'log.txt')).toEqual(false);
    expect(Patterns.isJustFlag('-f', 'log.txt')).toEqual(false);
    expect(Patterns.isJustFlag('--file', 'log.txt')).toEqual(false);
    expect(Patterns.isJustFlag('--version', '--time=50')).toEqual(true);
    expect(Patterns.isJustFlag('--version', null)).toEqual(true);
    expect(Patterns.isJustFlag('--version', undefined)).toEqual(true);
  })

  it('checks some arg is option', () => {
    expect(Patterns.isJustOption('--output', 'log.txt')).toEqual(true);
    expect(Patterns.isJustOption('--input-file', 'log.txt')).toEqual(true);
    expect(Patterns.isJustOption('--input-file=log.txt', 'log.txt')).toEqual(false);
    expect(Patterns.isJustOption('--input-file=log.txt', null)).toEqual(false);
    expect(Patterns.isJustOption('--input-file=log.txt', undefined)).toEqual(false);
    expect(Patterns.isJustOption('log.txt', '--input-file')).toEqual(false);
  })

  it('checks some arg is an option eq', () => {
    expect(Patterns.isJustOptionEq('output', 'log.txt')).toEqual(false);
    expect(Patterns.isJustOptionEq('--file-path', '--input')).toEqual(false);
    expect(Patterns.isJustOptionEq('--file-path=', '--input')).toEqual(false);
    expect(Patterns.isJustOptionEq('--output', 'log.txt')).toEqual(false);
    expect(Patterns.isJustOptionEq('--output=log.txt', 'log.txt')).toEqual(false);
    expect(Patterns.isJustOptionEq('--output=log.txt', '')).toEqual(true);
    expect(Patterns.isJustOptionEq('--output=log.txt', undefined)).toEqual(true);
    expect(Patterns.isJustOptionEq('--output=log.txt', null)).toEqual(true);
    expect(Patterns.isJustOptionEq('--output=log.txt', '--time=50')).toEqual(true);
    expect(Patterns.isJustOptionEq('--output=log.txt', '--test')).toEqual(true);
  })
});