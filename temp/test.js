const util = require('util');
const _ = require('lodash');


const s = {
}

_.setWith(s, 'a.b.1.0', 'hello', Object);	


console.log(util.inspect(s, { showHidden: false, depth: 1000 }));
