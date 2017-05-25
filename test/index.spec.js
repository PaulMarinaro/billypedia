var _ = require('underscore');
var path = require('path');
var fs = require('fs');
var Browser = require('zombie');
var browser = new Browser();
var data = require('../data.json');

// Path to HTML file
const HTMLdocument = path.join(__dirname, '..', './.master/index.html');
const readFile = fs.readFileSync(HTMLdocument);
// Path to HTML file
const server = 'http://localhost:3000/';

describe('Billypedia Zombie', function(){

  beforeEach(function(done) {
    browser.visit(server, done);
  });

  xit('should have a title Billypedia', function(done){
    // console.log(browser.text('title'));
    browser.assert.text('title', 'Billypedia');
    done();
  });

  // it('should have a jQuery CDN', function () {
  //   const src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js';
  //   browser.assert.attribute('script', 'src', src);
  //   done();
  // });

  xit('should have one image of billy', function(done){
    browser.assert.elements('#image-billy', 1);
    done();
  });

  xit('should have three images on page', function(done){
    browser.assert.elements('img', 3);
    done();
  });

  xit('should change image of Billy when clicked', function(done){
    data.images.billy.forEach(function(src) {
      browser.assert.attribute('#image-billy', 'src', src);
      browser.click('#image-billy');
    })
    browser.assert.attribute('#image-billy', 'src', data.images.billy[0]);
    done();
  });

  xit('should have a table for all rider data', function(done){
    browser.assert.elements('table', 1);
    browser.assert.elements('tr', 14);
    browser.assert.elements('td', 28);
    done();
  });

	xit('should have five top rated titles', function(done){
		browser.assert.elements('.top-rated-title', 5);
		done();
	});

  it('should change top rated album image when clicking an album name', function(done){
    const src = num => data.discography.topRated[num].art;
    browser.assert.attribute('#image-container-top-rated > img', 'src', src(0));
    data.discography.topRated.forEach(function(album, index) {
      browser.click(`.top-rated:nth-of-type(${index + 1})`);
      browser.assert.attribute('#image-container-top-rated > img', 'src', album.art);
    })
    done();
  });

	it('should have ten recording titles', function(done){
		browser.assert.elements('.recording-title', 10);
		done();
	});

});
