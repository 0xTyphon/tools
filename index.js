const source = require('./srouce');
const _ = require('lodash');
const util = require('util');
const en = require('./en');
const { promises } = require('fs');
const fs = require('fs');
const readline = require('readline');

const recursiveFun = (results, obj, arr = []) => {
  if (typeof obj === 'string') {
    return;
  }
  // eslint-disable-next-line
  for (const keyName of Object.keys(obj)) {
    if (typeof obj[keyName] === 'string') {
      const addKey = {};
      const getKeyName = arr.length === 0 ? keyName : `${arr.join('.')}.${keyName}`;
      addKey[getKeyName] = obj[keyName];
      // eslint-disable-next-line
      results[getKeyName] = obj[keyName];
    } else {
      recursiveFun(results, obj[keyName], arr.concat(keyName));
    }
  }
};

const convertLongKeyValues = (obj) => {
  const endKeyValue = {};
  recursiveFun(endKeyValue, obj);
  return endKeyValue;
};


const rd = readline.createInterface({
    input: fs.createReadStream('missingKeys.log'),
    //output: process.stdout,
    //console: false
});

const data = convertLongKeyValues(source);

let results = {};

const myRe = /"(((\w+).)+\w+)"/g;

let dataString = '';
		
rd.on('line', async function(line) {
    const keyLine = myRe.exec(line);
    if(keyLine && data[keyLine[1]]){
      console.log(data[keyLine[1]]);
      results[keyLine[1]] = data[keyLine[1]];
    }
}).on('close', async function() {
    results = {...en,...results};
    dataString = await util.inspect(results, false, 1000, false);
    await promises.writeFile('en.js', `const result =  ${dataString}; \n module.exports = result;`, function(err) {
      if(err) console.lo(err);
      console.log('writeFile source done!')
    });
    // await promises.writeFile('../constant-web/src/lang/messages/en.js', `export default ${dataString};` , function(err) {
    //   if(err) console.lo(err);
    //   console.log('writeFile en.js done!')
    // } );
  });