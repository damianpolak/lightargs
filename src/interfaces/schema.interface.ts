/**
 * Arguments app.exe file1.txt file2.txt file3.txt
 * Options app.exe --count=5 --index 2 --views 3
 * Flags --verbose --silent
 */

export enum FlagType {
  short = '-',
  long = '--'
}

export enum Validate {
  string = 'string',
  number = 'number',
  boolean = 'boolean'
}

export interface Argument {
  name: string,
  value: string | number | boolean,
  validation: Validate
}

export interface Option {
  type: FlagType | string,
  name: string | string[],
  // value: string | number | boolean,
  equal?: boolean,
  validation?: Validate
}

export interface Flag {
  type: FlagType | string,
  name: string
}

export enum CLIArgType {
  argument = 'argument',
  option = 'option',
  flag = 'flag'
}

export interface CLIArgs {
  app: string,
  args: Array<Argument | Option | Flag>
}