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
     this.activeBalance = amount;
     this.transactions = [];
     this.date = new Date();
     this.expirationDate = new Date(expire[2],expire[0]-1,expire[1]);
     this.$entryList = document.getElementById('transactList');
  }

    /**
      * Deducts 35 from your amount becase you overdrafted. Tehe.
      * Passes in a new overdraft object to be rendered by the template.
      */
    Card.prototype.overDraft = function() {
         this.activeBalance -= 35;

         this.$entryList.innerHTML += this.template.render([this.createOverdraftObject()]);
    },

    Card.prototype.displayBalance = function() {
         let balanceNode = document.getElementById('balance');

         balanceNode.innerHTML = `$${this.activeBalance}.00`;
    }

    /**
      * Maps through the transaction array and changes the balance accordingly.
      * Stores Initial amount so each time a new transaction is made, it subtracts from inital state when mapping.
      * @param {object} transaction - The transaction that was made in order to change the activeBalance state.
      */
      Card.prototype.changeBalance = function(transaction) {
          if (transaction) {
               (this.getTransactionType(transaction)) ? this.add(transaction) : (transaction.amount > this.activeBalance) ? this.subtractOverdraft(transaction) : this.subtract(transaction);
          }
    }

    /**
     * Adds the transaction amount from the active balance amount.
     * @param {object} transaction - Transaction object.
     */
     Card.prototype.add = function(transaction) {
          this.activeBalance += transaction.amount;
     }

     /**
      * Calls the subtract method passing in the transaction.
      * Calls the overdraft method.
      * @param {object} transaction - Transaction object.
      */
     Card.prototype.subtractOverdraft = function(transaction) {
          this.subtract(transaction);
          this.overDraft();
     }

     /**
      * Subtracts the transaction amount from the active balance amount.
      * @param {object} transaction - Transaction object.
      */
     Card.prototype.subtract = function(transaction) {
          this.activeBalance -= transaction.amount;
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

               console.log(transaction);
               this.changeBalance(transaction);
          }

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
     */
     Card.prototype.getTransactionType = function(obj) {
          console.log(obj);

          return obj.transactionType;
     }

     /**
     * Creates an overdraft object to be rendered when overdrafting.
     */
     Card.prototype.createOverdraftObject = function() {
          let obj = {
               transactionType: false,
               transactionName: 'Overdraft Fee',
               transactionDate: new Date(),
               amount: 35,
               transactionDescription: 'Overdraft Fee',
               code: Math.floor(Math.random() * 100000)
          }

          return obj;
     }
