'use strict';

  /**
    * Card contstructor holds card information + transactions
    * @contstructor
    * @param {string} cardType - Holds card type IE: Visa, Mastercard.
    * @param {number} cardNumber - Holds the card number.
    * @param {date} expirationDate - Holds the card expirationDate
    * @param {number} amount - Holds inital card amount.
    */
  function Card(cardType, cardNumber, expirationDate, amount) {
    let expire = expirationDate.split('/');

    this.template = new TransactionTemplate();
    this.cardType = cardType;
    this.cardNumber = cardNumber;
    this.initialBalance = amount;
    this.activeBalance = amount;
    this.transactions = [];
    this.date = new Date();
    this.expirationDate = new Date(expire[2],expire[0]-1,expire[1]);
  }

  Card.prototype = {

    /**
      * Deducts 35 from your amount becase you overdrafted. Tehe.
      */
    overDraft: function(obj) {
      obj.balance -= 35;
    },

    displayBalance: function() {
      let balanceNode = document.getElementById('balance');

      balanceNode.innerHTML = `$${this.balance}.00`;
    },

    /**
      * Maps through the transaction array and changes the balance accordingly.
      * Stores Initial amount so each time a new transaction is made, it subtracts from inital state when mapping.
      * @param {function} callback - This means the overdraft method was passed in.
      */
    changeBalance: function(callback) {
      let initialBalance = this.initialBalance;

      this.transactions.map(data => {
        if (data.transactionType) {
          initialBalance += data.amount;
        } else {
          initialBalance -= data.amount;
        }
      });

      this.balance = initialBalance;

      if (callback) {
        callback(this);
      }
      this.displayBalance();
    },

    /**
      * Verifies transaction before pushing to transaction list.
      * @param {object} transaction - Transaction object.
      */
    addTransaction: function(transaction) {
      if (this.getExpired()) {

        if (this.balance >= transaction.amount) {
          this.transactions.push(transaction);
          this.changeBalance();
        } else {
          this.transactions.push(transaction);

          /** You overdrafted your account. */
          this.changeBalance(this.overDraft);
        }

      } else {
        alert('Your card is expired!');
        this.changeBalance();
      }
    },

    /**
      * Expiration date getter.
      */
    getExpired: function() {
      return (this.expirationDate > this.date) ? true : false;
    }
  }
