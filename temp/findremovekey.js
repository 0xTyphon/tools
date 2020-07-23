const newSource = require('./en'); // get last of en.json in i18 (crowdin)
const oldSource = require('./en.full'); // get last of en.js in lang folder
const _ = require('lodash');
const util = require('util');
const { promises } = require('fs');

let results = {};

Object.keys(oldSource).forEach(key => {
    if(!newSource[key]) {
        results[key] = oldSource[key];
    }
});

dataString = util.inspect(results, false, 1000, false);
promises.writeFile('remove.key.en.js', `const result =  ${dataString}; \n module.exports = result;`, function(err) {
    if(err) console.lo(err);
    console.log('writeFile source done!')
});