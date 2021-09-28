/**
 * Example of usage
 */

const lightargs = require('../index');

const schema = [
  { 
    appName: 'port-scanner',
    title: 'simple port scanner',
    description: 'The application allows you to scan ports of a remote host',
    version: '2.3.1'
  },
  {
    ip: {
      description: 'This is address IP',
      name: 'ip_address',
      type: 'string',
      default: '127.0.0.1',
      required: false,
      alias: 'i|I'
    }
  },
  {
    port: {
      description: 'Port port port',
      name: 'port',
      type: 'number',
      default: 80,
      required: false,
      alias: 'p|P'
    }
  },
  {
    view: {
      description: 'View level',
      name: 'view_level',
      type: 'number',
      default: 1,
      required: false
    }
  },
  {
    entry: {
      description: 'Entry point',
      name: 'entry_point',
      type: 'string',
      default: 'testtest',
      required: false
    }
  },
  {
    ms: {
      description: 'Timeout in miliseconds',
      name: 'timeout_ms',
      type: 'number',
      default: 1000,
      required: true
    }
  },
  {
    m: {
      description: 'Minimized at start',
      name: 'minimized',
      type: 'boolean',
      default: true,
      required: false
    }
  }
];

lightargs.setSchema(schema);
lightargs.setArgv(process.argv);


try {
  console.log(lightargs.run());
} 
catch(e) {
  console.error(e);

}






