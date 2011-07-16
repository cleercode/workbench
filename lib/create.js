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
 * Config template
 */
function config(srcPath, destPath) {
  return [
    '{'
  , '  "srcPath": "' + srcPath + '",'
  , '  "destPath": "' + destPath + '",'
  , '  "routes": ['
  , '    { '
  , '      "file": "index",'
  , '      "title": "Home",'
  , '      "layout": true'
  , '    }'
  , '  ]'
  , '}'
  ].join('\n');
}


/**
 * Create a template directory at `path`.
 */
var create = module.exports = function(path, srcPath, destPath) {
  mkdir(path, function() {
    write(path + '/config.json', config(srcPath, destPath));
    mkdir(path + '/' + srcPath, function(path) {
      write(path + '/layout.jade', jadeLayout);
      write(path + '/index.jade', jadeIndex);
      mkdir(path + '/style', function(path) {
        write(path + '/style.styl', stylus);
    });
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
    fn && fn(path);
  })
}