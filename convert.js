const _ = require('lodash');
const util = require('util');
const en = require('./en');
const fs = require('fs');

const results = {};

for(key of Object.keys(en)){
	_.setWith(results, key, en[key], Object);
}

dataString = util.inspect(results, false, 1000, false)

fs.writeFile('toCopy.en.js', `export default ${dataString};`, function(err) {
  if(err) console.lo(err);
  console.log('writeFile source done!')
});	