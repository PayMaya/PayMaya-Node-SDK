module.exports = Card;
var APIManager = require("./../core/APIManager");
var paymayaSdk = require("./../PaymayaSDK");

function Card(){
  this._apiManager = new APIManager();
  this.paymentTokenId = "";
  this.isDefault = null;
  this.redirectUrl = null;
  this.customerId = "";
  this.id = "";
}


Card.prototype = {
  save:function(callback){
    if(!this.paymentTokenId){
      callback("Missing paymentTokenId!");
      return;
    }
    if(!this.isDefault){
      callback("Missing isDefault!");
      return;
    }
    if(!this.redirectUrl){
      callback("Missing redirectUrl!");
      return;
    }
    if(!this.redirectUrl.success){
      callback("Missing success Url!");
      return;
    }
    if(!this.redirectUrl.failed){
      callback("Missing success Url!");
      return;
    }
    if(!this.redirectUrl.cancel){
      callback("Missing success Url!");
      return;
    }
    if(!this.customerId){
      callback("Missing customerId!");
      return;
    }
      var cardData = {
        paymentTokenId:this.paymentTokenId,
        isDefault:this.isDefault,
        redirectUrl: this.redirectUrl
      };
      var self = this;
      var onCardSave = function(err,result){
        if(result){
          this.id = result.id;
        }
        callback(err,result);
      }
      this._apiManager.executeSaveCard(cardData,this.customerId,onCardSave);
  },
  listAll:function(callback){
      if(!this.customerId){
        callback("Missing customerId!")
        return;
      }
      this._apiManager.executeListCard(this.customerId,callback);
  },
  retrieve:function(callback){
    if(!this.id){
      callback("Missing cardId!")
      return;
    }
    if(!this.customerId){
      callback("Missing customerId!")
      return;
    }
    this._apiManager.executeRetrieveCard(this.id,this.customerId,callback);
  },
  update:function(callback){
    if(!this.isDefault){
      callback("Missing isDefault!")
      return;
    }
    var cardData = {
      paymentTokenId :this.paymentTokenId,
      isDefault :this.isDefault,
      redirectUrl : this.redirectUrl
    };
    if(!this.id){
      callback("Missing cardId!")
      return;
    }

    if(!this.customerId){
      callback("Missing customerId!")
      return;
    }
    var self = this;
    var onCardUpdate = function(err,result){
      if(result){
        this.id = result.id;
      }
      callback(err,result);
    }
    this._apiManager.executeUpdateCard(cardData,this.id,this.customerId,onCardUpdate);
  },
  delete:function(callback){
    if(!this.id){
      callback("Missing Card id!")
      return;
    }
    if(!this.customerId){
      callback("Missing customerId!")
      return;
    }
    this._apiManager.executeDeleteCard(this.id,this.customerId,callback);
  },
  payment:function(callback){
    if(!this.id){
      callback("Missing Card id!")
      return;
    }
    if(!this.customerId){
      callback("Missing customerId!")
      return;
    }
    if(!this.totalAmount.amount){
      callback("Missing amount!")
      return;
    }
    if(!this.totalAmount.currency){
      callback("Missing currency!")
      return;
    }
    var paymentData = {
      totalAmount:{
        amount:1000,
        currency:"PHP"
      }
    }
    this._apiManager.executePaymentCard(paymentData,this.id,this.customerId,callback);
  }

}
