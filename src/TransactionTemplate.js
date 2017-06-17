'use strict';

  /**
    * Wallet contstructor holds array of cards
    * @contstructor
    */
  function TransactionTemplate() {
    this.template = `<div class="transaction-item-wrap">
                        <div class="transaction-subtracting">
                          <span><i class="fa {{transactionType}}" aria-hidden="true"></i></span>
                        </div>
                        <div class="transaction-title">
                          <p>
                            {{transactionName}}
                          </p>
                          <span>
                            {{transactionDescription}} #{{transactionCode}}- <span id="transactionDate">{{transactionDate}}</span>
                          </span>
                        </div>
                        <div class="transaction-cost">
                          <span>
                            $ {{transactionCost}}
                          </span>
                        </div>
                      </div>`
  }

  TransactionTemplate.prototype.show = function(arr) {
    let wallet = document.getElementById('wallet');
    let view = '';
    let template = this.template;

    arr.map(obj => {
      template = template.replace('{{cardType}}', obj.cardType);
      template = template.replace('{{cardNumber}}', obj.cardNumber);
      template = template.replace('{{expirationDate}}', obj.expirationDate);

      view += template;
    });

    wallet.innerHTML = view;
  }
