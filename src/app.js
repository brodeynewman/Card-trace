
const walletTemplate = new WalletTemplate();
const brodeyWallet = new Wallet(walletTemplate);
const brodeyVisa = new Card('Visa', '****-****-****-2562', '06/18/2017', 500);
const brodeyMaster = new Card('Mastercard', '****-****-****-1111', '06/18/2017', 220);
const brodeyAmex = new Card('Amex', '****-****-****-1017', '06/18/2017', 1000);

// const brodeyTransactionThree = new Transaction(false, 'Apple Iphone 7, 18g GB', '16 June. 2017', 600, 'Electronics', Math.floor(Math.random() * 100000));
// const brodeyTransactionTest = new Transaction(true, 'BlueTone Media', '17 June. 2017', 1000, 'Payment', Math.floor(Math.random() * 100000));
// const brodeyTransactionTestTwo = new Transaction(false, 'BlueTone Media', '17 June. 2017', 600, 'Health Insurance', Math.floor(Math.random() * 100000));
//
//
// brodeyWallet.addCard(brodeyVisa);
// brodeyWallet.addCard(brodeyMaster);
// brodeyWallet.addCard(brodeyAmex);
//
// brodeyVisa.addTransaction(brodeyTransactionThree);
// brodeyVisa.addTransaction(brodeyTransactionTest);
// brodeyVisa.addTransaction(brodeyTransactionTestTwo);
