var fs = require('fs')
  , p = require('path')
  , jade = require('jade')
  , stylus = require('stylus')
  , nib = require('nib')

/**
 * Compile a Workbench project.
 */
var build = module.exports = function(path) {
  var cwd = process.cwd();
  var options = {};
  p.exists(path + '/config.json', function(exists) {
    if (exists) {
      fs.readFile(path + '/config.json', 'utf8', function(err, str) {
        if (err) throw err;
        options = JSON.parse(str);
        compile('', options.srcPath, options.destPath);
      });
    }
    else {
      compile('', 'source', 'build');
    }
  })
}

/**
 * Recursively compile Jade and Stylus within `srcPath` to HTML and CSS. 
 */
function compile(filename, srcPath, destPath) {
  var srcFile = srcPath + filename;
  var destFile = destPath + filename;

  fs.lstat(srcFile, function(err, stat) {
    if (err) throw err;
    if (stat.isFile()) {
      if (srcFile.match(/\.jade$/) && !srcFile.match(/layout.jade$/)) {
        compileJade(srcFile, destFile.replace(/\.jade$/, '.html'));
      }
      else if (srcFile.match(/\.styl$/)) {
        compileStylus(srcFile, destFile.replace(/\.styl$/, '.css'));
      }
    }
    else if (stat.isDirectory()) {
      fs.readdir(srcFile, function(err, files) {
        if (err) throw err;
        for (var f in files) {
          compile(filename + '/' + files[f], srcPath, destPath);
        }
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
    jade.renderFile(process.cwd() + '/' + srcPath, options, function(err, html) {
      if (err) throw err;
      options.locals = options.locals || {};
      options.locals.body = html;
      _compileJade('source/layout.jade', destPath, options);
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
  jade.renderFile(process.cwd() + '/' + srcPath, { locals: options.locals }, function(err, html) {
    if (err) throw err;
    fs.writeFile(process.cwd() + '/' + destPath, html, function(err) {
      if (err) throw err;
    });
  });
}

/**
 * Compile Stylus in file at `destPath` to CSS at `destPath`.
 */
function compileStylus(srcPath, destPath) {
  fs.readFile(process.cwd() + '/' + srcPath, 'utf8', function(err, str) {
    if (err) throw err;
    stylus(str).include(nib.path).render(function(err, css) {
      fs.writeFile(process.cwd() + '/' + destPath, css, function(err) {
        if (err) throw err;
        console.log('Compiled ' + srcPath + ' to ' + destPath);
      });
    });
  });
}