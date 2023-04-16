export class Patterns {
  public static PATTERN_ARGUMENT: RegExp = /^[^-]+.*$/;
  public static PATTERN_FLAG_EQ: RegExp = /^[-]+.[a-zA-Z0-9-]+[=]+\S.*$/;
  public static PATTERN_FLAG: RegExp = /^[-]+.[a-zA-Z0-9-]*[^\W]{1}$/;

  public static isArgument(value: string): boolean {
    return value.match(this.PATTERN_ARGUMENT) !== null;
  }

  public static isFlag(value: string): boolean {
    return value.match(this.PATTERN_FLAG) !== null;
  }

  public static isFlagEq(value: string): boolean {
    return value.match(this.PATTERN_FLAG_EQ) !== null;
  }

  public static isJustFlag(arg: string, nextArg: string|undefined|null): boolean {
    if(!this.isFlag(arg)) return false;
    if([undefined,null,''].includes(<any>nextArg)) return true;
    return (this.isFlag(<string>nextArg) || this.isFlagEq(<string>nextArg) && !this.isArgument(<string>nextArg));
  }

  public static isJustOption(arg: string, nextArg: string|undefined|null): boolean {
    if(!this.isFlag(arg) || [undefined,null,''].includes(nextArg)) return false;
    return this.isArgument(<string>nextArg);
  }

  public static isJustOptionEq(arg: string, nextArg: string|undefined|null): boolean {
    if(!this.isFlagEq(arg)) return false;
    if(![undefined,null].includes(<any>nextArg)) {
      if(this.isArgument(<string>nextArg)) return false;
    }
    return true;
  }
}