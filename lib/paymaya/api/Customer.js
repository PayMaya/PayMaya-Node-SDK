module.exports = Customer;
var APIManager = require("./../core/APIManager");
var paymayaSdk = require("./../PaymayaSDK");

function Customer(){
  this._apiManager = new APIManager();
  this.firstName = "";
  this.middleName = "";
  this.lastName = "";
  this.birthday = "";
  this.sex = "";
  this.contact = null;
  this.billingAddress = null;
  this.metadata = null;
  this.id = "";
}

Customer.prototype = {
  create:function(callback){
    if(!this.firstName){
      callback("Missing firstName!");
      return;
    }
    if(!this.middleName){
      callback("Missing middleName!");
      return;
    }
    if(!this.lastName){
      callback("Missing lastName!");
      return;
    }
    if(!this.birthday){
      callback("Missing birthday!");
      return;
    }
    if(!this.sex){
      callback("Missing sex!");
      return;
    }
    if(!this.contact){
      callback("Missing Contact Details!");
      return;
    }
    if(!this.contact.phone){
      callback("Missing Contact phone!");
      return;
    }
    if(!this.contact.email){
      callback("Missing Contact email!");
      return;
    }
    if(!this.billingAddress){
      callback("Missing Billing Details!");
      return;
    }
    if(!this.billingAddress.line1 ){
      callback("Missing Billing Address!");
      return;
    }
    if(!this.billingAddress.city ){
      callback("Missing Billing city!");
      return;
    }
    if(!this.billingAddress.state ){
      callback("Missing Billing state!");
      return;
    }
    if(!this.billingAddress.zipCode ){
      callback("Missing Billing zipCode!");
      return;
    }
    if(!this.billingAddress.countryCode ){
      callback("Missing Billing countryCode!");
      return;
    }


    var customerData = {
      firstName:this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      birthday:this.birthday,
      sex:this.sex,
      contact:this.contact,
      billingAddress:this.billingAddress,
      metadata:this.metadata
    };
    var self = this;
    var onCustomerCreate = function(err,result){
      if(result){
        self.id = result.id
      }
      callback(err,result);
    }
    this._apiManager.executeCreateCustomer(customerData,onCustomerCreate);
  },

  retrieve:function(callback){
    if(!this.id){
      callback("Missing id!");
    }
    this._apiManager.executeGetCustomer(this.id,callback);
  },

  update:function(callback){
    if(!this.firstName){
      callback("Missing firstName!");
      return;
    }
    if(!this.middleName){
      callback("Missing middleName!");
      return;
    }
    if(!this.lastName){
      callback("Missing lastName!");
      return;
    }
    if(!this.birthday){
      callback("Missing birthday!");
      return;
    }
    if(!this.sex){
      callback("Missing sex!");
      return;
    }
    if(!this.contact){
      callback("Missing Contact Details!");
      return;
    }
    if(!this.contact.phone){
      callback("Missing Contact phone!");
      return;
    }
    if(!this.contact.email){
      callback("Missing Contact email!");
      return;
    }
    if(!this.billingAddress){
      callback("Missing Billing Details!");
      return;
    }
    if(!this.billingAddress.line1 ){
      callback("Missing Billing Address!");
      return;
    }
    if(!this.billingAddress.city ){
      callback("Missing Billing city!");
      return;
    }
    if(!this.billingAddress.state ){
      callback("Missing Billing state!");
      return;
    }
    if(!this.billingAddress.zipCode ){
      callback("Missing Billing zipCode!");
      return;
    }
    if(!this.billingAddress.countryCode ){
      callback("Missing Billing countryCode!");
      return;
    }

    var customerData = {
      firstName:this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      birthday:this.birthday,
      sex:this.sex,
      contact:this.contact,
      billingAddress:this.billingAddress,
      metadata:this.metadata
    };
    var self = this;
    var onCustomerUpdate = function(err,result){
      if(result){
        self.id = result.id
      }
      callback(err,result);
    }
    if(!this.id){
      callback("Missing Id!");
      return;
    }
    this._apiManager.executeUpdateCustomer(customerData,this.id,onCustomerUpdate);
  },
  delete:function(callback){
    if(!this.id){
      callback("Missing id!");
      return;
    }
    this._apiManager.executeDeleteCustomer(this.id,callback);
  }

}
