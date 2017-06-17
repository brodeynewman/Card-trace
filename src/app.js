
const walletTemplate = new WalletTemplate();
const brodeyWallet = new Wallet(walletTemplate);
const brodeyVisa = new Card('Visa', '****-****-****-2562', '06/18/2017', 500);
const brodeyMaster = new Card('Mastercard', '****-****-****-2111', '06/18/2017', 700);

const brodeyTransactionThree = new Transaction(false, 'Apple Iphone 7, 18g GB', '16 June. 2017', 100, 'Electronics', Math.floor(Math.random() * 100000));


const test = new Transaction();

brodeyWallet.addCard(brodeyVisa);
brodeyWallet.addCard(brodeyMaster);
brodeyVisa.addTransaction(brodeyTransactionThree);

brodeyMaster.addTransaction(brodeyTransactionThree);
