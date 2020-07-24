const _ = require('lodash');
const util = require('util');
const en = require('./en');
const source = require('./srouce.en.jon'); // get last of en.json in i18 (crowdin)
const sourcejs = require('./srouce.en.jss'); // get last of en.js in lang folder
const { promises } = require('fs');
const fs = require('fs');

const result = {};

for(key of Object.keys(en)){
	if(source[key])
		result[key] = source[key];
  else if(sourcejs[key])
    result[key] = sourcejs[key];
  else 
    result[key] = en[key];
}

const dataString = util.inspect(result, false, 1000, false)

promises.writeFile('en.js', `const result =  ${dataString}; \n module.exports = result;`, function(err) {
  if(err) console.lo(err);
  console.log('writeFile source done!')
});	