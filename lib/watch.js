var fs = require('fs')
  , build = require('./build')

/**
 * Watch `srcPath`, compiling changes automatically to `destPath`.
 */
var watch = module.exports = function(srcPath, destPath) {
 var options = { persistent: true, interval: 500 }
 fs.lstat(srcPath, function(err, stat) {
   if (err) throw err;
   if (stat.isFile()) {
     fs.watchFile(srcPath, options, function(curr, prev) {
       if (curr.mtime.getTime() !== prev.mtime.getTime()) {
         build(srcPath, destPath);
       }
     });
   }
   else if (stat.isDirectory()) {
     fs.readdir(srcPath, function(err, files) {
       if (err) throw err;
       files.map(function(filename) {
         return srcPath + '/' + filename;
       }).forEach(watch);
     });
   }
 });
}