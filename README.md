# ONC Playbook

ONC Playbook project

## Requirements

* [Ruby](http://www.ruby-lang.org/en/downloads/) (including development
headers and v2.0.0 or above)
* [RubyGems](http://rubygems.org/pages/download)
* [NodeJS](http://nodejs.org)

## Installation

1. Clone repo locally
1. Run ```gem install bundler``` to allow for installing Rubies from a Gemfile
1. Run ```bundle install``` to install Ruby dependencies for GitHub Pages
1. Run ```npm install -g grunt-cli``` to install Grunt globally
1. Run ```npm install``` to install Node/Grunt dependencies

## Grunt Tasks

* ```grunt``` - runs JS check, minification, then serves and watches Jekyll site (including SCSS compiling) at [http://127.0.0.1:4000](http://127.0.0.1:4000)
* ```grunt serve``` - same as running ```grunt```
* ```grunt build``` - runs JS check, minification, image optimization, then builds Jekyll site (including SCSS compiling)
* ```grunt buildfordeploy``` - runs JS check, minification, then builds Jekyll site (including SCSS compiling) using production-specific config file
* ```grunt servefordeploy``` - runs JS check, minification, then serves Jekyll site (including SCSS compiling) using production-specific config file
* ```grunt js``` - runs JS check, concatenates, and minifies JS
* ```grunt images``` - runs image optimization on images in /img folder
* ```grunt validate-html``` - runs HTML validation on all HTML files in the compiled _site directory
* ```grunt a11y``` - scans all HTML files in the compiled _site directory against WCAG2A accessibility guidelines
* ```grunt update``` - checks for version updates on all grunt dependencies

## Deployment

With access to ONC's BitBucket repo, run ```grunt buildfordeploy``` locally to build the site using the production-specific config file. This sets the base URL and base path to match healthit.gov.

You can also work in this production-ready environment, locally, by running ```grunt servefordeploy```.

In BitBucket, **legacy** is the master branch to create working branches from. We're putting PE Playbook work into the **pe-playbook** branch. Request a merge into **legacy-stg** for staging or **legacy** for production by emailing Ashish Pagar [mailto:ashish.pagar@dsfederal.com](ashish.pagar@dsfederal.com) and cc'ing Katrina, Jason, and Matt.

## Options

### Uglify HTML output

Calling the compress.html layout from the default.htm layout file will remove all whitespace from compiled HTML (via [http://jch.penibelst.de/](http://jch.penibelst.de/)). To use compress.html add the following to the top of _includes/default.html:

    ---
    layout: compress
    ---

