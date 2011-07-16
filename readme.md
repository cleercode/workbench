# Workbench

[Jade](/visionmedia/jade) and [Stylus](/LearnBoost/stylus) provide an excellent shorthand for writing HTML/CSS, and developers have fallen in love with them for [Express](/visionmedia/express) apps. It's about time that regular people get to use them, too.

Workbench is a simple tool for building static HTML/CSS/JS websites using [Jade](/visionmedia/jade) and [Stylus](/LearnBoost/stylus). It aims to be usable by all sorts of people, including non-Node-saavy designers and front-end developers. It's inspired by [Express](/visionmedia/express) and projects like [Jekyll](/mojombo/jekyll).

## Install
When it's ready for npm…
    npm install -g workbench

## Goals
- Write HTML/CSS shorthand in Jade/Stylus
- Utilize helpers like nib
- Write one layout file; have content embedded
- Dynamic data (JS variables + Jade)
- Concatenate/minify JS + CSS

## Use
Make a project directory
    workbench new

Watch the project and compile Jade/Stylus automatically
    workbench watch

The default Workbench directory structure (after an initial build) is as such:
    config.json
    build
      index.html
      style
        style.styl
    source
      index.jade
      layout.jade
      style
        style.styl


## Todo
- Local variable passing
- Layout support
- Routes, pseudo-automated with override
- nib?
- Watch (server to automatically compile with each change)
- Watch (server to render pages on request as in Express)
- GitHub Pages helpers (build to root; source in directory - [script](https://gist.github.com/1062743)?)
- Markdown filter?
- CoffeeScript compiler?
- Jade pretty print
- Debug print options