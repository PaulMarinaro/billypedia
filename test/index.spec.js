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

	it('should have five top rated titles', function(done){
		browser.assert.elements('.top-rated-title', 5, 'Make sure your list items have the class "top-rated-title"');
		done();
	});

  it('should change top rated album image when clicking an album name', function(done){
    const src = num => data.discography.topRated[num].art;
    browser.assert.attribute('#image-container-top-rated > img', 'src', src(0), 'Make sure your image is wrapped in a tag with the id "image-container-top-rated"');
    data.discography.topRated.forEach(function(album, index) {
      browser.click(`.top-rated:nth-of-type(${index + 1})`);
      browser.assert.attribute('#image-container-top-rated > img', 'src', album.art, 'Make sure your image is wrapped in a tag with the id "image-container-top-rated"');
    })
    done();
  });

	it('should have ten recording titles', function(done){
		browser.assert.elements('.recording-title', 10, 'Make sure your list items have the class "recording-title"');
		done();
	});

  it('should change recordings album image when clicking an album name', function(done){
    const src = num => data.discography.recordings[num].art;
    browser.assert.attribute('#image-container-recording > img', 'src', src(0));
    data.discography.recordings.forEach(function(album, index) {
      browser.click(`.recording:nth-of-type(${index + 1})`);
      browser.assert.attribute('#image-container-recording > img', 'src', album.art, 'Make sure your image is wrapped in a tag with the id "image-container-recording"');
    })
    done();
  });

  it('should have a table for all rider data', function(done){
    browser.assert.elements('table', 1);
    browser.assert.elements('tr', 14);
    browser.assert.elements('td', 28);
    done();
  });
});
