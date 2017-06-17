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
     console.log(this.cards[index]);
     this.cards = this.cards.filter((card, cardIndex) => {
          return cardIndex !== Number(index);
     });

     this.removeNode(index);
}

Wallet.prototype.removeNode = function(index) {
     let elements = document.querySelectorAll('[data-target="' + index + '"]');
     elements[0].remove();
}

Wallet.prototype.addSelected = function(index) {
     let elements = document.querySelectorAll('[data-target="' + index + '"]');

     if (!elements[0].classList.contains('selected-card')) {
          elements[0].className += ' selected-card';
     }
}

Wallet.prototype.pushTransaction = function(index, transaction) {
     console.log(transaction);
     this.cards[index].addTransaction(transaction);
}

/**
* Tells the wallet template to map out the wallets
*/
Wallet.prototype.mapCards = function(card, index) {
     this.$walletList.innerHTML += this.template.render([card], index);
}
