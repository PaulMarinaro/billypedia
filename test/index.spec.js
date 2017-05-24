var path = require('path');
var expect = require('chai').expect;
var $ = require('jquery');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

const HTMLdocument = path.join(__dirname, '..', './index.html');
const DOM = cheerio.load(fs.readFileSync(HTMLdocument));

console.log(DOM);

describe('billypedia', function () {
  'use strict';

  it('should have a jQuery CDN', function () {

    expect(index).to.be.a('function');
  });

  it('does something', function () {
    expect(true).to.equal(false);
  });

  it('does something else', function () {
    expect(true).to.equal(false);
  });

  // Add more assertions here
});
