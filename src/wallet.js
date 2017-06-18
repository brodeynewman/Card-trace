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

/**
* Clears the balance amount.
*/
Wallet.prototype.clearBalanceNode = function() {
     document.getElementById('balance').innerHTML = '';
}

/**
* Clears the transaction list.
*/
Wallet.prototype.clearTransactionList = function() {
     let classes = document.getElementsByClassName('transaction-item-wrap');

     for (let i = 0; i < classes.length; i++) {
          classes[i].style.display = 'none';
     }
}

/**
* Removes the node with the matching data-target [index].
* Clears the balance and strips the selected classes when a card is removed.
* @param {number} index - Removes the node at the given index.
*/
Wallet.prototype.removeNode = function(index) {
     let elements = document.querySelectorAll('[data-target="' + index + '"]');

     for (let i = 0; i < elements.length; i++) {
          elements[i].remove();
     }

     this.clearBalanceNode();
     this.stripClasses();
}

/**
* Adds the selected class to the first node in the nodeList on card click.
* Calls methods to clear list and balance when the 'selected-card' class is removed.
* @param {element} node - Pulls the data-target from the node to pass down to other methods.
*/
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
          this.clearTransactionList();
     }
}

/**
* Loops through the nodeList and compares the passed node with the others in the list.
* @param {number} index - Used to hide all transactions that dont belong to the passed data-target [index].
*/
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

/**
* Loops through the nodeList and compares the passed node with the others in the list.
* @param {element} node - Used to compare the selected card.
*/
Wallet.prototype.removeClasses = function(node) {
     let classes = document.getElementsByClassName('selected-card');

     for (let i = 0; i < classes.length; i++) {
          if (node !== classes[i]) {
               classes[i].className = 'card';
          }
     }
}

/**
* Finds all of the elements, and removes the selected class from them.
*/
Wallet.prototype.stripClasses = function() {
     let classes = document.getElementsByClassName('selected-card');

     for (let i = 0; i < classes.length; i++) {
          classes[i].className = 'card';
     }
}

/**
* If there's a selected card, then you may open the transaction creator.
* If not, then you must select a channel.
*/
Wallet.prototype.openTransactionModal = function() {
     let createTransaction = document.getElementById('transactionCreate');
     let elements = document.getElementsByClassName('selected-card');

     if (createTransaction.classList.contains('transaction-creation-modal') && elements.length > 0) {
          createTransaction.className += ' transaction-creation-modal--show';
     } else {
          alert('Please select a card to create a transaction');
     }
}

/**
* Tells the wallet template to map out the wallets
* @param {number} index - Selects the card by the data attribute.
* @param {object} transaction - Object sent to the card to store in transaction array.
*/
Wallet.prototype.pushTransaction = function(index, transaction) {
     this.cards[index].addTransaction(transaction);
}

/**
* Tells the wallet template to map out the wallets
* @param {card} card - Which card to send to the template engine.
* @param {number} index - Which index to give to the card data-target attribute.
*/
Wallet.prototype.mapCards = function(card, index) {
     this.$walletList.innerHTML += this.template.render([card], index);
}
