'use strict';

/**
* Card contstructor holds card information + transactions
* @contstructor
* @param {string} cardType - Holds card type IE: Visa, Mastercard.
* @param {number} cardNumber - Holds the card number.
* @param {date} expirationDate - Holds the card expirationDate
* @param {number} amount - Holds inital card amount.
*/
function Card(cardType, cardNumber, expirationDate, amount, hashedNum) {
     let expire = expirationDate.split('/');

     /** The date for card / transaction comparison. */
     let editedDate = new Date(expire[2],expire[0] - 1,expire[1]);
     let year = editedDate.toString().split(' ')[3];
     let savedDate = `${editedDate.getMonth() + 1 }/${year}`;

     this.template = new TransactionTemplate();
     this.cardType = cardType;
     this.hashedNum = hashedNum;
     this.cardNumber = cardNumber;
     this.activeBalance = amount;
     this.transactions = [];
     this.date = new Date();
     this.shownDate = savedDate;
     this.expirationDate = editedDate;
     this.$entryList = document.getElementById('transactList');
}

/**
* Deducts 35 from your amount becase you overdrafted. Tehe.
* Passes in a new overdraft object to be rendered by the template.
*/
Card.prototype.overDraft = function(id) {
     this.activeBalance -= 35;

     this.$entryList.innerHTML += this.template.render([this.createOverdraftObject(id)]);
},

/**
* Displays the active balance for the card.
*/
Card.prototype.displayBalance = function() {
     let balanceNode = document.getElementById('balance');

     balanceNode.innerHTML = `$${Math.round(this.activeBalance)}.00`;
}

/**
* Weeds through the transaction and changes the balance accordingly.
* @param {object} transaction - The transaction that was made in order to change the activeBalance state.
*/
Card.prototype.changeBalance = function(transaction) {
     if (transaction) {
          (this.getTransactionType(transaction) === 'true') ? this.add(transaction) : (transaction.transactionAmount > this.activeBalance) ? this.subtractOverdraft(transaction) : this.subtract(transaction);
     }
}

/**
* Adds the transaction amount from the active balance amount.
* @param {object} transaction - Transaction object.
*/
Card.prototype.add = function(transaction) {
     this.activeBalance += transaction.transactionAmount;
}

/**
* Calls the subtract method passing in the transaction.
* Calls the overdraft method.
* @param {object} transaction - Transaction object.
*/
Card.prototype.subtractOverdraft = function(transaction) {
     this.subtract(transaction);
     this.overDraft(transaction.transactionID);
}

/**
* Subtracts the transaction amount from the active balance amount.
* @param {object} transaction - Transaction object.
*/
Card.prototype.subtract = function(transaction) {
     this.activeBalance -= transaction.transactionAmount;
}

/**
* Verifies transaction before pushing to transaction list.
* @param {object} transaction - Transaction object.
*/
Card.prototype.addTransaction = function(transaction) {

     if (!this.getExpired()) {
          alert('Your card is expired!');

          return;
     } else {
          this.transactions.push(transaction);

          this.changeBalance(transaction);
     }

     this.displayBalance();
     this.$entryList.innerHTML += this.template.render([transaction]);
}

/**
* Expiration date getter.
*/
Card.prototype.getExpired = function() {
     return (this.expirationDate >= this.date) ? true : false;
}

/**
* Returns the type of transaction.
* @param {object} obj - Used to return transaction type.
*/
Card.prototype.getTransactionType = function(obj) {
     return obj.transactionType;
}

/**
* Creates an overdraft object to be rendered when overdrafting.
* @param {number} -id Used to add a data-target to the overdraft.
*/
Card.prototype.createOverdraftObject = function(id) {
     let date = new Date().toString().split(' ');
     let draftDate = `${date[1]} ${date[2]} ${date[3]}`;

     let obj = {
          transactionType: false,
          transactionName: 'Overdraft Fee',
          transactionDate: draftDate,
          transactionAmount: 35,
          transactionDescription: 'Overdraft Fee',
          transactionCode: Math.floor(Math.random() * 100000),
          transactionID: id
     }

     return obj;
}
