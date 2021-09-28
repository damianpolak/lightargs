/**
 * Lightargs helps build command 
 * line arguments in your application.
 * @author Damian Polak <damianpolak.it@gmail.com>
 */

class LightargsError extends Error {
  constructor(msg, code) {
    super(msg);
    this.name = 'LightargsError';
    this.code = code;

    Object.setPrototypeOf(this, LightargsError.prototype);
  }
}

class Lightargs {
  #schema = [];
  #argv = [];

  /**
  * Sets the schema to private variable
  * @param {Array.<Object>} schema 
  */
  setSchema(schema) {
    this.#schema = schema;
  }

  /**
  * Sets the argv to private variable
  * @param {Array} argv 
  */
  setArgv(argv) {
    this.#argv = argv.slice(2);
  }

  /**
  * Recognizes flag type
  * (returns '-' or '--')
  * @param {string} flag 
  * @returns {string}
  */
  #flagRecogn(flag) {
    if(flag == 'long') {
      return '--';
    } else if(flag == 'short') {
      return '-';
    }
  }

  /**
  * Returns usage message with all options from schema
  * @returns {string}
  * @access private
  */
  #showUsage() {
    let flagsDesc = ``;

    for(const element of this.#schema) {
      if(typeof element.appName === 'undefined') {
        for(const propFlag in element) {
          flagsDesc += `
          -${propFlag} [${element[propFlag].name}] ${element[propFlag].description} [Default: ${element[propFlag].default}]
          `;
        }
      }
    }
    
    const usage = [];
    usage.push('\n' + this.#schema[0].appName + ' - ' + this.#schema[0].title + '\n\n');
    usage.push('USAGE\n\n');
    usage.push(''.padStart(4) + '$ ' + this.#schema[0].appName + ' --help\n');
    usage.push(''.padStart(4) + '$ ' + this.#schema[0].appName + ' --version\n');
    usage.push(''.padStart(4) + '$ ' + this.#schema[0].appName + ' ');

    let i = 0;
    for(const element of this.#schema) {
      if(typeof element.appName === 'undefined') {
        for(const propFlag in element) {
          if(i != 0 && i % 2 == 0) {
            usage.push('\n' + ''.padStart(7 + this.#schema[0].appName.length));
          }

          if(element[propFlag].flag == 'long') {
            usage.push(`[${this.#flagRecogn(element[propFlag].flag)}${propFlag} ${element[propFlag].name}] `);
          }
          
          if(element[propFlag].flag == 'short') {
            usage.push(`[${this.#flagRecogn(element[propFlag].flag)}${propFlag}] `);
          }
          i++;
        }
      }
    }

    usage.push('\n\n');
    usage.push(''.padStart(4) + this.#schema[0].description + '\n\n');
    usage.push('OPTIONS\n\n');    
    usage.push(''.padStart(4) + '--help' + ''.padStart(20) + 'shows this help message\n\n');
    usage.push(''.padStart(4) + '--version' + ''.padStart(17) + 'displays the current version of app\n\n');

    for(const element of this.#schema) {
      if(typeof element.appName === 'undefined') {
        for(const propFlag in element) {

          usage.push(''.padStart(4) + this.#flagRecogn(element[propFlag].flag) + propFlag);

          if(element[propFlag].flag == 'long') {
            usage.push(''.padStart(20-(propFlag.length-4)));
          }

          if(element[propFlag].flag == 'short') {
            usage.push(''.padStart(20-(propFlag.length-5)));
          }
                      
          usage.push(element[propFlag].description.toLowerCase());

          if(typeof element[propFlag].alias !== 'undefined') {
            const alias = element[propFlag].alias.split('|');
            usage.push(' (also use: ');
            for(const item in alias) {
              usage.push('-' + alias[item] + ' ')
            }
            usage.push(') ');
          }
          usage.push('\n\n');
        }
      }
    }
    return usage.join('');
  };

  /**
  * Parsing schema and argv array
  * @returns {boolean} If passing successfull
  * TODO
  */
  #parseSchema() {
    const schema = this.#schema;

    const requiredHeaderProp = ['appName', 'title', 'description', 'version'];
    const requiredFlagProp = ['name', 'description', 'type', 'default', 'required'];

    if(schema == null || !schema.length > 0) {
      throw new LightargsError(
        'Arguments schema are empty',
        'SCHEMA_IS_EMPTY'
      );
    }

    if(!Array.isArray(schema)) {
      throw new LightargsError(
        'Arguments schema is not an array type',
        'SCHEMA_WRONG_TYPE'
      );
    }

    for(const item of requiredHeaderProp) {
      if(typeof schema[0][item] === 'undefined') {
        throw new LightargsError(
          'the ' + item + ' property is not defined in the schema',
          'SCHEMA_PROP_' + item.toUpperCase().slice(0, 5) + '_IS_NOT_DEF'
        );
      }
    }

    for(const element of schema) {
      if(typeof element.appName === 'undefined') {
        for(const propFlag in element) {
          for(const item of requiredFlagProp) {
            if(typeof element[propFlag][item] === 'undefined') {
              throw new LightargsError(
                'the ' + item + ' property for ' + propFlag + ' flag is not defined in the schema',
                'SCHEMA_PROP_FLAG_' + item.toUpperCase().slice(0, 5) + '_IS_NOT_DEF'
              );
            }
          }

          if(typeof element[propFlag].default !== element[propFlag].type) {
            throw new LightargsError(
              'the default type is not equivalent to type defined in schema for -' + propFlag + ' flag',
              'SCHEMA_PROP_FLAG_' + propFlag.toUpperCase() + '_DEF_TYPE_ERROR'
            );
          }
        }
      }
    }
    
    for(const element of this.#schema) {
      if(typeof element.appName === 'undefined') {
        for(const propFlag in element) {
          if(propFlag.length == 1) {
            element[propFlag].flag = 'short';
          } 

          if(propFlag.length > 1) {
            element[propFlag].flag = 'long';
          }
        }
      }
    }

    return true;
  };

  run() {
    if(this.#parseSchema()) {
      return this.#showUsage();
    }
  };
}

const lightargsInstance = new Lightargs();
lightargsInstance.LightargsError = LightargsError;
module.exports = lightargsInstance;