const wallet = new Wallet();

(function() {
     let createCard = document.getElementById('walletCreate');
     let createTransaction = document.getElementById('transactionCreate');
     let cardArr = document.getElementsByClassName('card');
     let re = /\d(\.\d{1,2})?/;

     document.getElementById('cardDate').value = '06/18/2017';

     /**
     * Adds click listener to add card icon.
     */
     document.getElementById('addCard').addEventListener('click', function() {
          if (!createCard.classList.contains('wallet-creation-modal--show')) {
               createCard.className += ' wallet-creation-modal--show';
          }
     });

     /**
     * Adds click handler to the submit button on the card modal.
     */
     document.getElementById('cardSubmit').addEventListener('click', function(e) {
          let type = document.getElementById('cardType').value;
          let number = document.getElementById('cardNumber').value;
          let amount = document.getElementById('cardAmount').value;
          let date = document.getElementById('cardDate').value.split('-');
          let newDate = `${date[1]}/${date[2]}/${date[0]}`;

          /** Basic form validation. */
          if (number.length < 1 || newDate.includes('undefined')) {
               alert('Error: Missing information.');
          } else {
               if (amount.match(re) && number.match(re)) {
                    let card = new Card(type, number, newDate, Number(amount));
                    wallet.addCard(card);
               } else {
                    alert('Enter a valid amount!');
               }
          }

          /** Close modal. */
          createCard.className = 'wallet-creation-modal';
     });

     /**
     * Adds click handler to the 'close' button on the card creation modal.
     */
     document.getElementById('closeCardForm').addEventListener('click', function() {
          if (createCard.classList.contains('wallet-creation-modal--show')) {
               createCard.className = ' wallet-creation-modal';
          }
     });

     /**
     * Adds click handler to the 'close' button on the transaction creation modal.
     */
     document.getElementById('closeTransactionForm').addEventListener('click', function() {
          if (createTransaction.classList.contains('transaction-creation-modal--show')) {
               createTransaction.className = ' transaction-creation-modal';
          }
     });

     /**
     * Adds click handler to the 'submit' button on the transaction creation modal.
     */
     document.getElementById('transactionSubmit').addEventListener('click', function(e) {
          let transactionType = document.getElementById('transactionType').value;
          let transactionName = document.getElementById('transactionName').value;
          let transactionDate = document.getElementById('transactionDate').value;
          let transactionAmount = document.getElementById('transactionAmount').value;
          let transactionDescription = document.getElementById('transactionDescription').value;
          let index = document.getElementsByClassName('selected-card')[0].getAttribute('data-target');

          let obj = {
               transactionType: transactionType,
               transactionName: transactionName,
               transactionDate: transactionDate,
               transactionAmount: Number(transactionAmount),
               transactionDescription: transactionDescription,
               transactionCode: Math.floor(Math.random() * 100000),
               transactionID: index
          }

          /** Basic form validation. */
          if (transactionName === '' || transactionDate === '') {
               alert('Error: Missing information.');
          } else {
               if (transactionAmount.match(re)) {
                    wallet.pushTransaction(index, obj);
               } else {
                    alert('Enter a valid amount!');
               }
          }

          /** Close modal. */
          createTransaction.className = 'transaction-creation-modal';
     });

})()
