var chai = require('chai');
var should = chai.should();
var RedirectUrl = require("./../../../../lib/paymaya/model/cardVault/RedirectUrl");

describe('RedirectUrl',function(){
  var redirectUrl;

  var redirectUrlOptions = {
    success:"",
    failed:"",
    cancel:""
  }

  before(function(done){
    redirectUrl = new RedirectUrl();
    redirectUrl.success = redirectUrlOptions.success;
    redirectUrl.failed = redirectUrlOptions.failed;
    redirectUrl.cancel = redirectUrlOptions.cancel;
    done();
  })

  it('should have success property', function(done) {
		redirectUrl.should.have.property('success');
		done();
	});

  it('should have failed property', function(done) {
		redirectUrl.should.have.property('failed');
		done();
	});

  it('should have cancel property', function(done) {
		redirectUrl.should.have.property('cancel');
		done();
	});

  it('should return correct success value', function(done) {
		redirectUrl.success.should.equal(redirectUrlOptions.success);
		done();
	});

  it('should return correct failed value', function(done) {
		redirectUrl.failed.should.equal(redirectUrlOptions.failed);
		done();
	});

  it('should return correct cancel value', function(done) {
		redirectUrl.cancel.should.equal(redirectUrlOptions.cancel);
		done();
	});
})
