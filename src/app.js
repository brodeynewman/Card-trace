const wallet = new Wallet();

// const brodeyTransactionThree = new Transaction(false, 'Apple Iphone 7, 18g GB', '16 June. 2017', 600, 'Electronics', Math.floor(Math.random() * 100000));
// const brodeyTransactionTest = new Transaction(true, 'BlueTone Media', '17 June. 2017', 1000, 'Payment', Math.floor(Math.random() * 100000));
// const brodeyTransactionTestTwo = new Transaction(false, 'BlueTone Media', '17 June. 2017', 600, 'Health Insurance', Math.floor(Math.random() * 100000));
//
//
// brodeyWallet.addCard(brodeyVisa);
// // brodeyWallet.addCard(brodeyMaster);
// // brodeyWallet.addCard(brodeyAmex);
// //
// brodeyVisa.addTransaction(brodeyTransactionThree);
// brodeyVisa.addTransaction(brodeyTransactionTest);
// brodeyVisa.addTransaction(brodeyTransactionTestTwo);



function pushTransaction(data, transaction) {
     wallet.pushTransaction(data, transaction);
}

(function() {
     let createCard = document.getElementById('walletCreate');
     let createTransaction = document.getElementById('transactionCreate');
     let cardArr = document.getElementsByClassName('card');

     document.getElementById('cardDate').value = '06/18/2017';

     document.getElementById('addCard').addEventListener('click', function() {
          if (!createCard.classList.contains('wallet-creation-modal--show')) {
               createCard.className += ' wallet-creation-modal--show';
          }
     });

     document.getElementById('cardSubmit').addEventListener('click', function(e) {
          let type = document.getElementById('cardType').value;
          let number = document.getElementById('cardNumber').value;
          let amount = document.getElementById('cardAmount').value;
          let date = document.getElementById('cardDate').value.split('-');
          let newDate = `${date[1]}/${date[2]}/${date[0]}`;

          let card = new Card(type, number, newDate, amount);
          wallet.addCard(card)
          createCard.className = 'wallet-creation-modal';

     });

     document.getElementById('closeCardForm').addEventListener('click', function() {
          if (createCard.classList.contains('wallet-creation-modal--show')) {
               createCard.className = ' wallet-creation-modal';
          }
     });

     document.getElementById('addTransaction').addEventListener('click', function() {
          if (createTransaction.classList.contains('transaction-creation-modal')) {
               createTransaction.className += ' transaction-creation-modal--show';
          }
     });

     document.getElementById('closeTransactionForm').addEventListener('click', function() {
          if (createTransaction.classList.contains('transaction-creation-modal--show')) {
               createTransaction.className = ' transaction-creation-modal';
          }
     });

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
               transactionAmount: transactionAmount,
               transactionDescription: transactionDescription,
               transactionCode: Math.floor(Math.random() * 100000)
          }

          console.log(obj);

          wallet.pushTransaction(index, obj);

          createTransaction.className = 'transaction-creation-modal';
     });

})()
