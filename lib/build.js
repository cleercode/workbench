var fs = require('fs')
  , jade = require('jade')
  , stylus = require('stylus')
  , nib = require('nib')

/**
 * Recursively compile Jade and Stylus within `srcPath` to HTML and CSS. 
 */
var build = module.exports = function(srcPath, destPath) {
  fs.lstat(srcPath, function(err, stat) {
    if (err) throw err;
    if (stat.isFile()) {
      if (srcPath.match(/\.jade$/) && !srcPath.match(/layout.jade$/)) {
        compileJade(srcPath, srcPath.replace(/\.jade$/, '.html'));
      }
      else if (srcPath.match(/\.styl$/)) {
        compileStylus(srcPath, srcPath.replace(/\.styl$/, '.css'));
      }
    }
    else if (stat.isDirectory()) {
      fs.readdir(srcPath, function(err, files) {
        if (err) throw err;
        files.map(function(filename) {
          return srcPath + '/' + filename;
        }).forEach(build);
      });
    }
  });
}

/** 
 * Compile Jade in file at `srcPath` to HTML at `destPath`, using layout options.
 */
function compileJade(srcPath, destPath, options) {
  options = options || { locals: { title: 'Workbench' } };
  var layout = options.layout;
  if (layout === true || layout === undefined) {
    jade.renderFile(srcPath, options, function(err, html) {
      if (err) throw err;
      options.locals = options.locals || {};
      options.locals.body = html;
      _compileJade('views/layout.jade', destPath, options);
    });
  }
  else {
    _compileJade(srcPath, destPath, options);
  }
  console.log('Compiled ' + srcPath + ' to ' + destPath);
}

/**
 * Compile Jade in file at `srcPath` to HTML at `destPath`.
 */
function _compileJade(srcPath, destPath, options) {
  jade.renderFile(srcPath, { locals: options.locals }, function(err, html) {
    if (err) throw err;
    fs.writeFile(destPath, html, function(err) {
      if (err) throw err;
    });
  });
}

/**
 * Compile Stylus in file at `destPath` to CSS at `destPath`.
 */
function compileStylus(srcPath, destPath) {
  fs.readFile(srcPath, 'utf8', function(err, str) {
    if (err) throw err;
    stylus(str).include(nib.path).render(function(err, css) {
      fs.writeFile(destPath, css, function(err) {
        if (err) throw err;
        console.log('Compiled ' + srcPath + ' to ' + destPath);
      });
    });
  });
}