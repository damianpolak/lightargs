import { SchemaBuilder } from "./schema-builder.class";

const schema = new SchemaBuilder('My app', 'This is test application', 'myapp.js').addOption({
  id: 'input_data',
  type: 'long',
  cliName: 'input-data',
  equal: false,
}).addFlag({
  id: 'switch',
  type: 'long',
  cliName: 'switch'
}).addFlag({
  id: 'lolopt',
  type: 'short',
  cliName: 'lol'
})

console.log(`=== schema`, schema.getSchema());
