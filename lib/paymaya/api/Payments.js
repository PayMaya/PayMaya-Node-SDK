module.exports =  Payments;

var APIManager = require("./../core/APIManager");
var paymayaSdk = require("./../PaymayaSDK");
function Payments(){
  this._apiManager = new APIManager();
  this.paymentTokenId = "";
  this.buyer = null;
  this.totalAmount = null;
  this.id = "";
}

Payments.prototype = {
  execute:function(callback){
    if(!this.paymentTokenId){
      callback("Missing paymentTokenId!");
      return;
    }
    if(!this.buyer){
      callback("Missing Buyer Details!");
      return;
    }
    if(!this.buyer.firstName ){
      callback("Missing Buyer firstName!");
      return;
    }
    if(!this.buyer.middleName ){
      callback("Missing Buyer middleName!");
      return;
    }   if(!this.buyer.lastName ){
        callback("Missing Buyer lastName!");
        return;
    }
    if(!this.buyer.contact ){
      callback("Missing Buyer contact Details!");
      return;
    }
    if(!this.buyer.contact.phone ){
      callback("Missing Buyer contact phone!");
      return;
    }
    if(!this.buyer.contact.email ){
      callback("Missing Buyer contact email!");
      return;
    }
    if(!this.totalAmount){
      callback("Missing Total Amount Details!");
      return;
    }
    if(!this.totalAmount.amount){
      callback("Missing amount!");
      return;
    }
    if(!this.totalAmount.currency){
      callback("Missing currency!");
      return;
    }
    var paymentInformationData = {
      paymentTokenId: this.paymentTokenId,
      buyer: this.buyer,
      totalAmount: this.totalAmount
    }

    var self = this;
    var onInitiateCheckout = function(err, response) {
      if(response) {
        self.id = response.id;
      }
      callback(err, response);
    };
    this._apiManager.executeInitiatePayment(paymentInformationData, onInitiateCheckout);
  },

  retrieve:function(callback){
    if(!this.id){
      callback("Missing id!");
      return;
    }
    this._apiManager.executeRetrievePayment(this.id, callback);
  }
};
