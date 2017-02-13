module.exports = Subscription;
var APIManager = require("./../core/APIManager");
var paymayaSdk = require("./../PaymayaSDK");

function Subscription(){
  this._apiManager = new APIManager();
  this.description = "";
  this.interval = "";
  this.intervalCount = 0;
  this.startDate = "";
  this.endDate = "";
  this.totalAmount = null;
  this.customerId = "";
  this.cardId = "";
  this.id = "";
}

Subscription.prototype = {
  startSubscribe: function(callback){
    if(!this.description){
      callback("Missing description!");
      return;
    }
    if(!this.interval){
      callback("Missing interval!");
      return;
    }
    if(!this.intervalCount){
      callback("Missing intervalCount!");
      return;
    }
    if(!this.startDate){
      callback("Missing startDate!");
      return;
    }
    if(!this.endDate){
      callback("Missing endDate!");
      return;
    }
    if(!this.totalAmount){
      callback("Missing totalAmount!");
      return;
    }
      var subscriptionData = {
        description:this.description,
        interval:this.interval,
        intervalCount:this.intervalCount,
        startDate:this.startDate,
        endDate:this.endDate,
        totalAmount: this.totalAmount
      };
      var self = this;
      var onStartSubscribe = function(err,result){
          if(result){
            this.id = result.id;
          }
          callback(err,result);
      }
      if(!this.customerId){
        callback("Missing Customer Id");
      }
      if(!this.cardId){
        callback("Missing Card Id");
      }
      this._apiManager.executeStartSubscribe(subscriptionData,this.customerId,this.cardId,onStartSubscribe);
  },
  listAll:function(callback){
    if(!this.customerId){
      callback("Missing Customer Id");
      return;
    }
    if(!this.id){
      callback("Missing Card Id");
      return;
    }
    this._apiManager.executeListSubscribe(this.customerId,this.cardId,callback);
  },
  retrieve:function(callback){
    if(!this.id){
      callback("Missing Card Id");
      return;
    }
    this._apiManager.executeRetrieveSubscribe(this.id,callback);
  },
  retrievePayments:function(callback){
    if(!this.id){
      callback("Missing Card Id");
      return;
    }
    this._apiManager.executeListSubscribePayments(this.id,callback);
  },
  cancelSubscription:function(callback){
    if(!this.id){
      callback("Missing Card Id");
      return;
    }
    this._apiManger.executeCancelSubscribe(this.id,callback);
  }
}
