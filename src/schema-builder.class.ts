import { Argument, Flag, Option, Schema } from "./interfaces/schema.interface";

export class SchemaBuilder {
  constructor(
    public appName: string, 
    public appTitle: string,
    public appEntry: string,
    public appDescription: string = ''
  ) {}

  private _option?: Option[] = []; 
  private _flag?: Flag[] = []; 
  private _argument?: Argument[] = [];

  public addOption(obj: Option): this {
    (<Option[]>this._option).push(obj);
    return this;
  }

  public addFlag(obj: Flag): this {
    (<Flag[]>this._flag).push(obj);
    return this;
  }

  public addArgument(obj: Argument): this {
    (<Argument[]>this._argument).push(obj);
    return this;
  }

  public getSchema(): Schema {
    return {
      appName: this.appName,
      appTitle: this.appTitle,
      appEntry: this.appEntry,
      appDescription: this.appDescription,
      data: {
        options: <Option[]>this._option,
        flags: <Flag[]>this._flag,
        arguments: <Argument[]>this._argument
      }
    }
  }
}