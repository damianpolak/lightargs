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

  public addOption(parameters: Option): this {
    (<Option[]>this._option).push(parameters);
    return this;
  }

  public addFlag(parameters: Flag): this {
    (<Flag[]>this._flag).push(parameters);
    return this;
  }

  public addArgument(parameters: Argument): this {
    (<Argument[]>this._argument).push(parameters);
    return this;
  }

  public getSchema(): Schema {
    return {
      appName: this.appName,
      appTitle: this.appTitle,
      appEntry: this.appEntry,
      appDescription: this.appDescription,
      cli: {
        options: <Option[]>this._option,
        flags: <Flag[]>this._flag,
        arguments: <Argument[]>this._argument
      }
    }
  }
}