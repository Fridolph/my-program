var fs = require('fs')

/**
 * 异步实现readFile
 * @param  {[type]} err   [description]
 * @param  {[type]} data) {             if (err) {    console.error(err);  } else {    console.log(data);  }} [description]
 * @return {[type]}       [description]
 */
/*fs.readFile('readme.txt', 'utf-8', function(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
})
*/

/**
 * 同步实现readFile 不推荐
 * @type {[type]}
 */
/*var data = fs.readFileSync('readme.txt', 'utf-8')
console.log(data);*/