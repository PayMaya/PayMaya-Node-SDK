var chai = require('chai');
var should = chai.should();

var paymayaSdk = require("./../../../lib/paymaya/PaymayaSDK");
var Payments = require("./../../../lib/paymaya/api/Payments");
var Buyer = require("./../../../lib/paymaya/model/BasicCustomer");
var Address = require("./../../../lib/paymaya/model/Address");
var Contact = require("./../../../lib/paymaya/model/Contact");
var TotalAmount = require("./../../../lib/paymaya/model/TotalAmount");

describe('Payments', function() {

    var payment;
    var buyer;
    var totalAmount;

    var buyerOptions = {
      firstName:"Test FirstName",
      middleName:"Test MiddleName",
      lastName:"Test LastName",
    }

    var contactOptions = {
      phone : "+63(2)1234567890",
  		email : "paymayabuyer1@gmail.com"
    }

    var billingAddressOptions = {
      line1 : "9F Robinsons Cybergate 3",
	  	line2 : "Pioneer Street",
	  	city : "Mandaluyong City",
	  	state : "Metro Manila",
	  	zipCode : "12345",
	  	countryCode : "PH"
    };

    var totalAmountOptions = {
      amount:100,
      currency:"PHP"
    }

    var paymentTokenId = "wh03zhM8YGmIxXZyr6FBFLHXzUU43lAusYp2M4lF61F5FfJ0XBachwQOoQ8RCRmYOKELKkwr5KFw2yyXQzoJoWpS6zg9jfvV14cgnj8d01tGonb1bxxQLXnVuGi3BcqMA1qk0Y4YcY3EjPLpPtJ9nextZHf6zbvxxRoDRfkVc";

    before(function(done){
      paymayaSdk.initPayments("pk-N1hDJOIHQi8LZwVkaeIobtswQmcEUnCUlPyIim7YStd", "sk-HWoAEuUPWRvmHkE2wLIzdSGgUAjQUVURyagItskrMjt", paymayaSdk.ENVIRONMENT.SANDBOX);


      var contact = new Contact();
      contact.phone = contactOptions.phone;
      contact.email = contactOptions.email;
      buyerOptions.contact = contact;

      var billingAddress = new Address();
      billingAddress.line1 = billingAddressOptions.line1;
  	  billingAddress.line2 = billingAddressOptions.line2;
  	  billingAddress.city = billingAddressOptions.city;
  	  billingAddress.state = billingAddressOptions.state;
  	  billingAddress.zipCode = billingAddressOptions.zipCode;
  	  billingAddress.countryCode = billingAddressOptions.countryCode;
      buyerOptions.billingAddress = billingAddress

      buyer = new Buyer();
      buyer.firstName = buyerOptions.firstName;
      buyer.middleName = buyerOptions.middleName;
      buyer.lastName = buyerOptions.lastName;
      buyer.contact = buyerOptions.contact;
      buyer.billingAddress = buyerOptions.billingAddress;


      totalAmount = new TotalAmount();
      totalAmount.amount = totalAmountOptions.amount;
      totalAmount.currency = totalAmountOptions.currency;

      payment = new Payments();
      payment.paymentTokenId = paymentTokenId;
      payment.buyer = buyer;
      payment.totalAmount = totalAmount;

      done();
    })

    it('should have buyer property', function(done) {
  		payment.should.have.property('buyer');
  		done();
  	});

    it('should have totalAmount property', function(done) {
      payment.should.have.property('totalAmount');
      done();
    });

    it('should have paymentTokenId property', function(done) {
      payment.should.have.property('paymentTokenId');
      done();
    });

    it('should return correct buyer value', function(done) {
      payment.buyer.should.equal(buyer);
      done();
    });

    it('should return correct totalAmount value', function(done) {
      payment.totalAmount.should.equal(totalAmount);
      done();
    });

    it('should return correct paymentTokenId value', function(done) {
      payment.paymentTokenId.should.equal(paymentTokenId);
      done();
    });

    it('should execute initiate payment successfully', function(done) {
  		var callback = function(err, response) {
  			  should.not.exist(err);
    			should.exist(response);
    			response.should.have.property('id');
    			response.should.have.property('isPaid');
          response.should.have.property('status');
          response.should.have.property('amount');
          response.should.have.property('currency');
          response.should.have.property('createdAt');
          response.should.have.property('updatedAt');
          response.should.have.property('description');
          response.should.have.property('paymentTokenId');
    			done();
  		}
  		payment.execute(callback);
  	});

    it('should execute retrieve payment successfully', function(done) {
      var callback = function(err, response) {
        should.not.exist(err);
          should.exist(response);
          response.should.have.property('id');
          response.should.have.property('isPaid');
          response.should.have.property('status');
          response.should.have.property('amount');
          response.should.have.property('currency');
          response.should.have.property('createdAt');
          response.should.have.property('updatedAt');
          response.should.have.property('description');
          response.should.have.property('paymentTokenId');
          done();
      }
      payment.retrieve(callback);
    });

})
