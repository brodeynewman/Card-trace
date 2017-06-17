'use strict';

  /**
    * Wallet contstructor holds array of cards
    * @contstructor
    */
  function Wallet(template) {
    this.cards = [];
    this.template = template;
  }

  /**
    * Adds a card to the Wallet array
    * @param {object} card - Credit card object
    */
  Wallet.prototype.addCard = function(card) {
    this.cards.push(card);

    this.mapCards();
  }

  /**
    * Deletes a card from the array
    */
  Wallet.prototype.deleteCard = function(index) {
    this.cards = this.cards.filter((card, cardIndex) => {
      return cardIndex !== index;
    });
  }

  /**
    * Tells the wallet template to map out the wallets
    */
  Wallet.prototype.mapCards = function() {
    this.template.show(this.cards);
  }
