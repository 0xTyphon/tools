const source = require('./srouce.en.jon'); // get last of en.json in i18 (crowdin)
const sourcejs = require('./srouce.en.jss'); // get last of en.json in i18 (crowdin)
const _ = require('lodash');
const util = require('util');
const en = require('./en');
const { promises } = require('fs');
const fs = require('fs');
const readline = require('readline');

const rd = readline.createInterface({
    input: fs.createReadStream('missingKeys.log'),
});

let results = {};

const myRe = /"(((\w+).)+\w+)"/g;

let dataString = '';
		
rd.on('line', async function(line) {
    const keyLine = myRe.exec(line);
    
    //get key form json source
    if(keyLine && source[keyLine[1]]){
      console.log(source[keyLine[1]]);
      results[keyLine[1]] = source[keyLine[1]];
    }  //get key form json source
    else if(keyLine && sourcejs[keyLine[1]]){
      console.log(sourcejs[keyLine[1]]);
      results[keyLine[1]] = sourcejs[keyLine[1]];
    }
    

}).on('close', async function() {
    results = Object.assign({}, en, results);
    dataString = await util.inspect(results, false, 1000, false);
    await promises.writeFile('en.js', `const result =  ${dataString}; \n module.exports = result;`, function(err) {
      if(err) console.lo(err);
      console.log('writeFile source done!')
    });
});