const source = require('./data.jn');
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

const data = convertLongKeyValues(source);

dataString = util.inspect(data, false, 1000, false);
promises.writeFile('srouce.en.jon.js', `const result =  ${dataString}; \n module.exports = result;`, function(err) {
  if(err) console.lo(err);
  console.log('writeFile source done!')
});