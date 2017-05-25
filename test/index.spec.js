var _ = require('underscore');
var path = require('path');
var expect = require('chai').expect;
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var Browser = require('zombie');
var browser = new Browser();
var $ = require('jquery');
var data = require('../data.json');

// Path to HTML file
const HTMLdocument = path.join(__dirname, '..', './.master/index.html');
const readFile = fs.readFileSync(HTMLdocument);
// Path to HTML file
const server = 'http://localhost:3000/';

// Virtual DOM
const DOM = cheerio.load(readFile);

describe('Billypedia Zombie', function(){

  beforeEach(function(done) {
    browser.visit(server, done);
  });

  it('should have a title Billypedia', function(done){
    // console.log(browser.text('title'));
    browser.assert.text('title', 'Billypedia');
    done();
  });

  // it('should have a jQuery CDN', function () {
  //   const src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js';
  //   browser.assert.attribute('script', 'src', src);
  //   done();
  // });

  it('should have one image of billy', function(done){
    browser.assert.elements('#image-billy', 1);
    done();
  });

  it('should have five top rated titles', function(done){
    browser.assert.elements('.top-rated-title', 5);
    done();
  });

  it('should have ten recording titles', function(done){
    browser.assert.elements('.recording-title', 10);
    done();
  });

  it('should have a table for all rider data', function(done){
    browser.assert.elements('table', 1);
    browser.assert.elements('tr', 14);
    browser.assert.elements('td', 28);
    done();
  });

  it('should have three images on page', function(done){
    browser.assert.elements('img', 3);
    done();
  });

  it('should change image of Billy when clicked', function(done){
    data.images.billy.forEach(function(src) {
      browser.assert.attribute('#image-billy', 'src', src);
      browser.click('#image-billy');
    })
    browser.assert.attribute('#image-billy', 'src', data.images.billy[0]);
    done();
  });

  // it('should change album image when album name clicked', function(done){
  //   const src1 = 'images/album/voice-in-the-night.jpg';
  //   browser.assert.attribute('#recording-image', 'src', src1);
  //   done();
  // });

});

//
// describe('billypedia', function () {
//   'use strict';
//
//   it('should have a jQuery CDN', function () {
//     const scripts = DOM('script');
//     const src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js';
//     const result = _.some(scripts, function(script) {
//       return script.attribs.src = src;
//     });
//     expect(result).to.be.true;
//   });
//
//   it('should have 4 paragraph tags with the class "bio"', function () {
//     const bios = DOM('.bio')
//     console.log(bios.length);
//     expect(bios.length).to.equal(4);
//   });
//
//   // it('should have 3 images', function () {
//   //   const imgs = DOM('img');
//   //   expect(imgs.length).to.equal(3);
//   // });
//   //
//   // it('should have 5 top-rated-title list items', function () {
//   //
//   //   const topRated = DOM('top-rated-title');
//   //   expect(topRated.length).to.equal(5);
//   // });
//
//   // Add more assertions here
// });
