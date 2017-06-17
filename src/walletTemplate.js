'use strict';

/**
* Wallet contstructor holds array of cards
* @contstructor
*/
function WalletTemplate() {
     this.template = `<div class="card">
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
WalletTemplate.prototype.render = function(arr) {
     let wallet = document.getElementById('wallet');
     let view = '';
     let template = this.template;

     arr.map(obj => {
          template = template.replace('{{cardType}}', obj.cardType);
          template = template.replace('{{cardNumber}}', obj.cardNumber);
          template = template.replace('{{expirationDate}}', obj.expirationDate);

          view += template;
     });

     return view;
}
