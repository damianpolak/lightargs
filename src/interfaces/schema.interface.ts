/**
 * Arguments app.exe file1.txt file2.txt file3.txt
 * Options app.exe --count=5 --index 2 --views 3
 * Flags --verbose --silent
 */

export interface Schema {
  appName: string,
  appTitle: string,
  appEntry: string,
  appDescription?: string,
  data: {
    arguments: Argument[],
    options: Option[],
    flags: Flag[]
  }
}

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
  value: string | number | boolean,
  validation: Validate
}

export interface Option {
  id: string,
  cliName: string | string[],
  type: FlagType | string,
  equal?: boolean,
  validation?: Validate
}

export interface Flag {
  id: string,
  cliName: string,
  type: FlagType | string,
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