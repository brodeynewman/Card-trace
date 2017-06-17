'use strict';

/**
* Wallet contstructor holds array of cards
* @contstructor
*/
function Wallet(template) {
     this.cards = [];
     this.template = template;
     this.$walletList = document.getElementById('wallet');
}

/**
* Adds a card to the Wallet array
* @param {object} card - Credit card object
* Re-maps cards to force DOM update.
*/
Wallet.prototype.addCard = function(card) {
     this.cards.push(card);

     this.mapCards(card);
}

/**
* Deletes a card from the array
* Re-maps the cards out to force dom update.
*/
Wallet.prototype.deleteCard = function(index) {
     this.cards = this.cards.filter((card, cardIndex) => {
          return cardIndex !== index;
     });
}

/**
* Tells the wallet template to map out the wallets
*/
Wallet.prototype.mapCards = function(card) {
     this.$walletList.innerHTML += this.template.render([card]);
}
