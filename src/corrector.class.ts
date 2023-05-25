import { FlagType } from "./interfaces/schema.interface";
import { Patterns } from "./patterns.class";

export class Corrector {
  constructor() {}

  public static flag(value: string, type: FlagType): string {
    let fixed = this._tailNonDigitCut(value.toLowerCase().replace(Patterns.P_SCHEMA_FLAG_NAME_REPLACE, '-'));
    return type === FlagType.long ? (fixed[0] === '-' ? `-${fixed}` : `--${fixed}`) : (fixed[0] === '-' ? fixed : `-${fixed}`);
  }

  private static _tailNonDigitCut(value: string): string {
    if(value[value.length - 1].match(/\W+/g)) {
      return this._tailNonDigitCut(value.slice(0, value.length - 1));
    }
    return value;
  }
}