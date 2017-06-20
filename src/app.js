/** Had to use 'var' because of safari bug saying 'Can't create duplicate variable that shadows a global property'. */
var wallet = new Wallet();

(function() {
     let createCard = document.getElementById('walletCreate');
     let createTransaction = document.getElementById('transactionCreate');
     let cardArr = document.getElementsByClassName('card');
     let re = /^-?\d*\.?\d*$/;
     let cardRe = /^\d{4}-?\d{4}-?\d{4}-?\d{4}$/;
     let dateRe = /^\d{2}\/\d{2}\/\d{4}$/;

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
          let date = document.getElementById('cardDate').value;
          let dateSplit = date.split('/');
          let newDate = `${dateSplit[0]}/${dateSplit[1]}/${dateSplit[2]}`;

          function isGoodDate(dt){
              var reGoodDate = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
              return reGoodDate.test(dt);
          }

          /** Basic form validation. */
          if (number.length < 1 || newDate.includes('undefined') || !isGoodDate(date)) {
                alert('Error: Missing or poorly formatted information.');
           } else {
                if (amount.match(re) && number.match(cardRe)) {
                     let hashed = number.replace(/-/g, '');
                     hashed = hashed.replace(/.(?=.{4,}$)/g, '*');

                     let card = new Card(type, number, newDate, Number(amount), hashed);
                     wallet.addCard(card);

                    /** Clear form. */
                    document.getElementById('walletCreateForm').reset();

                    /** Close modal. */
                    createCard.className = 'wallet-creation-modal';
                } else {
                     alert('Error: Enter a valid amount!');
                }
           }
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
          let transactionDate = new Date().toString().split(' ');
          let transactionAmount = document.getElementById('transactionAmount').value.replace(/[!@#$%^&*]/g, "");
          let transactionDescription = document.getElementById('transactionDescription').value;
          let index = document.getElementsByClassName('selected-card')[0].getAttribute('data-target');
          let preferredDate = `${transactionDate[1]} ${transactionDate[2]} ${transactionDate[3]}`

          let obj = {
               transactionType: transactionType,
               transactionName: transactionName,
               transactionDate: preferredDate,
               transactionAmount: Number(transactionAmount),
               transactionDescription: transactionDescription,
               transactionCode: Math.floor(Math.random() * 100000),
               transactionID: index
          }

          /** Basic form validation. */
          if (transactionName === '') {
               alert('Error: Missing information.');
          } else {
               if (transactionAmount.match(re)) {
                    wallet.pushTransaction(index, obj);

                    /** Clear form. */
                    document.getElementById('transactionCreationForm').reset();

                    /** Close modal. */
                    createTransaction.className = 'transaction-creation-modal';
               } else {
                    alert('Error: Enter a valid amount!');
               }
          }
     });
})()
