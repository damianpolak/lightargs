import { describe, it, expect } from 'vitest';
import { SchemaBuilder } from '../src/schema-builder.class';

describe('Schema builder class', () => {
  const emptyData = {
    data: {
      options: [],
      flags: [],
      arguments: []
    }
  }

  it('checks construct and getSchema()', () => {
    const schema_1 = new SchemaBuilder('My app', 'This is my app', 'myapp.js');
    expect(schema_1.getSchema()).toStrictEqual({
      appName: 'My app',
      appTitle: 'This is my app',
      appEntry: 'myapp.js',
      appDescription: '',
      ...emptyData
    })

    const schema_2 = new SchemaBuilder('My app2', 'This is my app2', 'myapp2.js', 'This is example description of my app2');
    expect(schema_2.getSchema()).toStrictEqual({
      appName: 'My app2',
      appTitle: 'This is my app2',
      appEntry: 'myapp2.js',
      appDescription: 'This is example description of my app2',
      ...emptyData
    })

    // const schema_3 = new SchemaBuilder('Unit converter', 'Application for convert units', 'units.js')
    // .addOption({
    //   id: 'secToMs',
    //   cliName: 'sec-to-ms'
    // })
  })
})