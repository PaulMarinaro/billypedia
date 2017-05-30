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
    browser.assert.elements('img', {atLeast: 3}, "Make sure you have an <img> for Billy, top-rated albums, and recording albums");
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
		browser.assert.elements('#list-top-rated > *', 5, 'Make sure you append a child to "#list-top-rated" for each of the top-rated albums');
		browser.assert.elements('#list-top-rated > li', 5, 'Make sure each child on the top-rated list is an <li>');
		browser.assert.elements('#list-top-rated > li.top-rated', 5, 'Make sure each of your <li> have the class "top-rated"');
		done();
	});

  it('should change top rated album image when clicking an album name', function(done){
    const src = num => data.discography.topRated[num].art;
    browser.assert.elements('#section-top-rated > div#image-container-top-rated > img', 1, 'Make sure your <img> is wrapped in a <div>');
    browser.assert.attribute('#section-top-rated > div#image-container-top-rated > img', 'src', src(0), 'Make sure the src for your <img> defaults to the first image in the list');
    data.discography.topRated.forEach(function(album, index) {
      browser.click(`#section-top-rated > ul > *:nth-of-type(${index + 1})`);
      browser.assert.attribute('#section-top-rated > div#image-container-top-rated > img', 'src', album.art, 'Make sure your <img> is wrapped in a <div> with the ID "section-top-rated"');
    })
    done();
  });

	it('should have a section with the id "section-recordings"', function(done){
		browser.assert.elements('section#section-recordings', 1, 'Make sure you have a <section> with the ID "section-recordings"');
		done();
	});

	it('should have a ul with the id "list-recordings"', function(done){
		browser.assert.elements('#section-recordings > ul#list-recordings', 1, 'Make sure you have a <ul> with the ID "list-recordings" that is a child of the "section-recordings" <section>');
		done();
	});

	it('should have ten recording titles', function(done){
		browser.assert.elements('#list-recordings > *', 10, 'Make sure you append a child to "#list-recordings" for each of the top-rated albums');
		browser.assert.elements('#list-recordings > li', 10, 'Make sure each child on the top-rated list is an <li>');
		browser.assert.elements('#list-recordings > li.recording', 10, 'Make sure each of your <li> have the class "recording"');
		done();
	});

  it('should change recordings album image when clicking an album name', function(done){
    const src = num => data.discography.recordings[num].art;
    browser.assert.elements('#section-recordings > div#image-container-recording > img', 1, 'Make sure your <img> is wrapped in a <div>');
    browser.assert.attribute('#section-recordings > div#image-container-recording > img', 'src', src(0), 'Make sure the src for your <img> defaults to the first image in the list');
    data.discography.recordings.forEach(function(album, index) {
      browser.click(`#section-recordings > ul > *:nth-of-type(${index + 1})`);
      browser.assert.attribute('#section-recordings > div#image-container-recording > img', 'src', album.art, 'Make sure your <img> is the child of a tag with the ID "section-recordings"');
    })
    done();
  });

  it('should have a table for all rider data', function(done){
    browser.assert.elements('table', 1, "Make sure you have a <table>");
    browser.assert.elements('tr', 14);
    browser.assert.elements('td', 28);
    done();
  });
});
