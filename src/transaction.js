'use strict';

/**
* Transaction constructor which holds transaction data.
* @constructor
* @param {boolean} type - Tells if transaction is adding money, or removing money.
* @param {string} transactionName - The name of the transaction.
* @param {string} transactionDate - The date of the transaction.
* @param {number} price - The amount of the transaction.
* @param {string} transactionDate - The description of the transaction.
* @param {number} price - A transaction code.
*/
function Transaction(type, transactionName, transactionDate, price, description, code, id) {
     this.transactionType = type;
     this.transactionName = transactionName;
     this.transactionDate = transactionDate;
     this.amount = price;
     this.transactionDescription = description;
     this.code = code;
     this.transactionID = id;
}
