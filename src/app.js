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


(function() {
     let create = document.getElementById('walletCreate');
     document.getElementById('cardDate').value = '06/18/2017';

     document.getElementById('addCard').addEventListener('click', function() {
          if (!create.classList.contains('wallet-creation-modal--show')) {
               create.className += ' wallet-creation-modal--show';
          }
     });

     document.getElementById('submit').addEventListener('click', function(e) {
          let type = document.getElementById('cardType').value;
          let number = document.getElementById('cardNumber').value;
          let amount = document.getElementById('cardAmount').value;
          let date = document.getElementById('cardDate').value.split('-');
          let newDate = `${date[1]}/${date[2]}/${date[0]}`;

          let card = new Card(type, number, newDate, amount);
          wallet.addCard(card)
          create.className = 'wallet-creation-modal';

     });
})()
