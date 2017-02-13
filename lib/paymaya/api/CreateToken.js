module.exports = CreateToken;
var APIManager = require("./../core/APIManager");
var paymayaSdk = require("./../PaymayaSDK");

function CreateToken(){
  this._apiManager = new APIManager();
  this.card = null;
  this.paymentTokenId = "";
}

CreateToken.prototype = {
  createToken:function(callback){
    if(!this.card){
      callback("Missing Card Details!");
    }
    if(!this.card.number){
      callback("Missing Card Number!");
    }
    if(!this.card.expMonth){
      callback("Missing Card expMonth!");
    }
    if(!this.card.expYear){
      callback("Missing Card expYear!");
    }
    if(!this.card.cvc){
      callback("Missing Card cvc!");
    }


      var cardData = {
        card: this.card
      }

      var self = this;
      var onTokenCreate = function(err,result){
          if(result){
            self.paymentTokenId = result.paymentTokenId;
          }
          callback(err,result);
      }
  this._apiManager.executeCreateToken(cardData, onTokenCreate);

  }
}
