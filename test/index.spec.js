var _ = require('underscore');
var Browser = require('zombie');
var browser = new Browser();
var data = require('../data.json');

const server = 'http://localhost:3000/';

describe('Billypedia', function(){

  beforeEach(function(done) {
    browser.visit(server, done);
  });

  it('should have a title Billypedia', function(done){
    // console.log(browser.text('title'));
    browser.assert.text('title', 'Billypedia');
    done();
  });

  it('should have one image of billy', function(done){
    browser.assert.elements('#image-billy', 1);
    done();
  });

  it('should have three images on page', function(done){
    browser.assert.elements('img', {atLeast: 3}, "Make sure you have an IMAGE for Billy, top-rated albums, and recording albums");
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

	it('should have five top rated titles', function(done){
		browser.assert.elements('#list-top-rated > *', 5, 'Make sure you make a LIST ITEM for each of the top-rated albums, and append them to the "#list-top-rated" UL');
		done();
	});

  it('should change top rated album image when clicking an album name', function(done){
    const src = num => data.discography.topRated[num].art;
    browser.assert.attribute('#section-top-rated > img', 'src', src(0), 'Make sure your image is wrapped in a tag with the id "section-top-rated"');
    data.discography.topRated.forEach(function(album, index) {
      browser.click(`#section-top-rated > ul > *:nth-of-type(${index + 1})`);
      browser.assert.attribute('#section-top-rated > img', 'src', album.art, 'Make sure your image is wrapped in a tag with the id "section-top-rated"');
    })
    done();
  });

	it('should have a section with the id "section-recordings"', function(done){
		browser.assert.elements('section#section-recordings', 1, 'Make sure you have a SECTION with the ID "section-recordings"');
		done();
	});

	it('should have a ul with the id "list-recordings"', function(done){
		browser.assert.elements('#section-recordings > ul#list-recordings', 1, 'Make sure you have a UL with the ID "list-recordings" as a child of the "section-recordings" SECTION');
		done();
	});

	it('should have ten recording titles', function(done){
		browser.assert.elements('#list-recordings > *', 10, 'Make sure you have ten LIST ITEMS with the CLASS "recording"');
		done();
	});

  it('should change recordings album image when clicking an album name', function(done){
    const src = num => data.discography.recordings[num].art;
    browser.assert.attribute('#section-recording > img', 'src', src(0));
    data.discography.recordings.forEach(function(album, index) {
      browser.click(`#section-recordings > ul > *:nth-of-type(${index + 1})`);
      browser.assert.attribute('#section-recordings > img', 'src', album.art, 'Make sure your IMAGE is the child of a tag with the ID "section-recordings"');
    })
    done();
  });

  it('should have a table for all rider data', function(done){
    browser.assert.elements('table', 1, "Make sure you have a TABLE");
    browser.assert.elements('tr', 14);
    browser.assert.elements('td', 28);
    done();
  });
});
