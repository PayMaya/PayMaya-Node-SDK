var chai = require('chai');
var should = chai.should();

var paymayaSdk = require("./../../../lib/paymaya/PaymayaSDK");
var Customer = require("./../../../lib/paymaya/api/Customer");
var BillingAddress = require("./../../../lib/paymaya/model/Address");
var Contact = require("./../../../lib/paymaya/model/Contact");
var Metadata = require("./../../../lib/paymaya/model/customer/Metadata");

describe('Customer',function(){
  var customer;
  var contact;
  var billingAddress;
  var metadata;
  var customerOptions = {
    firstName:"",
    middleName:"",
    lastName:"",
    birthday:"",
    sex:""
  }

  var billingAddressOptions = {
    line1:"",
    line2:"",
    city:"",
    state:"",
    zipCode:"",
    countryCode:""
  }

  var contactOptions = {
    phone:"",
    email:""
  }

  var metadataOptions = {
  }

  before(function(done){
    billingAddress = new BillingAddress();
    billingAddress.line1 = billingAddressOptions.line1;
    billingAddress.line2 = billingAddressOptions.line2;
    billingAddress.city = billingAddressOptions.city;
    billingAddress.state = billingAddressOptions.state;
    billingAddress.zipCode = billingAddressOptions.zipCode;
    billingAddress.countryCode = billingAddressOptions.countryCode;
    customerOptions.billingAddress = billingAddress;

    contact = new Contact();
    contact.phone = contactOptions.phone;
    contact.email = contactOptions.email;
    customerOptions.contact = contact;

    metadata = new Metadata();
    metadata = metadataOptions;
    customerOptions.metadata = metadata;

    customer = new Customer();
    customer.firstName = customerOptions.firstName;
    customer.middleName = customerOptions.middleName;
    customer.lastName = customerOptions.lastName;
    customer.sex = customerOptions.sex;
    customer.birthday = customerOptions.birthday;
    customer.billingAddress = customerOptions.billingAddress;
    customer.contact = customerOptions.contact;
    customer.metadata = customerOptions.metadata;

    done();
  })

  it('should have firstName property', function(done) {
		customer.should.have.property('firstName');
		done();
	});

  it('should have middleName property', function(done) {
    customer.should.have.property('middleName');
		done();
	});

  it('should have lastName property', function(done) {
    customer.should.have.property('lastName');
		done();
	});

  it('should have sex property', function(done) {
    customer.should.have.property('sex');
		done();
	});

  it('should have birthday property', function(done) {
    customer.should.have.property('birthday');
    done();
  });

  it('should have billingAddress property', function(done) {
    customer.should.have.property('billingAddress');
    done();
  });

  it('should have contact property', function(done) {
    customer.should.have.property('contact');
    done();
  });

  it('should have metadata property', function(done) {
    customer.should.have.property('metadata');
    done();
  });

  it('should return correct firstName value', function(done) {
		customer.firstName.should.equal(customerOptions.firstName);
		done();
	});

  it('should return correct middleName value', function(done) {
		customer.middleName.should.equal(customerOptions.middleName);
		done();
	});

  it('should return correct lastName value', function(done) {
		customer.lastName.should.equal(customerOptions.lastName);
		done();
	});

  it('should return correct birthday value', function(done) {
		customer.birthday.should.equal(customerOptions.birthday);
		done();
	});

  it('should return correct sex value', function(done) {
		customer.sex.should.equal(customerOptions.sex);
		done();
	});

  it('should return correct contact value', function(done) {
		customer.contact.should.equal(contact);
		done();
	});

  it('should return correct billingAddress value', function(done) {
		customer.billingAddress.should.equal(billingAddress);
		done();
	});

  it('should return correct metadata value', function(done) {
		customer.metadata.should.equal(metadata);
		done();
	});

  it('should execute create customer successfully', function(done) {
		var callback = function(err, response) {
			should.not.exist(err);
  			should.exist(response);
  			response.should.have.property('id');
  			response.should.have.property('firstName');
        response.should.have.property('middleName');
  			response.should.have.property('lastName');
        response.should.have.property('contact');
  			response.should.have.property('billingAddress');
        response.should.have.property('sex');
  			response.should.have.property('birthday');
        response.should.have.property('createdAt');
  			response.should.have.property('updatedAt');
  			done();
		}
		customer.create(callback);
	});

  it('should execute retrieve customer successfully', function(done) {
    var callback = function(err, response) {
      should.not.exist(err);
        should.exist(response);
        response.should.have.property('id');
        response.should.have.property('firstName');
        response.should.have.property('middleName');
        response.should.have.property('lastName');
        response.should.have.property('contact');
        response.should.have.property('billingAddress');
        response.should.have.property('sex');
        response.should.have.property('birthday');
        response.should.have.property('createdAt');
        response.should.have.property('updatedAt');
        done();
    }
    customer.retrieve(callback);
  });

  it('should execute update customer successfully', function(done) {
    var callback = function(err, response) {
      should.not.exist(err);
        should.exist(response);
        response.should.have.property('id');
        response.should.have.property('firstName');
        response.should.have.property('middleName');
        response.should.have.property('lastName');
        response.should.have.property('contact');
        response.should.have.property('billingAddress');
        response.should.have.property('sex');
        response.should.have.property('birthday');
        response.should.have.property('createdAt');
        response.should.have.property('updatedAt');
        done();
    }
    customer.update(callback);
  });

  it('should execute delete customer successfully', function(done) {
    var callback = function(err, response) {
      should.not.exist(err);
        should.exist(response);
        response.should.have.property('id');
        response.should.have.property('firstName');
        response.should.have.property('middleName');
        response.should.have.property('lastName');
        response.should.have.property('contact');
        response.should.have.property('billingAddress');
        response.should.have.property('sex');
        response.should.have.property('birthday');
        response.should.have.property('createdAt');
        response.should.have.property('updatedAt');
        done();
    }
    customer.delete(callback);
  });



})
