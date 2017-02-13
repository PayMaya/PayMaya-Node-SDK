var chai = require('chai');
var should = chai.should();

var paymayaSdk = require("./../../../lib/paymaya/PaymayaSDK");
var Subscription = require("./../../../lib/paymaya/api/Subscription");
var TotalAmount = require("./../../../lib/paymaya/model/TotalAmount");


describe('Subscription',function(){
  var subscription;
  var totalAmount;

  var subscriptionOptions = {
    description:"",
    interval:"",
    intervalCount:"",
    startDate:"",
    endDate:""
  }

  var totalAmountOptions = {
    amount:"",
    currency:""
  }

  var customerId = "";
  var cardId = "";

  before(function(done){
    totalAmount = new TotalAmount();
    totalAmount.amount = totalAmountOptions.amount;
    totalAmount.currency = totalAmountOptions.currency;
    subscriptionOptions.totalAmount = totalAmount;

    subscription = new Subscription();
    subscription.description = subscriptionOptions.description;
    subscription.interval = subscriptionOptions.interval;
    subscription.intervalCount = subscriptionOptions.intervalCount;
    subscription.startDate = subscriptionOptions.startDate;
    subscription.endDate = subscriptionOptions.endDate;
    subscription.totalAmount = subscriptionOptions.totalAmount;

    done();
  })
  it('should have description property', function(done) {
		subscription.should.have.property('description');
		done();
	});

  it('should have interval property', function(done) {
		subscription.should.have.property('interval');
		done();
	});

  it('should have intervalCount property', function(done) {
    subscription.should.have.property('intervalCount');
    done();
  });

  it('should have startDate property', function(done) {
    subscription.should.have.property('startDate');
    done();
  });

  it('should have endDate property', function(done) {
    subscription.should.have.property('endDate');
    done();
  });

  it('should have totalAmount property', function(done) {
    subscription.should.have.property('totalAmount');
    done();
  });

  it('should return correct description value', function(done) {
    subscription.description.should.equal(subscriptionOptions.description);
    done();
  });

  it('should return correct interval value', function(done) {
    subscription.interval.should.equal(subscriptionOptions.interval);
    done();
  });

  it('should return correct intervalCount value', function(done) {
    subscription.intervalCount.should.equal(subscriptionOptions.intervalCount);
    done();
  });

  it('should return correct startDate value', function(done) {
    subscription.startDate.should.equal(subscriptionOptions.startDate);
    done();
  });

  it('should return correct endDate value', function(done) {
    subscription.endDate.should.equal(subscriptionOptions.endDate);
    done();
  });

  it('should return correct totalAmount value', function(done) {
    subscription.totalAmount.should.equal(totalAmount);
    done();
  });

  it('should execute start subscribe successfully', function(done) {
    var callback = function(err, response) {
      should.not.exist(err);
        should.exist(response);
        response.should.have.property('id');
        response.should.have.property('description');
        response.should.have.property('status');
        response.should.have.property('amount');
        response.should.have.property('currency');
        response.should.have.property('interval');
        response.should.have.property('intervalCount');
        response.should.have.property('startDate');
        response.should.have.property('endDate');
        response.should.have.property('cancelledAt');
        response.should.have.property('createdAt');
        response.should.have.property('updatedAt');
        done();
    }
    subscription.startSubscribe(callback);
  });

  it('should execute start subscribe successfully', function(done) {
    var callback = function(err, response) {
      should.not.exist(err);
        should.exist(response);
        response.should.have.property('id');
        response.should.have.property('description');
        response.should.have.property('status');
        response.should.have.property('amount');
        response.should.have.property('currency');
        response.should.have.property('interval');
        response.should.have.property('intervalCount');
        response.should.have.property('startDate');
        response.should.have.property('endDate');
        response.should.have.property('cancelledAt');
        response.should.have.property('createdAt');
        response.should.have.property('updatedAt');
        done();
    }
    subscription.startSubscribe(callback);
  });

  it('should execute list subscribe successfully', function(done) {
    var callback = function(err, response) {
      should.not.exist(err);
        should.exist(response);
        response.should.have.property('id');
        response.should.have.property('description');
        response.should.have.property('status');
        response.should.have.property('amount');
        response.should.have.property('currency');
        response.should.have.property('interval');
        response.should.have.property('intervalCount');
        response.should.have.property('startDate');
        response.should.have.property('endDate');
        response.should.have.property('cancelledAt');
        response.should.have.property('createdAt');
        response.should.have.property('updatedAt');
        done();
    }
    subscription.listAll(callback);
  });

  it('should execute retrieve subscribe successfully', function(done) {
    var callback = function(err, response) {
      should.not.exist(err);
        should.exist(response);
        response.should.have.property('id');
        response.should.have.property('description');
        response.should.have.property('status');
        response.should.have.property('amount');
        response.should.have.property('currency');
        response.should.have.property('interval');
        response.should.have.property('intervalCount');
        response.should.have.property('startDate');
        response.should.have.property('endDate');
        response.should.have.property('cancelledAt');
        response.should.have.property('createdAt');
        response.should.have.property('updatedAt');
        done();
    }
    subscription.retrieve(callback);
  });

  it('should execute list subsribe payments successfully', function(done) {
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
    subscription.retrievePayments(callback);
  });

  it('should execute cancel subsribe successfully', function(done) {
    var callback = function(err, response) {
      should.not.exist(err);
        should.exist(response);
        response.should.have.property('id');
        response.should.have.property('description');
        response.should.have.property('status');
        response.should.have.property('amount');
        response.should.have.property('currency');
        response.should.have.property('interval');
        response.should.have.property('intervalCount');
        response.should.have.property('startDate');
        response.should.have.property('endDate');
        response.should.have.property('cancelledAt');
        response.should.have.property('createdAt');
        response.should.have.property('updatedAt');
        done();
    }
    subscription.cancelSubscription(callback);
  });

})
