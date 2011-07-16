var fs = require('fs')
  , exec = require('child_process').exec
  , workbench = require('../lib/workbench');

/**
 * Jade layout template
 */
var jadeLayout = [
    '!!!'
  , 'html'
  , '  head'
  , '    title= title'
  , '    link(rel=\'stylesheet\', href=\'stylesheets/style.css\')'
  , '  body!= body'
].join('\n');

/**
 * Jade index template
 */
var jadeIndex = [
    'h1= title'
  , 'p Welcome to #{title}'
].join('\n');

/**
 * Default stylus template
 */
var stylus = [
    'body'
  , '  padding 50px'
  , '  font 14px "Lucida Grande", Helvetica, Arial, sans-serif'
  , 'a'
  , '  color #00B7FF'
].join('\n');

/**
 * Create a template directory at `path`.
 */
var create = module.exports = function(path) {
  mkdir(path, function() {
    write(path + '/layout.jade', jadeLayout);
    write(path + '/index.jade', jadeIndex);
    mkdir(path + '/stylesheets', function() {
      write(path + '/stylesheets/style.styl', stylus);
    });
  });
}

/**
 * Create a file at `path` with contents `str`.
 */
function write(path, str) {
  fs.writeFile(path, str);
  console.log('Created ' + path);
}

/**
 * Create a directory at `path`, executing `fn` as a callback.
 */
function mkdir(path, fn) {
  exec('mkdir -p ' + path, function(err) {
    if (err) throw err;
    console.log('Created ' + path);
    fn && fn();
  })
}