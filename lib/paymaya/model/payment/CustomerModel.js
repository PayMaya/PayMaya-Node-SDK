module.exports = CustomerModel;

var BasicCustomer = require('../BasicCustomer');

function CustomerModel(){
    this.birthday = "1987-10-10",
    this.sex= "f",
    this.metadata = null
}

Object.setPrototypeOf(CustomerModel,BasicCustomer);
