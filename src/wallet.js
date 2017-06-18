'use strict';

/**
* Wallet contstructor holds array of cards
* @contstructor
*/
function Wallet() {
     this.cards = [];
     this.template = new WalletTemplate();
     this.$walletList = document.getElementById('wallet');
}

/**
* Adds a card to the Wallet array
* @param {object} card - Credit card object
* Re-maps cards to force DOM update.
*/
Wallet.prototype.addCard = function(card) {
     this.cards.push(card);

     this.mapCards(card, (this.cards.length - 1));
}

/**
* Deletes a card from the array
* Re-maps the cards out to force dom update.
*/
Wallet.prototype.deleteCard = function(index) {
     /** Keep the card data on file. */
     this.removeNode(index);
}

Wallet.prototype.clearBalanceNode = function() {
     document.getElementById('balance').innerHTML = '';
     let classes = document.getElementsByClassName('transaction-item-wrap');

     for (let i = 0; i < classes.length; i++) {
          classes[i].style.display = 'none';
     }
}

Wallet.prototype.removeNode = function(index) {
     let elements = document.querySelectorAll('[data-target="' + index + '"]');

     for (let i = 0; i < elements.length; i++) {
          elements[i].remove();
     }

     this.clearBalanceNode();
     this.stripClasses();
}

Wallet.prototype.addSelected = function(node) {

     let index = node.getAttribute('data-target');
     let elements = document.querySelectorAll('[data-target="' + index + '"]');

     if (!elements[0].classList.contains('selected-card')) {
          elements[0].className += ' selected-card';

          this.cards[index].displayBalance();
          this.removeClasses(node);
          this.hideTransactions(index);
     } else {
          elements[0].className = 'card';

          this.clearBalanceNode();
     }
}

Wallet.prototype.hideTransactions = function(index) {
     let classes = document.getElementsByClassName('selected-card');

     let elements = document.getElementsByClassName('transaction-item-wrap');

     for (let i = 0; i < elements.length; i++) {
          if (elements[i].getAttribute('data-target') === index) {
               elements[i].style.display = 'flex';
          } else {
               elements[i].style.display = 'none';
          }
     }
}

Wallet.prototype.removeClasses = function(node) {
     let classes = document.getElementsByClassName('selected-card');

     for (let i = 0; i < classes.length; i++) {
          if (node !== classes[i]) {
               classes[i].className = 'card';
          }
     }
}

Wallet.prototype.stripClasses = function() {
     let classes = document.getElementsByClassName('selected-card');

     for (let i = 0; i < classes.length; i++) {
          classes[i].className = 'card';
     }
}

Wallet.prototype.openTransactionModal = function() {
     let createTransaction = document.getElementById('transactionCreate');
     let elements = document.getElementsByClassName('selected-card');

     if (createTransaction.classList.contains('transaction-creation-modal') && elements.length > 0) {
          createTransaction.className += ' transaction-creation-modal--show';
     } else {
          alert('Please select a card to create a transaction');
     }
}

Wallet.prototype.pushTransaction = function(index, transaction) {
     this.cards[index].addTransaction(transaction);
}

/**
* Tells the wallet template to map out the wallets
*/
Wallet.prototype.mapCards = function(card, index) {
     this.$walletList.innerHTML += this.template.render([card], index);
}
