'use strict';

/**
* Wallet contstructor holds array of cards
* @contstructor
*/
function WalletTemplate() {
     this.template = `<div class="card" data-target={{index}} onClick={wallet.addSelected(this.getAttribute('data-target'))}>
                         <a class="delete-card" onClick={wallet.deleteCard(this.parentNode.getAttribute('data-target'))}>
                              <i class="fa fa-trash-o" aria-hidden="true"></i>
                         </a>
                         <div class="credit-card {{cardType}}">

                         </div>
                         <div class="card-number">
                              <p>
                                   {{cardNumber}}
                              </p>
                         </div>
                         <div class="expiration-date">
                              <p>
                                   Valid Thru: {{expirationDate}}
                              </p>
                         </div>
                      </div>`
}

/**
* Maps out the array passed to it, and returns a view string.
* @param {array} arr - Array containing a card object.
*/
WalletTemplate.prototype.render = function(arr, id) {
     let wallet = document.getElementById('wallet');
     let view = '';
     let template = this.template;

     arr.map(obj => {
          template = template.replace('{{index}}', id);
          template = template.replace('{{cardType}}', obj.cardType);
          template = template.replace('{{cardNumber}}', obj.cardNumber);
          template = template.replace('{{expirationDate}}', obj.expirationDate);

          view += template;
     });

     return view;
}
